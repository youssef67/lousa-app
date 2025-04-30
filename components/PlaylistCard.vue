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
const hasPendingFavorite = ref(false)

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
        hasPendingFavorite.value = true
        isFollowModalOpen.value = true
      } else {
        toast.showSuccess('Playlist ajoutée aux favoris')
      }
    } else {
      toast.showError('Une erreur est survenue')
    }
  }
}

const followStreamer = () => {
  toast.showSuccess('Playlist ajoutée aux favoris')
  isFollowModalOpen.value = false
  hasPendingFavorite.value = false
}
</script>

<template>
  <div class="flex gap-4 bg-gray-800 p-4 rounded-2xl shadow-lg text-white max-w-md w-full">
    <img
      :src="playlistImage"
      alt="Playlist Image"
      class="w-24 h-24 rounded-xl object-cover"
    />

    <div class="flex flex-col justify-between w-full">
      <div class="space-y-1">
        <h2 class="text-xl font-bold">{{ props.playlist.playlistName }}</h2>
        <p class="text-sm text-gray-400">{{ followersCount }} abonnés</p>
        <p class="text-sm">
          Accès : 
          <span :class="props.playlist.onlyFollowers ? 'text-red-400' : 'text-green-400'">
            {{ props.playlist.onlyFollowers ? 'Fermée' : 'Ouverte' }}
          </span>
        </p>
        <p class="text-sm text-gray-300">
          Musiques classées : {{ props.playlist.nbTracks }}/{{ props.playlist.maxRankedTracks }}
        </p>
      </div>

      <UButton
        :label="isFavoritePlaylist ? 'Retirer des favoris' : 'Ajouter aux favoris'"
        type="button"
        variant="solid"
        size="md"
        color="secondary"
        class="w-full mt-3"
        :icon="isFavoritePlaylist ? 'i-heroicons-heart-20-solid' : 'i-heroicons-heart'"
        @click="toggleFavorites"
      />
    </div>
  </div>

  <!-- Modal de follow -->
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
</template>
