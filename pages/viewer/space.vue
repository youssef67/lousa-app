<script lang="ts" setup>
import { type Track, type PlaylistViewer, type PlaylistTrack } from '~/types/playlist.type'

const isLoading = ref(true)
const isSlideOverOpen = ref(false)
const currentPlayList = ref<PlaylistViewer | null>(null)
const trackName = ref('Avant tu riais')
const { pushStreamers } = useSpecialRouter()
const isTracksValidationModalOpen = ref(false)
const foundTracks = ref<Track[]>(null)
const toast = useSpecialToast()
const playlistTracks = ref<PlaylistTrack[]>([])

const { runSearchTrack, runGetPlaylistTracks } =
  useViewerRepository()
const { handleError } = useSpecialError()

const proceedResult = (value: PlaylistTrack | null) => {
  if (value) {
    playlistTracks.value.push(value)
  }
  isTracksValidationModalOpen.value = false
}

const toggleSlider = () => {
  isSlideOverOpen.value = !isSlideOverOpen.value;
}

const changePlaylist = async (playlist: PlaylistViewer) => {
  isLoading.value = true

  currentPlayList.value = playlist

  const response = await runGetPlaylistTracks(playlist.id)

  if (response.playlistsTracks.length > 0) {
    playlistTracks.value = response.playlistsTracks
  }

  isLoading.value = false

}

async function searchTrack() {

  try {
    const playlistId = currentPlayList.value.id
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
</script>

<template>
  <UContainer>
    <!-- <h1>Espace viewer {{ sessionStore.session?.user.email }}</h1> -->
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
        <div
          v-if="playlistTracks.length > 0"
          class="divide-y divide-gray-700"
        >
          <PlaylistTrackRow
            v-for="track in playlistTracks"
            :key="track.id"
            :track="track"
          />
        </div>
      </div>
    </section>
      <TrackValidationModal
        :isOpen="isTracksValidationModalOpen"
        :foundTracks="foundTracks || []"
        :playlistId="currentPlayList?.id ?? ''"
        @proceed-result="proceedResult"
      />
      <SpecialSliderViewer
        :is-open="isSlideOverOpen"
        @update:isOpen="isSlideOverOpen = $event"
        @change-playlist="changePlaylist"
      />
  </UContainer>
</template>

<style></style>
