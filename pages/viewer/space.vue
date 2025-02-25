<script lang="ts" setup>
import { type Track, type Playlist } from '~/types/viewer.type'

const isLoading = ref(true)
const isSlideOverOpen = ref(false)
const currentPlayList = ref<Playlist | null>(null)

const toggleSlider = () => {
  isSlideOverOpen.value = !isSlideOverOpen.value
}

const sessionStore = useSessionStore()
const trackName = ref('Avant tu riais')

const { pushStreamers } = useSpecialRouter()
const isTracksValidationModalOpen = ref(false)
const foundTracks = ref<Track[]>(null)
const toast = useSpecialToast()
const viewerStore = useViewerStore()
const { runGetViewerData, runSearchTrack, runGetPlaylistTracks } =
  useViewerRepository()
const { handleError } = useSpecialError()

const proceedResult = () => {
  isTracksValidationModalOpen.value = false
}

async function searchTrack() {
  try {
    const playlistId = viewerStore.viewer.viewerData.playlistSelected.id
    const response = await runSearchTrack(playlistId, trackName.value)

    if (response.foundTracks.length > 0) {
      foundTracks.value = response.foundTracks
      isTracksValidationModalOpen.value = true
    } else {
      toast.showError('Aucun titre trouvé')
    }
  } catch (error) {
    handleError(error)
  }
}

const updateCurrentPlaylist = async (playlist: Playlist) => {
  currentPlayList.value = playlist
}

onMounted(async () => {
  isLoading.value = true
  try {
    const viewerData = await runGetViewerData()
    sessionStore.restoreSession()
    await viewerStore.updateViewerData(viewerData.data)

    if (viewerData.data.viewerData?.playlistSelected) {
      await updateCurrentPlaylist(viewerData.data.viewerData?.playlistSelected)
    }

    const response = await runGetPlaylistTracks(
      viewerStore.viewer.viewerData.playlistSelected.id
    )
    await viewerStore.initializePlaylistTracks(response.playlistsTracks)

    console.log(viewerStore.playlistTracks)
    console.log('response', response)
  } catch (error) {
    console.error('Erreur lors du chargement des playlists :', error)
  } finally {
    isLoading.value = false
  }
})

watch(
  () => viewerStore.playlistSelected,
  async playlist => {
    if (playlist) {
      await updateCurrentPlaylist(viewerStore.playlistSelected)
    }
  }
)

watch(
  () => trackName.value,
  (newVal, oldVal) => {
    console.log(`Le nom de la playlist est passé de "${oldVal}" à "${newVal}"`)
  }
)
</script>

<template>
  <UContainer v-if="!isLoading">
    <h1>Espace viewer {{ sessionStore.session?.user.email }}</h1>
    <section class="flex gap-2">
      <UButton
        label="Liste des streamers"
        type="submit"
        icon="i-tabler-list-search"
        variant="solid"
        size="xl"
        color="secondary"
        @click="pushStreamers()"
      />
      <UButton
        label="Mes favoris"
        type="submit"
        icon="i-tabler-eye-heart"
        variant="solid"
        size="xl"
        color="secondary"
        @click="toggleSlider"
      />
      <UInput
        ref="inputText"
        v-model="trackName"
        input-text
        type="text"
        :placeholder="'Saisissez le nom de musique'"
        required
        size="xl"
        icon="i-tabler-music-heart"
        autocomplete="off"
      />
      <UButton
        label="Rechercher"
        variant="solid"
        size="xl"
        color="secondary"
        class="flex"
        @click="searchTrack()"
      />
    </section>

    <section>
      <h2 v-if="currentPlayList">
        {{ currentPlayList.playlistName || 'Aucune playlist sélectionnée' }}
      </h2>
      <div v-if="!isLoading">
        <div v-if="viewerStore.playlistTracks.length > 0">
          <div v-for="track in viewerStore.playlistTracks" :key="track.id" class="mt-2 mx-2">
            <PlaylistTrackRow :tracks="track" />
          </div>
          
        </div>
       
      </div>
    </section>
    <TrackValidationModal
      :isOpen="isTracksValidationModalOpen"
      :foundTracks="foundTracks || []"
      :playlistId="viewerStore.viewer?.viewerData?.playlistSelected?.id"
      @proceed-result="proceedResult"
    />
    <SpecialSliderViewer
      :is-open="isSlideOverOpen"
      :favoritesPlaylists="viewerStore.viewer?.favorites.playlists || []"
      :favoritesSpaceStreamers="
        viewerStore.viewer?.favorites.spaceStreamers || []
      "
      @update:isOpen="isSlideOverOpen = $event"
    />
  </UContainer>
</template>

<style></style>
