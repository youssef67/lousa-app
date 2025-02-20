<script lang="ts" setup>
import type { Playlist } from '~/types/session.type'

const props = defineProps({
  playlist: {
    type: Object as PropType<Playlist>,
    required: true
  },
  closeSlider: Function,
  openedByStreamer: {
    type: Boolean,
    required: false
  }
})

console.log(props.playlist.isFavorite)

const { runDeletePlaylists } = useSpotifyRepository()
const { runAddFavoritePlaylist, runDeleteFavoritePlaylist } =
  useViewerRepository()
const isFavorite = ref(props.playlist.isFavorite)
const favoriteIcon = ref(
  props.playlist.isFavorite ? 'heroicons:heart-20-solid' : 'heroicons:heart'
)
const sessionStore = useSessionStore()
const toast = useSpecialToast()

const deletePlaylist = async () => {
  const response = await runDeletePlaylists(props.playlist.id)

  if (response) {
    sessionStore.deletePlaylistsToList(props.playlist.id)
    toast.showSuccess('Playlist supprimée avec succès')
  }
}

const selectPlaylist = () => {
  sessionStore.playlistSelected = props.playlist
  props.closeSlider()
}

const toggleFavoritePlaylist = async () => {
  let playlistInStore = sessionStore.spaceStreamer.playlists.find(playlist => playlist.id === props.playlist.id)

  console.log(playlistInStore.isFavorite)
  if (isFavorite.value) {
    const response = await runDeleteFavoritePlaylist(props.playlist.id)
    if (response) {
      isFavorite.value = false
      favoriteIcon.value = 'heroicons:heart'
      playlistInStore.isFavorite = false
      toast.showSuccess('Cette playlist est retirée des favoris')
    }
  } else {
    const response = await runAddFavoritePlaylist(props.playlist.id)
    if (response) {
      isFavorite.value = true
      favoriteIcon.value = 'heroicons:heart-20-solid'
      playlistInStore.isFavorite = true
      toast.showSuccess('Playlist ajoutée aux favoris')
    }
  }
}
</script>
<template>
  <div
    class="flex flex-col mx-4 py-2 border rounded-md px-2 max-w-sm items-center"
  >
    <h2>{{ playlist.playlistName }}</h2>
    <p>Nombre de musique : 0</p>
    <p>Nombre de followers: 0</p>
    <div v-if="props.openedByStreamer" class="flex gap-2 mt-2 w-full">
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
    <div v-else class="flex flex-col gap-2 mt-2 w-full">
      <UButton
        label="Sélectionner"
        type="submit"
        variant="solid"
        size="md"
        color="primary"
        class="w-full"
        icon="heroicons-arrow-top-right-on-square-solid"
        @click="selectPlaylist"
      />
      <UButton
        :label="isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'"
        type="submit"
        variant="solid"
        size="md"
        color="secondary"
        class="w-full"
        :icon="favoriteIcon"
        @click="toggleFavoritePlaylist"
      />
    </div>
  </div>
</template>

<style></style>
