<script lang="ts" setup>
import type { Playlist } from '~/types/session.type'

const isLoading = ref(true)
const isSlideOverOpen = ref(false)
const currentPlayList = ref<Playlist | null>(null)

const toggleSlider = () => {
  isSlideOverOpen.value = !isSlideOverOpen.value
}

const sessionStore = useSessionStore()
const { pushStreamers } = useSpecialRouter()
const viewerStore = useViewerStore()
const { runGetViewerData } = useViewerRepository()

onMounted(async () => {
  isLoading.value = true
  try {
    const viewerData = await runGetViewerData()

    viewerStore.updateViewerData(viewerData)
    // const responseGetCurrentPlaylist = await runSetAndGetPLaylistSelected(null)

    // currentPlayList.value = responseGetCurrentPlaylist.playlist
  } catch (error) {
    console.error('Erreur lors du chargement des playlists :', error)
  } finally {
    isLoading.value = false
  }
})

watch(
  () => sessionStore.playlistSelected,
  async playlist => {
    if (playlist) {
      // const response = await runSetAndGetPLaylistSelected(playlist.id)
      // currentPlayList.value = response.playlist
    }
  }
)

</script>

<template>
  <UContainer> 
    <!-- <h1>Espace viewer {{ sessionStore.session.user.email}}</h1> -->
    <UButton
        label="Liste des streamers"
        type="submit"
        variant="solid"
        size="xl"
        color="secondary"
        @click="pushStreamers()"
      />
    <UButton
        label="Mes favoris"
        type="submit"
        variant="solid"
        size="xl"
        color="secondary"
        @click="toggleSlider"
      />
    <SpecialSliderViewer
        :isOpen="isSlideOverOpen"
        :favoritesPlaylists="viewerStore.viewer?.playlistsFavorites || []"
        :favoritesSpaceStreamers="viewerStore.viewer?.spaceStreamersFavorites || []"
        @update:isOpen="isSlideOverOpen = $event"
      />
  </UContainer>
</template>

<style></style>
