<script lang="ts" setup>
import type { Playlist } from '~/types/session.type'

const props = defineProps({
  playlist: {
    type: Object as PropType<Playlist>,
    required: true
  },
  closeSlider: Function
})

const { runDeletePlaylists } = useSpotifyRepository()
const sessionStore = useSessionStore()
const deletePlaylist = async () => {
  console.log('delete playlist')
  const response = await runDeletePlaylists(props.playlist.id)
  console.log(response)
}

const selectPlaylist = () => {
  console.log('select playlist', props.playlist)
  sessionStore.playlistSelected = props.playlist
  props.closeSlider()
}

</script>
<template>
  <div class="flex flex-col mx-4 py-2 border rounded-md px-2 max-w-sm items-center">
    <h2>{{ playlist.playlistName }}</h2>
    <p>Nombre de musique : 0</p>
    <p>Nombre de followers: 0</p>
    <div class="flex gap-2 mt-2 w-full">
      <UButton
        label="Sélectionner"
        type="submit"
        variant="solid"
        size="md"
        color="primary"
        class="w-auto"
        @click="selectPlaylist"
      />
      <UButton
        label="Supprimer"
        type="submit"
        variant="solid"
        size="md"
        color="secondary"
        class="w-auto"
        @click="deletePlaylist"
      />
    </div>
  </div>
</template>

<style></style>
