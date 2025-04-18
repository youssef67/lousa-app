<script lang="ts" setup>
import { type Subscription, Transmit } from '@adonisjs/transmit-client'
import type {
  Track,
  playlistInfo,
  TracksVersus,
  BroadcastTrack,
  AddTrackResponse,
  LikeTrackResponse,
  UpdateTracksVersusResponse,
} from '~/types/playlist.type'

const { $transmit } = useNuxtApp()
const isLoading = ref(true)
// const config = useRuntimeConfig()
const isSlideOverOpen = ref(false)
const sessionStore = useSessionStore()
const currentPlayListInfo = ref<playlistInfo | null>(null)
const trackName = ref('Avant tu riais')
const { pushStreamers, pushStats } = useSpecialRouter()
const isTracksValidationModalOpen = ref(false)
const foundTracks = ref<Track[]>(null)
const toast = useSpecialToast()
const playlistTracks = ref<BroadcastTrack[]>([])
const currentTracksVersus = ref<TracksVersus>(null)
const { showSuccess, showError } = useSpecialToast()
const isBattleLoading = ref(false)
const isUpdatingBattle = ref(false)

let playlistUpdatedInstance: Subscription | null = null
let likedTracksInstance: Subscription | null = null
let tracksVersusUpdatedInstance: Subscription | null = null

const {
  runSearchTrack,
  runGetPlaylistTracks,
  runGetTracksVersus,
  runAddTrack,
  runGetPlaylistSelected,
} = usePlaylistRepository()
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
  await closeAllEventStreams()

  await setTransmitSubscription(playlistId)

  const playlist = await runGetPlaylistTracks(playlistId)
  currentPlayListInfo.value = playlist.playlistInfo
  playlistTracks.value = playlist.playlistsTracks

  const tracksVersus = await runGetTracksVersus(playlistId)

  currentTracksVersus.value = tracksVersus.currentTracksVersus

  isLoading.value = false
}

