<script lang="ts" setup>
import type { PlaylistStreamer } from '~/types/playlist.type'

const sessionStore = useSessionStore()
const streamerStore = useStreamerStore()
const { runGetStreamerProfile } = useStreamerRepository()

const isLoading = ref(true)
const isSlideOverOpen = ref(false)
const isCreatePlaylistModalOpen = ref(false)
const currentPlayList = ref<PlaylistStreamer | null>(null)

const toggleSlider = () => {
  isSlideOverOpen.value = !isSlideOverOpen.value
}

const proceedResult = (playlist: PlaylistStreamer) => {
  streamerStore.addPlaylistsToList(playlist)
  isCreatePlaylistModalOpen.value = false
}

onMounted(async () => {
  isLoading.value = true
  try {
    const spaceData = await runGetStreamerProfile()
    await streamerStore.updateSpaceStreamer(spaceData)
  } catch (error) {
    console.error('Erreur lors du chargement des playlists :', error)
  } finally {
    isLoading.value = false
  }
})

watch(
  () => streamerStore.playlistSelected,
  async playlist => {
    if (playlist) {
      console.log('playlist selected', playlist)
      currentPlayList.value = streamerStore.playlistSelected
    }
  }
)
</script>

<template>
  <UContainer>
    <AuthenticatedTwitchContainer>
      <AuthenticatedSpotifyContainer>
        <div>
          <h1 class="text-2xl font-bold mb-4">
            Espace de {{ sessionStore.session.user.email }}
          </h1>
        </div>

        <UButton
          label="Mes playlists actives"
          type="submit"
          variant="solid"
          size="xl"
          color="secondary"
          @click="toggleSlider"
        />
        <UButton
          label="créer une playlist"
          type="submit"
          variant="solid"
          size="xl"
          color="secondary"
          @click="isCreatePlaylistModalOpen = true"
        />
        <div v-if="isLoading">Chargement des playlists...</div>
        <ul v-else>
          <div v-if="currentPlayList === null">
            <h2>Aucune playlist selectionnée</h2>
            <UButton
              label="Sélectionner une playlist"
              type="submit"
              variant="solid"
              size="xl"
              color="secondary"
              @click="toggleSlider"
            />
          </div>
          <div v-else>
            <h2>Playlist selected</h2>
            <p>{{ currentPlayList.id }}</p>
            <p>{{ currentPlayList.playlistName }}</p>
          </div>
        </ul>

        <CreatePlaylistModal
          :is-open="isCreatePlaylistModalOpen"
          @proceed-result="proceedResult"
        />
        <SpecialSliderStreamer
          :isOpen="isSlideOverOpen"
          :playlists="streamerStore.streamerPlaylists || []"
          @update:isOpen="isSlideOverOpen = $event"
          @proceed-result="proceedResult"
        />
      </AuthenticatedSpotifyContainer>
    </AuthenticatedTwitchContainer>
  </UContainer>
</template>

<style></style>
