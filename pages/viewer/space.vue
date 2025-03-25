<script lang="ts" setup>
import { Subscription, Transmit } from '@adonisjs/transmit-client'
import type {
  Track,
  PlaylistTrack,
  playlistInfo,
  Versus,
  BroadcastTrack
} from '~/types/playlist.type'

const isLoading = ref(true)
const config = useRuntimeConfig()
const isSlideOverOpen = ref(false)
const currentPlayListInfo = ref<playlistInfo | null>(null)
const trackName = ref('Avant tu riais')
const { pushStreamers } = useSpecialRouter()
const isTracksValidationModalOpen = ref(false)
const foundTracks = ref<Track[]>(null)
const toast = useSpecialToast()
const playlistTracks = ref<BroadcastTrack[]>([])
const pendingTracks = ref<PlaylistTrack[]>([])
const versus = ref<Versus>(null)
const subscriptionInstance = ref<Subscription | null>(null)

const { runSearchTrack, runGetPlaylistTracks, runRefreshVersus } =
  usePlaylistRepository()
const { handleError } = useSpecialError()

const proceedResult = (value: BroadcastTrack | null) => {
  if (value) {
    playlistTracks.value.push(value)
  }
  isTracksValidationModalOpen.value = false
}

const toggleSlider = () => {
  isSlideOverOpen.value = !isSlideOverOpen.value
}

const changePlaylist = async (playlistId: string) => {
  isLoading.value = true

  const response = await runGetPlaylistTracks(playlistId)

  if (response) {
    currentPlayListInfo.value = response.playlistInfo
    playlistTracks.value = response.playlistsTracks
    pendingTracks.value = response.playlistsPendingTracks
    versus.value = response.versus

    await setTransmitSubscription(playlistId)
  }

  isLoading.value = false
}

async function searchTrack() {
  try {
    const playlistId = currentPlayListInfo.value.id
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

async function closeEventStream(subscription: Subscription) {
  await subscription.delete()
}

async function setTransmitSubscription(playlistId: string) {
  const transmit = new Transmit({
    baseUrl: `${config.public.siteUrl}/api/v1`
  })

  const subscription = transmit.subscription(`playlist/updated/${playlistId}`)

  subscriptionInstance.value = subscription

  await subscription.create()

  subscription.onMessage(
    async (data: { playlistTracksUpdated: BroadcastTrack[] }) => {
      console.log('subscription.onMessage', data)
      playlistTracks.value = data.playlistTracksUpdated
      await runRefreshVersus(playlistId)
    }
  )
}

onUnmounted(async () => {
  if (subscriptionInstance.value) {
    await closeEventStream(subscriptionInstance.value as any)
  }
})
</script>

<template>
  <UContainer class="flex flex-col space-y-10">
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
      <div v-if="currentPlayListInfo" class="flex flex-col">
        <div v-if="!isLoading">
          {{ currentPlayListInfo.playlistName }}
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
          <div></div>
        </div>
      </div>
      <div v-else>Aucune Playlist selectionnée</div>
    </section>
    <section v-if="versus">
      <h2>Battle</h2>
      <PendingTrackSection :versus="versus" />
    </section>
    <TrackValidationModal
      :isOpen="isTracksValidationModalOpen"
      :foundTracks="foundTracks || []"
      :playlistId="currentPlayListInfo?.id ?? ''"
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
