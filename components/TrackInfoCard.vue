<script lang="ts" setup>
import type { Track } from '~/types/playlist.type'

const props = defineProps({
  track: {
    type: Object as PropType<Track>,
    required: true
  }
})

const emit = defineEmits(['track-validation'])

const chooseTrack = () => {
  emit('track-validation', props.track)
}
</script>

<template>
  <div class="flex items-center justify-between p-3 border rounded-xl shadow-sm">
    <div class="flex flex-col">
      <h2 class="text-lg font-semibold">{{ track.trackName }}</h2>
      <p class="text-sm text-gray-600">{{ track.artistName }}</p>
    </div>

    <UButton
      label="Choisir ce son"
      variant="solid"
      size="sm"
      color="secondary"
      @click="chooseTrack"
    />
  </div>
</template>

<style scoped></style>
