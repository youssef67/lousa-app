<script lang="ts" setup>
import waitingTracks from '~/assets/images/waiting-tracks.webp'
import { DateTime } from 'luxon'

const props = defineProps({
  closingDate: {
    type: String,
    required: false,
    default: null,
  },
  tracksVersusId: {
    type: String,
    required: false,
    default: null,
  },
})
const countdown = ref('00:00:00')
const hasEnded = ref(false)
const closingDate = ref(props.closingDate)
const emit = defineEmits(['endCountDown'])


let interval: number

const updateCountdown = () => {
  const now = DateTime.now()
  const closing = DateTime.fromISO(closingDate.value)
  const diff = closing.diff(now, ['hours', 'minutes', 'seconds']).toObject()

  const isOver = closing <= now

  const onCountdownFinished = async () => {
    if (!props.closingDate || !props.tracksVersusId) return

    if (hasEnded.value) return // ← stop si déjà fini
    hasEnded.value = true
    clearInterval(interval)

    console.log('🎯 End countdown reçu dans CountDown')
    emit('endCountDown')
    // await runAddTrack(props.tracksVersusId)
  }

  if (isOver) {
    countdown.value = '00:00:00'
    onCountdownFinished()
    return
  }
  if (diff.seconds !== undefined && diff.minutes !== undefined && diff.hours !== undefined) {
    const hours = String(Math.floor(diff.hours)).padStart(2, '0')
    const minutes = String(Math.floor(diff.minutes)).padStart(2, '0')
    const seconds = String(Math.floor(diff.seconds)).padStart(2, '0')

    countdown.value = `${hours}:${minutes}:${seconds}`
  }
}

watch(
  () => props.closingDate,
  newClosingDate => {

    console.log('🎯 TracksVersusId changé dans CountDown')
    console.log(newClosingDate)

    closingDate.value = newClosingDate

    // if (!newVersus?.firstTrack || !newVersus?.secondTrack) return

    // scoreFirstTrack.value = newVersus.firstTrackScore
    // scoreSecondTrack.value = newVersus.secondTrackScore
    hasEnded.value = false
    clearInterval(interval)
    updateCountdown()
    interval = window.setInterval(updateCountdown, 1000)
  },
  { immediate: true }
)

onMounted(() => {
  if (!props.closingDate || !props.tracksVersusId) return

  updateCountdown()
  interval = window.setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div
  v-if="props.closingDate"
    class="w-14 h-14 flex items-center justify-center bg-gray-800 rounded-full border-4 border-gray-600 shadow-md mb-10"
  >
    <span class="text-white text-lg font-bold">{{ countdown }}</span>
  </div>
  <div v-else>
    <img
      :src="waitingTracks"
      alt="Crown"
      class="w-30 h-30 rounded-lg object-cover"
    />
  </div>
</template>

<style></style>
