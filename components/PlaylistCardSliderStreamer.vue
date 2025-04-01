<script lang="ts" setup>
import type { PlaylistCardInfo } from '~/types/playlist.type'

const props = defineProps({
  playlist: {
    type: Object as PropType<PlaylistCardInfo>,
    required: true
  },
  closeSlider: Function
})

const { runDeletePlaylist } = useStreamerRepository()
const { runSetAndGetPLaylistSelected } = useStreamerRepository()
const streamerStore = useStreamerStore()
const toast = useSpecialToast()

const deletePlaylist = async () => {
  const response = await runDeletePlaylist(props.playlist.id)

  if (response) {
    streamerStore.deletePlaylistsToList(props.playlist.id)
    toast.showSuccess('Playlist supprimée avec succès')
  }
}

const selectPlaylist = async () => {
  if (
    streamerStore.playlistSelected === null ||
    streamerStore.playlistSelected.id !== props.playlist.id
  ) {
    const playlist = await runSetAndGetPLaylistSelected(props.playlist.id)

    if (playlist) {
      streamerStore.playlistSelected = playlist.playlistSelected
    }
  }

  props.closeSlider()
}
</script>

<template>
  <div
    class="flex flex-col mx-4 py-2 border rounded-md px-2 max-w-sm items-center"
  >
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
