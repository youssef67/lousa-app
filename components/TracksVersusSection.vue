<script lang="ts" setup>
import { type TracksVersus, type ScoreAndLikes } from '~/types/playlist.type'
import { DateTime } from 'luxon'

const props = defineProps({
  currentTracksVersus: {
    type: Object as PropType<TracksVersus>,
    required: true
  },
  scoreAndLikes: {
    type: Object as PropType<ScoreAndLikes>,
    required: true
  }
})
const countdown = ref('00:00:00')
const hasEnded = ref(false)
const scoreFirstTrack = ref(props.scoreAndLikes.firstTrackScore)
const isUseSpecialLikeModalOpen = ref(false)
const scoreSecondTrack = ref(props.scoreAndLikes.secondTrackScore)
const { runAddTrack, runLikeTrack } = usePlaylistRepository()
const emit = defineEmits(['updateTracks'])

// Animation state
const animateFirst = ref(false)
const animateSecond = ref(false)

const proceedResult = () => {
  isUseSpecialLikeModalOpen.value = false
}

const handleSpecialLike = (track: number) => {
  animateFirst.value = true
  setTimeout(() => (animateFirst.value = false), 200)

  isUseSpecialLikeModalOpen.value = true
}

const onCountdownFinished = async () => {
  if (hasEnded.value) return // ← stop si déjà fini
  hasEnded.value = true
  console.log('🎉 Le duel est terminé !')
  clearInterval(interval)

  // Déterminer la chanson gagnante
  const winnerTrack =
    scoreFirstTrack.value > scoreSecondTrack.value
      ? { spotifyTrackId: props.currentTracksVersus.firstTrack.spotifyTrackId }
      : scoreSecondTrack.value > scoreFirstTrack.value
      ? { spotifyTrackId: props.currentTracksVersus.firstTrack.spotifyTrackId }
      : { spotifyTrackId: null }

  await runAddTrack(props.currentTracksVersus.id, winnerTrack.spotifyTrackId)
}

const likeTrack = async (track: number) => {
  console.log('❤️')
  console.log('trackId', track)
  const response = await runLikeTrack(props.currentTracksVersus.id, track)

  console.log('response', response)
}

const updateCountdown = () => {
  const now = DateTime.now()
  const closing = DateTime.fromISO(props.currentTracksVersus.closingDate)
  const diff = closing.diff(now, ['hours', 'minutes', 'seconds']).toObject()

  const isOver = closing <= now

  if (isOver) {
    countdown.value = '00:00:00'
    onCountdownFinished()
    return
  }
  if (
    diff.seconds !== undefined &&
    diff.minutes !== undefined &&
    diff.hours !== undefined
  ) {
    const hours = String(Math.floor(diff.hours)).padStart(2, '0')
    const minutes = String(Math.floor(diff.minutes)).padStart(2, '0')
    const seconds = String(Math.floor(diff.seconds)).padStart(2, '0')

    countdown.value = `${hours}:${minutes}:${seconds}`
  }
}

let interval: number

const progressFirst = computed(() => {
  const total = scoreFirstTrack.value + scoreSecondTrack.value
  return total === 0 ? '50%' : `${(scoreFirstTrack.value / total) * 100}%`
})

const progressSecond = computed(() => {
  const total = scoreFirstTrack.value + scoreSecondTrack.value
  return total === 0 ? '50%' : `${(scoreSecondTrack.value / total) * 100}%`
})

onMounted(() => {
  updateCountdown()
  interval = window.setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})

watch(
  () => props.currentTracksVersus,
  newVersus => {
    if (!newVersus?.firstTrack || !newVersus?.secondTrack) return

    scoreFirstTrack.value = newVersus.firstTrackScore
    scoreSecondTrack.value = newVersus.secondTrackScore
    hasEnded.value = false
    clearInterval(interval)
    updateCountdown()
    interval = window.setInterval(updateCountdown, 1000)
  },
  { immediate: true }
)

watch(
  () => props.scoreAndLikes,
  newScoreAndLikes => {
    scoreFirstTrack.value = newScoreAndLikes.firstTrackScore
    scoreSecondTrack.value = newScoreAndLikes.secondTrackScore
  }
)
</script>

