<script lang="ts" setup>
import { DateTime } from 'luxon'
import type { TracksVersus, ScoreAndLikes } from '~/types/playlist.type'

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
const { runAddTrack, runLikeTrack, runSpecialLikeTrack } =
  usePlaylistRepository()
const sessionStore = useSessionStore()
const targetTrack = ref(0)
const labelFirstTrack = ref(
  `Utiliser des louz - ${props.scoreAndLikes.specialLikeFirstTrack}`
)
const labelSecondTrack = ref(
  `Utiliser des louz - ${props.scoreAndLikes.specialLikeSecondTrack}`
)
const specialLikeFirstTrack = ref(props.scoreAndLikes.specialLikeFirstTrack)
const specialLikeSecondTrack = ref(props.scoreAndLikes.specialLikeSecondTrack)
defineEmits(['updateTracks'])

// Animation state
const animateFirst = ref(false)
const animateSecond = ref(false)

const proceedResult = async (amount: number) => {
  isUseSpecialLikeModalOpen.value = false

  if (amount !== undefined && targetTrack.value !== 0) {
    await runSpecialLikeTrack(
      props.currentTracksVersus.id,
      targetTrack.value,
      amount
    )
  }

  targetTrack.value = 0
}

const handleSpecialLike = (value: number) => {
  targetTrack.value = value
  animateFirst.value = true
  setTimeout(() => (animateFirst.value = false), 200)
  isUseSpecialLikeModalOpen.value = true
}

const onCountdownFinished = async () => {
  if (hasEnded.value) return // ← stop si déjà fini
  hasEnded.value = true
  console.log('🎉 Le duel est terminé !')
  clearInterval(interval)

  await runAddTrack(props.currentTracksVersus.id)
}

const likeTrack = async (trackId: string, targetTrack: number) => {
  await runLikeTrack(props.currentTracksVersus.id, trackId, targetTrack)
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

watch(
  () => props.scoreAndLikes.specialLikeFirstTrack,
  newSpecialLikeFirstTrack => {
    specialLikeFirstTrack.value = newSpecialLikeFirstTrack
    labelFirstTrack.value = `Utiliser des louz - ${newSpecialLikeFirstTrack}`
  }
)

watch(
  () => props.scoreAndLikes.specialLikeSecondTrack,
  newSpecialLikeSecondTrack => {
    specialLikeSecondTrack.value = newSpecialLikeSecondTrack
    labelSecondTrack.value = `Utiliser des louz - ${newSpecialLikeSecondTrack}`
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
        Proposé par
        <span class="text-white">{{
          props.currentTracksVersus.firstTrack.user.userName
        }}</span>
        <img
          :src="currentTracksVersus.firstTrack.cover"
          alt="Cover 1"
          class="w-16 h-16 mx-auto rounded-md shadow-md mt-2"
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
          <div
            v-if="
              sessionStore.session.user.id ===
              props.currentTracksVersus.firstTrack.user.id
            "
          >
            <UButton
              :class="[
                'p-1 rounded-full transition duration-200',
                animateSecond ? 'scale-105' : 'scale-100'
              ]"
              icon="i-tabler-music-up"
              :label="labelFirstTrack"
              @click="() => handleSpecialLike(1)"
            />
          </div>
          <div v-else>
            <div v-if="props.scoreAndLikes.specialLikeFirstTrack > 0">
              <UButton
                class="p-1 rounded-full heartbeat"
                icon="i-tabler-flame"
                color="pink"
                variant="soft"
              >
                Coup spécial reçu 💖
              </UButton>
            </div>
          </div>

          <UButton
            class="p-1 rounded-full"
            icon="i-tabler-music-heart"
            @click="
              () => likeTrack(props.currentTracksVersus.firstTrack.trackId, 1)
            "
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
        Proposé par
        <span class="text-white">{{
          props.currentTracksVersus.secondTrack.user.userName
        }}</span>
        <img
          :src="currentTracksVersus.secondTrack.cover"
          alt="Cover 2"
          class="w-16 h-16 mx-auto rounded-md shadow-md mt-2"
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
          <div
            v-if="
              sessionStore.session.user.id ===
              props.currentTracksVersus.secondTrack.user.id
            "
          >
            <UButton
              :class="[
                'p-1 rounded-full transition duration-200',
                animateSecond ? 'scale-105' : 'scale-100'
              ]"
              icon="i-tabler-music-up"
              :label="labelSecondTrack"
              @click="() => handleSpecialLike(2)"
            />
          </div>
          <div v-else>
            <div v-if="props.scoreAndLikes.specialLikeSecondTrack > 0">
              <UButton
                class="p-1 rounded-full heartbeat"
                icon="i-tabler-flame"
                color="pink"
                variant="soft"
                label="Coup spécial reçu 💖"
              />
            </div>
          </div>
          <UButton
            class="p-1 rounded-full"
            icon="i-tabler-music-heart"
            @click="
              () => likeTrack(props.currentTracksVersus.secondTrack.trackId, 2)
            "
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
    :amountCurrency="sessionStore.session.user.amountVirtualCurrency"
    @proceed-result="proceedResult"
  />
</template>

<style scoped>
@keyframes heartbeat {
  0%,
  100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.02);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.02);
  }
}

.heartbeat {
  animation: heartbeat 1s infinite;
}
</style>
