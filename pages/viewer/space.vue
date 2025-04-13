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
const sessionStore = useSessionStore()
const { showSuccess, showError } = useSpecialToast()
const isBattleLoading = ref(false)
const isUpdatingBattle = ref(false)



let playlistUpdatedInstance: Subscription | null = null
let likedTracksInstance: Subscription | null = null
let tracksVersusUpdatedInstance: Subscription | null = null

const { runSearchTrack, runGetPlaylistTracks, runGetTracksVersus, runAddTrack } = usePlaylistRepository()
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

  await setTransmitSubscription(playlistId)

  const playlist = await runGetPlaylistTracks(playlistId)
  currentPlayListInfo.value = playlist.playlistInfo
  playlistTracks.value = playlist.playlistsTracks

  const tracksVersus = await runGetTracksVersus(playlistId)

  console.log('tracksVersus', tracksVersus)
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
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const response = await runAddTrack(currentTracksVersus.value.id)

    if (response) {
      currentTracksVersus.value = response.currentTracksVersus
      playlistTracks.value = response.playlistsTracks
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

async function setTransmitSubscription(playlistId: string) {
  const transmit = new Transmit({
    baseUrl: `${config.public.siteUrl}/api/v1`,
  })

  const playlistUpdated = transmit.subscription(`playlist/updated/${playlistId}`)
  const likeUpdated = transmit.subscription(`playlist/like/${playlistId}`)
  const tracksVersusUpdated = transmit.subscription(`playlist/tracksVersus/${playlistId}`)

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
    currentTracksVersus.value = data.currentTracksVersus
  })

  tracksVersusUpdated.onMessage(async (data: UpdateTracksVersusResponse) => {
    showSuccess('La claaaasse!')
    console.log('iscomplete', data.currentTracksVersus.isComplete)
    currentTracksVersus.value = data.currentTracksVersus
  })
}

onUnmounted(async () => {
  if (playlistUpdatedInstance) {
    await closeEventStream(playlistUpdatedInstance)
  }

  if (likedTracksInstance) {
    await closeEventStream(likedTracksInstance)
  }

  if (tracksVersusUpdatedInstance) {
    await closeEventStream(tracksVersusUpdatedInstance)
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
        @click="searchTrack(null)"
      />
    </section>

    <section>
  <div v-if="isBattleLoading" class="flex justify-center items-center py-12">
    <UIcon name="i-tabler-loader-2" class="animate-spin text-white text-4xl" />
    <span class="ml-4 text-white text-lg font-semibold">Mise à jour de la playlist en cours...</span>
  </div>

  <div v-else-if="currentPlayListInfo" class="flex flex-col">
    <div v-if="!isLoading">
      <div class="text-white text-xl font-bold mb-4">
        {{ currentPlayListInfo.playlistName }}
      </div>
      <div class="mb-8">
        <h2 class="text-white text-lg font-semibold mb-4">Battle</h2>

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
      <div v-if="playlistTracks.length > 0" class="divide-y divide-gray-700">
        <PlaylistTrackRow
          v-for="track in playlistTracks"
          :key="track.trackId"
          :track="track"
        />
      </div>

     
    </div>
  </div>

  <div v-else>
    <div class="text-center text-white text-sm py-6">
      Aucune playlist sélectionnée
    </div>
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