async function searchTrack(value: string) {
  try {
    const playlistId = currentPlayListInfo.value.id
    const response = await runSearchTrack(playlistId, value ?? trackName.value)

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

const proceedUpdateAll = async () => {
  isBattleLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  const response = await runAddTrack(currentTracksVersus.value.id)

  console.log('response runAddTrack', response)
  if (response) {
    currentTracksVersus.value = response.currentTracksVersus
    playlistTracks.value = response.playlistsTracks
    sessionStore.updateSessionUser(response.currentUser)
    showSuccess('La mise à jour de la playlist a été effectuée avec succès !')
  } else {
    showError('Une erreur est survenue lors de la mise à jour de la playlist')
  }

  isBattleLoading.value = false
}

const handleUpdateAll = async () => {
  if (isUpdatingBattle.value) return // ⛔️ évite les appels multiples
  isUpdatingBattle.value = true

  await proceedUpdateAll()

  isUpdatingBattle.value = false
}

async function closeEventStream(subscription: Subscription) {
  await subscription.delete()
}

async function closeAllEventStreams() {
  if (playlistUpdatedInstance) {
    await closeEventStream(playlistUpdatedInstance)
  }

  if (likedTracksInstance) {
    await closeEventStream(likedTracksInstance)
  }

  if (tracksVersusUpdatedInstance) {
    await closeEventStream(tracksVersusUpdatedInstance)
  }
}

async function setTransmitSubscription(playlistId: string) {
  try {
    // const transmit = new Transmit({
    //   baseUrl: `${config.public.siteUrl}/api/v1`,
    // })

    const playlistUpdated = $transmit.subscription(`playlist/updated/${playlistId}`)
    const likeUpdated = $transmit.subscription(`playlist/like/${playlistId}`)
    const tracksVersusUpdated = $transmit.subscription(`playlist/tracksVersus/${playlistId}`)

    playlistUpdatedInstance = playlistUpdated
    likedTracksInstance = likeUpdated
    tracksVersusUpdatedInstance = tracksVersusUpdated

    await playlistUpdated.create()
    await likeUpdated.create()
    await tracksVersusUpdated.create()

    playlistUpdated.onMessage(async (data: AddTrackResponse) => {
      isTracksValidationModalOpen.value = false
      if (data.playlistTracksUpdated) {
        showSuccess('Une nouvelle musique a été ajoutée à la playlist !')
        playlistTracks.value = data.playlistTracksUpdated
      } else {
        showError('Une erreur est survenue lors de la mise à jour de la playlist')
      }
    })

    likeUpdated.onMessage(async (data: LikeTrackResponse) => {
      console.log('likeUpdated', data)
      currentTracksVersus.value = data.currentTracksVersus
    })

    tracksVersusUpdated.onMessage(async (data: UpdateTracksVersusResponse) => {
      currentTracksVersus.value = data.currentTracksVersus
    })
  } catch (error) {
    console.error('Erreur dans setTransmitSubscription:', error)
  }
}

onMounted(async () => {
  console.log('🔁 Transmit check', Transmit)

  try {
    console.log('onMounted')
    const response = await runGetPlaylistSelected()

    if (response) {
      await changePlaylist(response.playlistId)
    }
  } catch (error) {
    console.error('Erreur dans onMounted:', error)
  }
})

onUnmounted(async () => {
  await closeAllEventStreams()
})
</script>

<template>
  <UContainer class="flex flex-col space-y-10">
    <!-- <h1>Espace viewer {{ sessionStore.session?.user.email }}</h1> -->
    <section class="flex flex-wrap gap-4 md:flex-nowrap md:gap-2 w-full">
      <UButton
        label="Liste des streamers"
        type="submit"
        icon="i-tabler-list-search"
        variant="solid"
        size="xl"
        color="secondary"
        class="w-full md:w-auto"
        @click="pushStreamers()"
      />
      <UButton
        label="Mes stats"
        type="submit"
        icon="i-tabler-presentation-analytics-filled"
        variant="solid"
        size="xl"
        color="secondary"
        class="w-full md:w-auto"
        @click="pushStats(sessionStore.session?.user.id, true)"
      />
      <UButton
        label="Mes favoris"
        type="submit"
        icon="i-tabler-eye-heart"
        variant="solid"
        size="xl"
        color="secondary"
        class="w-full md:w-auto"
        @click="toggleSlider"
      />

      <div class="flex w-full gap-2 md:flex-1">
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
          class="flex-1 min-w-[150px]"
        />
        <UButton
          icon="i-tabler-music-search"
          variant="solid"
          size="xl"
          color="secondary"
          class="w-auto"
          @click="searchTrack(null)"
        />
      </div>
    </section>

    <section>
      <div v-if="isBattleLoading" class="flex justify-center items-center py-12">
        <UIcon name="i-tabler-loader-2" class="animate-spin text-white text-4xl" />
        <span class="ml-4 text-white text-lg font-semibold"
          >Mise à jour de la playlist en cours...</span
        >
      </div>

      <div v-else-if="currentPlayListInfo" class="flex flex-col items-center text-center mb-3">
        <!-- Nom du streamer -->
        <h1 class="text-xl md:text-2xl font-bold text-white mb-2">
          {{ currentPlayListInfo.spaceStreamerName }}
        </h1>

        <!-- Petite image du streamer -->
        <img
          :src="currentPlayListInfo.spaceStreamerImg"
          class="w-24 h-24 object-cover rounded-full shadow-md mb-4"
          alt="Image du streamer"
        />

        <!-- Contenu principal -->
        <div v-if="!isLoading" class="w-full max-w-4xl">
          <div class="mb-8 text-center">
            <h2 class="text-white text-lg font-semibold mb-4">Duel en cours</h2>

            <div v-if="currentTracksVersus">
              <TracksVersusSection
                :currentTracksVersus="currentTracksVersus"
                :handleSearchTrack="searchTrack"
                @updateAll="handleUpdateAll"
              />
            </div>
            <div v-else>
              <div class="text-center text-white text-sm py-6">
                🎵 En attente de nouveaux morceaux pour lancer un battle...
              </div>
            </div>
          </div>

          <div class="text-white text-xl font-bold mb-4 text-center">
            {{ currentPlayListInfo.playlistName }}
          </div>

          <div v-if="playlistTracks.length > 0" class="divide-y divide-gray-700">
            <PlaylistTrackRow v-for="track in playlistTracks" :key="track.trackId" :track="track" />
          </div>
        </div>
      </div>

      <div v-else>
        <div class="text-center text-white text-sm py-6">Aucune playlist sélectionnée</div>
      </div>
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
