<script lang="ts" setup>
import { type Subscription, Transmit } from '@adonisjs/transmit-client'
import type {
  Track,
  playlistInfo,
  TracksVersus,
  BroadcastTrack,
  AddTrackResponse,
  ScoreAndLikes,
  LikeTrackResponse
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
const currentTracksVersus = ref<TracksVersus>(null)
const scoreAndLikes = ref<ScoreAndLikes>()
const sessionStore = useSessionStore()
const { showSuccess } = useSpecialToast()

let playlistUpdatedInstance: Subscription | null = null
let likedTracksInstance: Subscription | null = null

const { runSearchTrack, runGetPlaylistTracks } = usePlaylistRepository()
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

  console.log('changePlaylist', response)

  if (response) {
    currentPlayListInfo.value = response.playlistInfo
    playlistTracks.value = response.playlistsTracks
    currentTracksVersus.value = response.currentTracksVersus
    scoreAndLikes.value = response.scoreAndLikes

    sessionStore.updateSessionUser(response.user)

    await setTransmitSubscription(playlistId, response.currentTracksVersus)
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

async function setTransmitSubscription(
  playlistId: string,
  tracksVersus: TracksVersus
) {
  const transmit = new Transmit({
    baseUrl: `${config.public.siteUrl}/api/v1`
  })

  const playlistUpdated = transmit.subscription(
    `playlist/updated/${playlistId}`
  )

  playlistUpdatedInstance = playlistUpdated

  await playlistUpdated.create()

  playlistUpdated.onMessage(async (data: AddTrackResponse) => {
    console.log('playlistUpdated', data)
    playlistTracks.value = data.playlistTracksUpdated
    currentTracksVersus.value = data.nextTracksVersus
    scoreAndLikes.value = data.scoreAndLikes
  })

  if (tracksVersus) {
    const likeUpdated = transmit.subscription(
      `playlist/like/${tracksVersus.id}`
    )
    likedTracksInstance = likeUpdated
    await likeUpdated.create()

    likeUpdated.onMessage(async (data: LikeTrackResponse) => {
      scoreAndLikes.value = data.scoreAndLikes
      if (data.user && data.user.id === sessionStore.session.user.id) {
        sessionStore.updateSessionUser(data.user)
        showSuccess('Merci pour votre vote et votre soutien à votre streamer !')
      }
    })
  }
}

onUnmounted(async () => {
  if (playlistUpdatedInstance) {
    console.log('closeEventStream 1', playlistUpdatedInstance)
    await closeEventStream(playlistUpdatedInstance)
  }

  if (likedTracksInstance) {
    console.log('closeEventStream 2', likedTracksInstance)
    await closeEventStream(likedTracksInstance)
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
              :key="track.trackId"
              :track="track"
            />
          </div>
          <div>
            <h2>Battle</h2>
            <div v-if="currentTracksVersus">
              <TracksVersusSection
                :currentTracksVersus="currentTracksVersus"
                :scoreAndLikes="scoreAndLikes"
              />
            </div>
            <div v-else>
              <div class="text-center text-white text-sm py-6">
                🎵 En attente de nouveaux morceaux pour lancer un battle...
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>Aucune Playlist selectionnée</div>
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
