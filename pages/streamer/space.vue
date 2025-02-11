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
const { handleError } = useSpecialError()
const userName = route.query.username

const isLoading = ref(true)
const isSlideOverOpen = ref(false)
const isCreatePlaylistModalOpen = ref(false)
const { runGetAllPlaylists } = useSpotifyRepository()
const { runLoginSpotifyStreamer } = useAuthRepository()

const toggleSlider = () => {
  isSlideOverOpen.value = !isSlideOverOpen.value
}

const proceedResult = (playlist: Playlist) => {
  sessionStore.updatePlaylistsList(playlist)
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
    const response = await runGetAllPlaylists()
    sessionStore.getPlaylistsList(response.playlists)
  } catch (error) {
    console.error('Erreur lors du chargement des playlists :', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <UContainer>
    <div>
      <h1 class="text-2xl font-bold mb-4">Espace de {{ userName }}</h1>
    </div>
    <AuthenticatedTwitchContainer :isStreamerAuthentication="true">
      <section
        v-if="!sessionStore.isSpotifyUserAuthenticated()"
        class="flex flex-col items-center gap-5 mb-10"
      >
        <p class="text-center">
          Afin de profiter des fonctionnalités de l'espace de {{ userName }},
          vous devez vous authentifier avec votre compte Spotify.
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
        <div v-if="sessionStore.playlistSelected === null">
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
          <p>{{ sessionStore.playlistSelected.id }}</p>
          <p>{{ sessionStore.playlistSelected.playlistName }}</p>
        </div>
      </ul>

      <CreatePlaylistModal
        :is-open="isCreatePlaylistModalOpen"
        @proceed-result="proceedResult"
      />
      <SpecialSlider
        :isOpen="isSlideOverOpen"
        :playlists="sessionStore.playlistsList"
        @update:isOpen="isSlideOverOpen = $event"
        @proceed-result="proceedResult"
      />
    </AuthenticatedTwitchContainer>
  </UContainer>
</template>

<style></style>
