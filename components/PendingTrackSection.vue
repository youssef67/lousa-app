<script lang="ts" setup>
import { type Versus } from '~/types/playlist.type'
import { DateTime } from 'luxon'

const props = defineProps({
  versus: {
    type: Object as PropType<Versus>,
    required: true
  }
})

const countdown = ref('00:00:10')
const hasEnded = ref(false)
const scoreFirstTrack = ref(15)
const scoreSecondTrack = ref(5)
const { runAddTrack } = usePlaylistRepository()
const emit = defineEmits(['updateTracks'])
const fakeClosingDate = DateTime.now().plus({ seconds: 5 }) // 👈 5 secondes



// Animation state
const animateFirst = ref(false)
const animateSecond = ref(false)

const handleVoteFirst = () => {
  animateFirst.value = true
  scoreFirstTrack.value++
  setTimeout(() => (animateFirst.value = false), 200)
}

const handleVoteSecond = () => {
  animateSecond.value = true
  scoreSecondTrack.value++
  setTimeout(() => (animateSecond.value = false), 200)
}

const onCountdownFinished = async () => {
  if (hasEnded.value) return // ← stop si déjà fini
  hasEnded.value = true
  console.log('🎉 Le duel est terminé !')
  clearInterval(interval)

  // Déterminer la chanson gagnante
  const winnerTrack =
    scoreFirstTrack.value > scoreSecondTrack.value
      ? { trackId: props.versus.firstTrack.trackId , score: scoreFirstTrack.value, userId: props.versus.firstTrack.user.id, spotifyTrackId: props.versus.firstTrack.spotifyTrackId }
      : scoreSecondTrack.value > scoreFirstTrack.value
      ? { trackId: props.versus.secondTrack.trackId, score: scoreSecondTrack.value, userId: props.versus.secondTrack.user.id, spotifyTrackId: props.versus.firstTrack.spotifyTrackId }
      : null 

  if (winnerTrack) {
    console.log('🏆 La chanson gagnante est :', winnerTrack)
    await runAddTrack(props.versus.id, winnerTrack)

    // if (response.playlistTracksUpdated.length > 0) {
    //   console.log('🏆 La chanson gagnante a été ajoutée à la playlist !')
    //   emit('updateTracks', response.playlistTracksUpdated)

    // }
  } else {
    console.log('⚖️ Égalité entre les deux chansons !')
  }
}

const updateCountdown = () => {
  // const now = DateTime.now()
  // const closing = DateTime.fromISO(props.versus.closingDate)
  const now = DateTime.now()
  const closing = fakeClosingDate
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
</script>

<template>
  <div
    class="left-4 right-4 bg-gray-900 bg-opacity-90 p-3 shadow-lg border-t border-gray-800 rounded-lg"
  >
    <div class="flex items-center justify-between gap-4">
      <!-- Premier Track -->
      <div class="flex-1 text-center">
        <img
          :src="versus.firstTrack.cover"
          alt="Cover 1"
          class="w-16 h-16 mx-auto rounded-md shadow-md"
        />
        <h4 class="text-white text-xs font-semibold mt-1">
          {{ versus.firstTrack.trackName }}
        </h4>
        <p class="text-gray-400 text-xs">
          {{ versus.firstTrack.artistName }}
        </p>
        <div class="text-green-400 text-sm font-bold">
          {{ scoreFirstTrack }} pts
        </div>

        <!-- Vote button -->
        <div class="flex flex-row justify-center items-center gap-2 mt-2">
          <UButton
            @click="handleVoteFirst"
            :class="[
              'p-1 rounded-full transition duration-200',
              animateFirst ? 'scale-105' : 'scale-100'
            ]"
            icon="i-tabler-music-up"
          >
            Utiliser des louz
          </UButton>
          <UButton class="p-1 rounded-full" icon="i-tabler-music-heart">
            Liker la musique
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
          :src="versus.secondTrack.cover"
          alt="Cover 2"
          class="w-16 h-16 mx-auto rounded-md shadow-md"
        />
        <h4 class="text-white text-xs font-semibold mt-1">
          {{ versus.secondTrack.trackName }}
        </h4>
        <p class="text-gray-400 text-xs">
          {{ versus.secondTrack.artistName }}
        </p>
        <div class="text-green-400 text-sm font-bold">
          {{ scoreSecondTrack }} pts
        </div>

        <div class="flex flex-row justify-center items-center gap-2 mt-2">
          <UButton
            @click="handleVoteSecond"
            :class="[
              'p-1 rounded-full transition duration-200',
              animateSecond ? 'scale-105' : 'scale-100'
            ]"
            icon="i-tabler-music-up"
          >
            Utiliser des louz
          </UButton>
          <UButton class="p-1 rounded-full" icon="i-tabler-music-heart">
            Liker la musique
          </UButton>
        </div>
      </div>
    </div>

    <!-- Barre de progression du duel -->
    <div class="w-full bg-gray-700 h-2 rounded-full overflow-hidden mt-2 flex">
      <div
        class="bg-blue-500 transition-all duration-300"
        :style="{ width: progressFirst }"
      ></div>
      <div
        class="bg-red-500 transition-all duration-300"
        :style="{ width: progressSecond }"
      ></div>
    </div>
  </div>
</template>
