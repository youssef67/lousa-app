<script lang="ts" setup>
import type { Track } from '~/types/viewer.type'

const props = defineProps({
  track: {
    type: Object as PropType<Track>,
    required: true
  }
})
const emit = defineEmits(['trackValidation'])

async function chooseTrack() {
  emit('trackValidation', props.track)
}
</script>

<template>
  <div class="flex flex-row">
    <h1>{{ props.track.name }}</h1>
    <UButton
      label="Choisir ce son"
      variant="solid"
      size="sm"
      color="secondary"
      class="flex"
      @click="chooseTrack()"
    />
  </div>
</template>

<style></style>
