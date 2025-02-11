<script setup lang="ts">
import type { Playlist } from '~/types/session.type'

const playlists = ref<Playlist[]>([])
const isLoading = ref(true)
const isSlideOverOpen = ref(false)
const isCreatePlaylistModalOpen = ref(false)
const { runGetAllPlaylists } = useSpotifyRepository()

const toggleSlider = () => {
  isSlideOverOpen.value = !isSlideOverOpen.value
}

const proceedResult = (playlist: Playlist) => {
  playlists.value.push(playlist)
  isCreatePlaylistModalOpen.value = false
}

onMounted(async () => {
  isLoading.value = true
  try {
    const response = await runGetAllPlaylists()
    playlists.value = response.playlists || []
  } catch (error) {
    console.error('Erreur lors du chargement des playlists :', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <UContainer>
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
      <h2>Playlist selectionnée</h2>
    </ul>
    <CreatePlaylistModal
      :is-open="isCreatePlaylistModalOpen"
      @proceed-result="proceedResult"
    />
    <SpecialSlider
      :isOpen="isSlideOverOpen"
      :playlists="playlists"
      @update:isOpen="isSlideOverOpen = $event"
      @proceed-result="proceedResult"
    />
  </UContainer>
</template>
