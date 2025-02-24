<script lang="ts" setup>
import type { Playlist } from '~/types/session.type'

const route = useRoute()
const spaceStreamerId = route.query.streamer as string
const sessionStore = useSessionStore()
const isLoading = ref(true)
const isFavoriteStreamer = ref(false)
const favoriteIcon = ref(null)
const isSlideOverOpen = ref(false)

const { runGetSpaceStreamerData } = useSessionRepository()
const { runAddFavoriteStreamer, runDeleteFavoriteStreamer } =
  useViewerRepository()
const toast = useSpecialToast()

const proceedResult = (playlist: Playlist) => {
  sessionStore.addPlaylistsToList(playlist)
}

const toggleSlider = () => {
  isSlideOverOpen.value = !isSlideOverOpen.value
}

const toggleFavoriteStreamer = async () => {
  if (isFavoriteStreamer.value) {
    const response = await runDeleteFavoriteStreamer(spaceStreamerId)
    if (response) {
      isFavoriteStreamer.value = false
      favoriteIcon.value = 'heroicons:heart'
      toast.showSuccess('Space streamer retiré des favoris')
    }
  } else {
    const response = await runAddFavoriteStreamer(spaceStreamerId)
    if (response) {
      isFavoriteStreamer.value = true
      favoriteIcon.value = 'heroicons:heart-20-solid'
      toast.showSuccess('Space streamer ajouté aux favoris')
    }
  }
}


onMounted(async () => {
  isLoading.value = true
  try {

    const spaceData = await runGetSpaceStreamerData(null, spaceStreamerId)
    await sessionStore.updateSpaceStreamerData(spaceData)

    isFavoriteStreamer.value =
      sessionStore.spaceStreamer.spaceStreamer.isFavoriteSpaceStreamer

    if (isFavoriteStreamer.value) {
      favoriteIcon.value = 'heroicons:heart-20-solid'
    } else {
      favoriteIcon.value = 'heroicons:heart'
    }
  } catch (error) {
    console.error('Erreur lors du chargement des playlists :', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <UContainer>
    <!-- <h1>Space Streamer of {{sessionStore.spaceStreamer.spaceStreamer.spaceName}} for viewer</h1> -->
    <section>
      <UButton
      label="Les playlists du streamer"
      type="submit"
      variant="solid"
      size="xl"
      color="secondary"
      @click="toggleSlider"
    />
    <UButton
      label="Ajouter ce streamer à mes favoris"
      type="submit"
      variant="solid"
      size="xl"
      color="secondary"
      :icon="favoriteIcon"
      @click="toggleFavoriteStreamer"
    />
    </section>
   
    <SpecialSliderStreamer
      :isOpen="isSlideOverOpen"
      :playlists="sessionStore.spaceStreamer?.playlists || []"
      :openedByStreamer="false"
      @update:isOpen="isSlideOverOpen = $event"
      @proceed-result="proceedResult"
    />
  </UContainer>
</template>

<style></style>
