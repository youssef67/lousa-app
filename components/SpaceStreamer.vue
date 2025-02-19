
<script lang="ts" setup>
import { Subscription, Transmit } from '@adonisjs/transmit-client'
import {
  type SpotifyLoginResponse,
  type SpotifyUserSession
} from '~~/types/session.type'
import type { Playlist } from '~/types/session.type'

const route = useRoute()
const config = useRuntimeConfig()
const { showSuccess } = useSpecialToast()
const sessionStore = useSessionStore()
const { runSetAndGetPLaylistSelected, runGetSpaceStreamerData } = useSessionRepository()
const { handleError } = useSpecialError()
const userName = route.query.username

const isLoading = ref(true)
const isSlideOverOpen = ref(false)
const isCreatePlaylistModalOpen = ref(false)
const currentPlayList = ref<Playlist | null>(null)
const { runLoginSpotifyStreamer } = useAuthRepository()

const toggleSlider = () => {
  isSlideOverOpen.value = !isSlideOverOpen.value
}

const proceedResult = (playlist: Playlist) => {
  sessionStore.addPlaylistsToList(playlist)
  isCreatePlaylistModalOpen.value = false
}

const connectSpotifyAccount = async () => {
  const transmit = new Transmit({
    baseUrl: `${config.public.siteUrl}/api/v1`
  })

  const subscription = transmit.subscription(
    `authentication/spotify/${sessionStore.session.user.id}`
  )

  await subscription.create()

  try {
    const newWindow = await runLoginSpotifyStreamer()

    subscription.onMessage(async (data: SpotifyLoginResponse) => {
      const jsonData = JSON.parse(data.spotifyUser) as SpotifyUserSession

      await sessionStore.updateSessionSpotifyUser(jsonData)
      showSuccess('Vous êtes maintenant connecté à Spotify')

      newWindow?.close()
      await closeEventStream(subscription)
    })
  } catch (error) {
    handleError(error)
  }
}

async function closeEventStream(subscription: Subscription) {
  await subscription.delete()
}

onMounted(async () => {
  isLoading.value = true
  try {
    const spaceData = await runGetSpaceStreamerData()

    await sessionStore.updateSpaceStreamerData(spaceData)


    // const responseGetCurrentPlaylist = await runSetAndGetPLaylistSelected(null)

    // currentPlayList.value = responseGetCurrentPlaylist.playlist
    // console.log(responseGetCurrentPlaylist)
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
      const response = await runSetAndGetPLaylistSelected(playlist.id)
      currentPlayList.value = response.playlist
    }
  }
)
</script>

<template>
  <UContainer>
    <div>
      <h1 class="text-2xl font-bold mb-4">Espace de {{ userName }}</h1>
    </div>
    <section
      v-if="!sessionStore.isSpotifyUserAuthenticated()"
      class="flex flex-col items-center gap-5 mb-10"
    >
      <p class="text-center">
        Afin de profiter des fonctionnalités de l'espace de {{ userName }}, vous
        devez vous authentifier avec votre compte Spotify.
      </p>
      <UButton
        label="Se connecter à son compte Spotify"
        type="submit"
        variant="solid"
        size="xl"
        color="secondary"
        @click="connectSpotifyAccount"
      />
    </section>
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
      :disabled="!sessionStore.isSpotifyUserAuthenticated()"
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
      :playlists="sessionStore.spaceStreamer?.playlists || []"
      @update:isOpen="isSlideOverOpen = $event"
      @proceed-result="proceedResult"
    />
  </UContainer>
</template>


<style></style>
