<script lang="ts" setup>
import type { Playlist } from '~/types/viewer.type'

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
    sessionStore.restoreSession()
    await viewerStore.updateViewerData(viewerData.data)


    if (viewerData.data.viewerData?.playlistSelected) {
      await updateCurrentPlaylist(viewerData.data.viewerData?.playlistSelected)
    } 

  } catch (error) {
    console.error('Erreur lors du chargement des playlists :', error)
  } finally {
    isLoading.value = false
  }
})

const updateCurrentPlaylist = async (playlist: Playlist) => {
  currentPlayList.value = playlist
}

watch(
  () => viewerStore.playlistSelected,
  async playlist => {
    if (playlist) {
      await updateCurrentPlaylist(viewerStore.playlistSelected)
    }
  }
)
</script>

<template>
  <UContainer v-if="!isLoading">
    <h1>Espace viewer {{ sessionStore.session?.user.email }}</h1>
    <section>
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
    </section>
    <h2 v-if="currentPlayList">
      {{
        currentPlayList.playlistName || 'Aucune playlist sélectionnée'
      }}
    </h2>

    <section></section>
    <SpecialSliderViewer
      :isOpen="isSlideOverOpen"
      :favoritesPlaylists="viewerStore.viewer?.favorites.playlists || []"
      :favoritesSpaceStreamers="
        viewerStore.viewer?.favorites.spaceStreamers || []
      "
      @update:isOpen="isSlideOverOpen = $event"
    />
  </UContainer>
</template>

<style></style>
