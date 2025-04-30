<script lang="ts" setup>
import playlistImage from '~/assets/images/playlist-placeholder.webp'
import type { PlaylistViewer } from '~/types/playlist.type'

const props = defineProps({
  playlist: {
    type: Object as PropType<PlaylistViewer>,
    required: true
  }
})

const followersCount = 1250
const { runDeleteFavoritePlaylist, runAddFavoritePlaylist } = useViewerRepository()
const toast = useSpecialToast()
const isFavoritePlaylist = ref(props.playlist.isFavorite)
const isFollowModalOpen = ref(false)
const hasPendingFavorite = ref(false) // ← Flag temporaire

const toggleFavorites = async () => {
  if (isFavoritePlaylist.value) {
    const response = await runDeleteFavoritePlaylist(props.playlist.id)
    if (response) {
      isFavoritePlaylist.value = false
      toast.showSuccess('Playlist retirée des favoris')
    } else {
      toast.showError('Une erreur est survenue')
    }
  } else {
    const response = await runAddFavoritePlaylist(props.playlist.id)

    if (response) {
      isFavoritePlaylist.value = true

      if (props.playlist.onlyFollowers) {
        // Ouvre la modal sans toast
        hasPendingFavorite.value = true
        isFollowModalOpen.value = true
      } else {
        // Playlist ouverte : toast immédiat
        toast.showSuccess('Playlist ajoutée aux favoris')
      }
    } else {
      toast.showError('Une erreur est survenue')
    }
  }
}

const followStreamer = () => {
  // Simule un appel API ou logique réelle ici
  toast.showSuccess('Playlist ajoutée aux favoris')
  isFollowModalOpen.value = false
  hasPendingFavorite.value = false
}
</script>



<template>
  <div class="flex items-center gap-4 bg-gray-800 p-4 rounded-xl shadow-md text-white max-w-sm">
    <img :src="playlistImage" alt="Playlist Image" class="w-20 h-20 rounded-lg object-cover" />

    <div class="flex flex-col">
      <h2 class="text-lg font-semibold">{{ props.playlist.playlistName }}</h2>
      <p class="text-sm text-gray-400">{{ followersCount }} abonnés</p>
      <p>{{ props.playlist.onlyFollowers ? 'fermée' : 'ouverte' }}</p>
      <p>Nombre de musiques {{ props.playlist.nbTracks }}/{{ props.playlist.maxRankedTracks }}</p>

      <div class="flex flex-col gap-2 mt-2 w-full">
        <UButton
          :label="props.playlist.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'"
          type="submit"
          variant="solid"
          size="md"
          color="secondary"
          class="w-full"
          :icon="isFavoritePlaylist ? 'i-heroicons-heart-20-solid' : 'i-heroicons-heart'"
          @click="toggleFavorites"
        />
      </div>
    </div>
    <UModal v-model="isFollowModalOpen">
      <div class="p-6 space-y-4 text-center">
        <h3 class="text-xl font-bold text-red-600">Playlist en mode fermé</h3>
        <p class="text-gray-700">Pour accéder à cette playlist, vous devez suivre le streamer.</p>
        <UButton
          label="Follow le streamer"
          color="primary"
          variant="solid"
          @click="followStreamer"
          class="mx-auto"
        />
      </div>
    </UModal>
  </div>
</template>
