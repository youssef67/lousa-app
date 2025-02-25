<script lang="ts" setup>
import type { PlaylistTrack } from '~/types/viewer.type'

const props = defineProps({
  tracks: {
    type: {} as PropType<PlaylistTrack>,
    required: true
  }
})
</script>

<template>
  <UContainer>
    <div class="flex">
      <div>
        <h1>{{ props.tracks.trackName }}</h1>
        <p>{{ props.tracks.artistName }}</p>
      </div>
      <div>
        <UAvatar :src="props.tracks.cover" alt="Avatar" />
      </div>
    </div>
  </UContainer>
</template>

<style></style>
