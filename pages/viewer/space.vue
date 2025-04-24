<script lang="ts" setup>
import { type Subscription } from '@adonisjs/transmit-client'
import type { Track, playlistInfo, TracksVersus, BroadcastTrack } from '~/types/playlist.type'

const sessionStore = useSessionStore()

const { pushStreamers, pushStats } = useSpecialRouter()
const { showSuccess, showError } = useSpecialToast()
const { subscribeToPlaylist } = usePlaylistTransmit()
const { updatePlaylist } = usePlaylistUpdater()
const { runSearchTrack, runGetPlaylist, runGetPlaylistSelected } = usePlaylistRepository()
const { refreshUserSession} = useSessionRepository()
const { handleError } = useSpecialError()
const toast = useSpecialToast()

const currentPlayListInfo = ref<playlistInfo | null>(null)
const playlistTracks = ref<BroadcastTrack[]>([])
const currentTracksVersus = ref<TracksVersus>(null)
const foundTracks = ref<Track[]>([])
const trackName = ref('')

const isSlideOverOpen = ref(false)
const isTracksValidationModalOpen = ref(false)
const isLoading = ref(true)
const isBattleLoading = ref(false)
const isUpdatingBattle = ref(false)
const isFirstLoaded = ref(true)

let playlistUpdatedInstance: Subscription | null = null
let likedTracksInstance: Subscription | null = null
let tracksVersusUpdatedInstance: Subscription | null = null

const toggleSlider = () => {
  isSlideOverOpen.value = !isSlideOverOpen.value
}

const changePlaylist = async (playlistId: string) => {
  isLoading.value = true

  const response = await runGetPlaylist(playlistId)

  if (response) {
    await closeAllEventStreams()

    await setTransmitSubscription(playlistId)

    currentPlayListInfo.value = response.currentPlaylist
    playlistTracks.value = response.playlistsTracks
    currentTracksVersus.value = response.currentTracksVersus

    if (!isFirstLoaded.value) {
      showSuccess('Playlist séléctionnée avec succés !')
    } else {
      isFirstLoaded.value = false
    }
  }

  isLoading.value = false
}

const proceedUpdateAll = async () => {
  isBattleLoading.value = true

  if (!currentPlayListInfo.value?.id) {
    showError('Aucune playlist sélectionnée')
    isBattleLoading.value = false
    return
  }

  const result = await updatePlaylist(currentPlayListInfo.value?.id, false)
  if (result?.success) {
    playlistTracks.value = result.tracks
    currentTracksVersus.value = result.versus
    sessionStore.updateSessionUser(result.currentUser)

    showSuccess('Playlist mise à jour avec succès !')
  }

  isBattleLoading.value = false
}

// Fonction de verrouillage
const handleUpdateAll = async () => {
  if (isUpdatingBattle.value) return // évite les appels multiples
  isUpdatingBattle.value = true

  try {
    await proceedUpdateAll()
  } finally {
    isUpdatingBattle.value = false
  }
}

async function searchTrack(value?: string) {
  try {
    if (!currentPlayListInfo.value?.id) return showError('Aucune playlist sélectionnée')
    const playlistId = currentPlayListInfo.value.id

    const searchValue = value || trackName.value
    if (!searchValue) return toast.showError('Veuillez saisir un nom de musique')

    const response = await runSearchTrack(playlistId, searchValue)

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
    const subs = await subscribeToPlaylist(
      playlistId,
      async data => {
        isTracksValidationModalOpen.value = false
        if (data.playlistTracksUpdated) {
          showSuccess('Une nouvelle musique a été ajoutée à la playlist !')
          playlistTracks.value = data.playlistTracksUpdated

          const userId = sessionStore.session.user.id

          if (userId === data.userWinner.id) {
            await refreshUserSession()
          }
        } else {
          showError('Une erreur est survenue lors de la mise à jour de la playlist')
        }
      },
      data => {
        currentTracksVersus.value = data.currentTracksVersus
      },
      data => {
        currentTracksVersus.value = data.currentTracksVersus
      }
    )

    playlistUpdatedInstance = subs.playlistUpdated
    likedTracksInstance = subs.likeUpdated
    tracksVersusUpdatedInstance = subs.tracksVersusUpdated

    console.log('viewer - Subscribed to playlist streams', {
      playlistUpdatedInstance,
      likedTracksInstance,
      tracksVersusUpdatedInstance,
    })
  } catch (error) {
    console.error('Erreur dans setTransmitSubscription:', error)
  }
}

onMounted(async () => {
  isLoading.value = true

  try {
    const response = await runGetPlaylistSelected()

    if (response) {
      await changePlaylist(response.playlistId)
    }
  } catch (error) {
    console.error('Erreur dans onMounted:', error)
  } finally {
    isLoading.value = false
  }
})

onUnmounted(async () => {
  await closeAllEventStreams()
})
</script>

<template>
  <UContainer class="flex flex-col max-w-full space-y-10">
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
          @click="searchTrack()"
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
        <div v-if="!isLoading" class="w-full max-w-6xl">
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
      :foundTracks="foundTracks"
      :playlistId="currentPlayListInfo?.id ?? ''"
      @update:isOpen="isTracksValidationModalOpen = $event"
    />
    <SpecialSliderViewer
      :is-open="isSlideOverOpen"
      @update:isOpen="isSlideOverOpen = $event"
      @change-playlist="changePlaylist"
    />
  </UContainer>
</template>

<style></style>