<template>
  <div
    class="left-4 right-4 bg-gray-900 bg-opacity-90 p-3 shadow-lg border-t border-gray-800 rounded-lg"
  >
    <div
      v-if="currentTracksVersus?.firstTrack && currentTracksVersus?.secondTrack"
      class="flex items-center justify-between gap-4"
    >
      <!-- Premier Track -->
      <div class="flex-1 text-center">
        <img
          :src="currentTracksVersus.firstTrack.cover"
          alt="Cover 1"
          class="w-16 h-16 mx-auto rounded-md shadow-md"
        />
        <h4 class="text-white text-xs font-semibold mt-1">
          {{ currentTracksVersus.firstTrack.trackName }}
        </h4>
        <p class="text-gray-400 text-xs">
          {{ currentTracksVersus.firstTrack.artistName }}
        </p>
        <div class="text-green-400 text-sm font-bold">
          {{ scoreFirstTrack }} pts
        </div>

        <!-- Vote button -->
        <div class="flex flex-row justify-center items-center gap-2 mt-2">
          <UPopover>
            <UButton
              label="Utiliser des louz"
              color="primary"
              variant="solid"
              icon="i-tabler-music-up"
            />
            <template #content>
              <div class="p-4 w-48 text-white">
                Tu peux utiliser 1 Louz ici !
              </div>
            </template>
          </UPopover>

          <UButton
            class="p-1 rounded-full"
            icon="i-tabler-music-heart"
            @click="() => likeTrack(1)"
          >
            {{ props.scoreAndLikes.nbLikesFirstTrack }} likes /
            {{
              props.scoreAndLikes.firstTrackAlreadyLiked
                ? 'Déjà liké'
                : 'Liker la musique'
            }}
          </UButton>
        </div>
      </div>

      <!-- Minuteur -->
      <div
        class="w-14 h-14 flex items-center justify-center bg-gray-800 rounded-full border-4 border-gray-600 shadow-md"
      >
        <span class="text-white text-lg font-bold">{{ countdown }}</span>
      </div>

      <!-- Deuxième Track -->
      <div class="flex-1 text-center">
        <img
          :src="currentTracksVersus.secondTrack.cover"
          alt="Cover 2"
          class="w-16 h-16 mx-auto rounded-md shadow-md"
        />
        <h4 class="text-white text-xs font-semibold mt-1">
          {{ currentTracksVersus.secondTrack.trackName }}
        </h4>
        <p class="text-gray-400 text-xs">
          {{ currentTracksVersus.secondTrack.artistName }}
        </p>
        <div class="text-green-400 text-sm font-bold">
          {{ scoreSecondTrack }} pts
        </div>

        <div class="flex flex-row justify-center items-center gap-2 mt-2">
          <UButton
            @click="() => handleSpecialLike(2)"
            :class="[
              'p-1 rounded-full transition duration-200',
              animateSecond ? 'scale-105' : 'scale-100'
            ]"
            icon="i-tabler-music-up"
          >
            Utiliser des louz
          </UButton>
          <UButton
            class="p-1 rounded-full"
            icon="i-tabler-music-heart"
            @click="() => likeTrack(2)"
          >
            {{ props.scoreAndLikes.nbLikesSecondTrack }} likes /
            {{
              props.scoreAndLikes.secondTrackAlreadyLiked
                ? 'Déjà liké'
                : 'Liker la musique'
            }}
          </UButton>
        </div>
      </div>
    </div>

    <!-- Message d'attente -->
    <div v-else class="text-center text-white text-sm py-6">
      🎵 En attente de nouveaux morceaux pour lancer un battle...
    </div>

    <!-- Barre de progression -->
    <div
      v-if="currentTracksVersus?.firstTrack && currentTracksVersus?.secondTrack"
      class="w-full bg-gray-700 h-2 rounded-full overflow-hidden mt-2 flex"
    >
      <div
        class="bg-blue-500 transition-all duration-300"
        :style="{ width: progressFirst }"
      />
      <div
        class="bg-red-500 transition-all duration-300"
        :style="{ width: progressSecond }"
      />
    </div>
  </div>
  <SpecialLikeModal
    :is-open="isUseSpecialLikeModalOpen"
    @proceed-result="proceedResult"
  />
</template>
