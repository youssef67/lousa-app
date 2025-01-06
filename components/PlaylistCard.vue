<script lang="ts" setup>
import type { Playlist } from '~/types/session.type'

defineProps({
  playlists: {
    type: Object as PropType<Playlist>,
    required: true
  }
})
</script>
<template>
  <div
    class="flex flex-col mx-4 border rounded-md  px-2"
  >
    <h2>{{ playlists.playlistName }}</h2>
    <p>Nombre de musique : 0</p>
    <p>Nombre de followers: 0</p>
    <UButton
      label="créer la playlist"
      type="submit"
      variant="solid"
      size="sm"
      color="secondary"
      class="my-2"
    />
  </div>
</template>

<style></style>
