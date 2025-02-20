<script lang="ts" setup>
import type { Playlist } from '~/types/session.type'

const route = useRoute()
const spaceStreamerId = route.query.streamer as string
const sessionStore = useSessionStore()
const isLoading = ref(true)
const isSlideOverOpen = ref(false)

const { runGetSpaceStreamerData } = useSessionRepository()

const proceedResult = (playlist: Playlist) => {
  sessionStore.addPlaylistsToList(playlist)
}

const toggleSlider = () => {
  isSlideOverOpen.value = !isSlideOverOpen.value
}

onMounted(async () => {
  isLoading.value = true
  try {
    console.log(spaceStreamerId)
    
    const spaceData = await runGetSpaceStreamerData(null, spaceStreamerId)
    await sessionStore.updateSpaceStreamerData(spaceData)

    // await sessionStore.updateSpaceStreamerData(spaceData)

    // const responseGetCurrentPlaylist = await runSetAndGetPLaylistSelected(null)

    // currentPlayList.value = responseGetCurrentPlaylist.playlist
    // console.log(responseGetCurrentPlaylist)
  } catch (error) {
    console.error('Erreur lors du chargement des playlists :', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <UContainer>
    <h1>Space Streamer for viewer</h1>
    <UButton
        label="Mes playlists actives"
        type="submit"
        variant="solid"
        size="xl"
        color="secondary"
        @click="toggleSlider"
      />
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
