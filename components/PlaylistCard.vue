<script lang="ts" setup>
// Importation d'une image locale
import playlistImage from '~/assets/images/playlist-placeholder.webp'
import type { PlaylistViewer } from '~/types/playlist.type'

// Nom de la playlist (passé en prop)
const props = defineProps({
  playlist: {
    type: Object as PropType<PlaylistViewer>,
    required: true
  }
})

// Nombre de followers en dur
const followersCount = 1250
const { runDeleteFavoritePlaylist, runAddFavoritePlaylist } =
  useViewerRepository()
const toast = useSpecialToast()
const isFavoritePlaylist = ref(props.playlist.isFavorite)

const toggleFavorites = async () => {
  if (isFavoritePlaylist.value) {
    const response = await runDeleteFavoritePlaylist(props.playlist.id)
    if (response) {
      isFavoritePlaylist.value = false
      toast.showSuccess('Playlist retirée des favoris')
      return
    }
  } else {
    const response = await runAddFavoritePlaylist(props.playlist.id)

    if (response) {
      isFavoritePlaylist.value = true
      toast.showSuccess('Playlist ajouté aux favoris')
      return
    }
  }

  toast.showError('Une erreur est survenue')
}
</script>

<template>
  <div
    class="flex items-center gap-4 bg-gray-800 p-4 rounded-xl shadow-md text-white max-w-sm"
  >
    <!-- Image de la playlist -->
    <img
      :src="playlistImage"
      alt="Playlist Image"
      class="w-20 h-20 rounded-lg object-cover"
    />

    <!-- Infos de la playlist -->
    <div class="flex flex-col">
      <h2 class="text-lg font-semibold">{{ props.playlist.playlistName }}</h2>
      <p class="text-sm text-gray-400">{{ followersCount }} abonnés</p>
      <div class="flex flex-col gap-2 mt-2 w-full">
        <!-- <UButton
          label="Sélectionner"
          type="submit"
          variant="solid"
          size="md"
          color="primary"
          class="w-full"
          icon="heroicons-arrow-top-right-on-square-solid"
          @click="selectPlaylist"
        /> -->
        <UButton
          :label="
            props.playlist.isFavorite
              ? 'Retirer des favoris'
              : 'Ajouter aux favoris'
          "
          type="submit"
          variant="solid"
          size="md"
          color="secondary"
          class="w-full"
          :icon="
            isFavoritePlaylist
              ? 'i-heroicons-heart-20-solid'
              : 'i-heroicons-heart'
          "
          @click="toggleFavorites"
        />
      </div>
    </div>
  </div>
</template>
