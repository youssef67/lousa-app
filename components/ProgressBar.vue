<script lang="ts" setup>
import type { TracksVersus } from '~/types/playlist.type'

const props = defineProps({
  currentTracksVersus: {
    type: Object as PropType<TracksVersus>,
    required: true,
  },
})

const progressFirst = computed(() => {
  const total = props.currentTracksVersus.firstTrack.scoreAndLikes.trackScore + props.currentTracksVersus.secondTrack.scoreAndLikes.trackScore
  return total === 0 ? '50%' : `${(props.currentTracksVersus.firstTrack.scoreAndLikes.trackScore / total) * 100}%`
})

const progressSecond = computed(() => {
  const total = props.currentTracksVersus.firstTrack.scoreAndLikes.trackScore + props.currentTracksVersus.secondTrack.scoreAndLikes.trackScore
  return total === 0 ? '50%' : `${(props.currentTracksVersus.secondTrack.scoreAndLikes.trackScore / total) * 100}%`
})
</script>

<template>
  <div
    v-if="currentTracksVersus?.firstTrack && currentTracksVersus?.secondTrack"
    class="w-full bg-gray-700 h-2 rounded-full overflow-hidden mt-2 flex"
  >
    <div class="bg-blue-500 transition-all duration-300" :style="{ width: progressFirst }" />
    <div class="bg-red-500 transition-all duration-300" :style="{ width: progressSecond }" />
  </div>
</template>

<style></style>
