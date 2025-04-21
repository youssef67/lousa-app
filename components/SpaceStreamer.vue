<script lang="ts" setup>
import type { AddTrackResponse, BroadcastTrack, LikeTrackResponse, PlaylistCardInfo, TracksVersus, UpdateTracksVersusResponse } from '~/types/playlist.type'
import type { StreamerPlaylist, PlaylistInfo } from '~/types/streamer.type'
import { type Subscription } from '@adonisjs/transmit-client'

const { $transmit } = useNuxtApp()

const sessionStore = useSessionStore()
const { runGetStreamerProfile, runDeletePlaylist } = useStreamerRepository()
const { runGetTracksVersus, runGetPlaylistUpdatedForStreamer } = usePlaylistRepository()

const currentPlayListInfo = ref<PlaylistInfo | null>(null)
const playlistTracks = ref<BroadcastTrack[]>([])
const streamerPlaylists = ref<StreamerPlaylist[]>([])
const isLoading = ref(true)
const isSlideOverOpen = ref(false)
const isCreatePlaylistModalOpen = ref(false)
const isBattleLoading = ref(false)
const currentPlayList = ref<PlaylistCardInfo | null>(null)
const currentTracksVersus = ref<TracksVersus>(null)
const isUpdatingBattle = ref(false)
const { showSuccess, showError } = useSpecialToast()

const toggleSlider = () => {
  isSlideOverOpen.value = !isSlideOverOpen.value
}

let playlistUpdatedInstance: Subscription | null = null
let likedTracksInstance: Subscription | null = null
let tracksVersusUpdatedInstance: Subscription | null = null

const proceedUpdateAll = async () => {
  isBattleLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  const response = await runGetPlaylistUpdatedForStreamer(currentPlayList.value.id)

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

const proceedResult = (playlist: StreamerPlaylist) => {
  streamerPlaylists.value = [...streamerPlaylists.value, playlist]
  isCreatePlaylistModalOpen.value = false
}

const deletePlaylist = async (id: string) => {
  const playlistToDelete = streamerPlaylists.value.find(
    playlist => playlist.id === id
  )

  const response = await runDeletePlaylist(playlistToDelete.id)

  if (response.result) {
    streamerPlaylists.value = streamerPlaylists.value.filter(
      playlist => playlist.id !== id
    )
    showSuccess('Playlist supprimée avec succès')
  } else {
    showError('Erreur lors de la suppression de la playlist')
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

const changePlaylist = async (playlistId: string) => {
  isLoading.value = true

  const response = await runGetPlaylistUpdatedForStreamer(playlistId)

  if (response) {
    await closeAllEventStreams()

    await setTransmitSubscription(playlistId)

    currentTracksVersus.value = response.currentTracksVersus
    playlistTracks.value = response.playlistsTracks
    currentPlayListInfo.value = response.playlistInfoOfPlaylistSelected
    streamerPlaylists.value = response.playlists


    showSuccess('Playlist séléctionnée avec succés !')
  } else {
    showError('Une erreur est survenue lors de la sélection de la playlist')
  }
  // await closeAllEventStreams()

  // await setTransmitSubscription(playlistId)

  // const playlist = await runGetPlaylistTracks(playlistId)
  // currentPlayListInfo.value = playlist.playlistInfo
  // playlistTracks.value = playlist.playlistsTracks

  // const tracksVersus = await runGetTracksVersus(playlistId)

  // currentTracksVersus.value = tracksVersus.currentTracksVersus

  isLoading.value = false
}

async function setTransmitSubscription(playlistId: string) {
  try {
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
      console.log('playlistUpdated', data)
      console.log('sessionStore', sessionStore.session.user)
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
  isLoading.value = true
  try {
    const spaceStreamer = await runGetStreamerProfile()

    if (spaceStreamer.playlistInfoOfPlaylistSelected) {
      currentPlayListInfo.value = spaceStreamer.playlistInfoOfPlaylistSelected
      playlistTracks.value = spaceStreamer.playlistsTracks

      const tracksVersus = await runGetTracksVersus(spaceStreamer.playlistInfoOfPlaylistSelected.id)

      currentTracksVersus.value = tracksVersus.currentTracksVersus
    }

    streamerPlaylists.value = spaceStreamer.playlists

    setTransmitSubscription(spaceStreamer.playlistInfoOfPlaylistSelected.id)
  } catch (error) {
    console.error('Erreur lors du chargement des playlists :', error)
  } finally {
    isLoading.value = false
  }
})

onUnmounted(async () => {
  await closeAllEventStreams()
})

// watch(
//   () => streamerStore.playlistSelected,
//   async playlist => {
//     if (playlist) {
//       currentPlayList.value = streamerStore.playlistSelected
//     }
//   }
// )
</script>

<template>
  <UContainer>
    <AuthenticatedTwitchContainer>
      <AuthenticatedSpotifyContainer>
        <div>
          <h1 class="text-2xl font-bold mb-4">Espace de {{ sessionStore.session.user.email }}</h1>
        </div>
        <section>
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
        </section>

        <section>
          <div v-if="isBattleLoading" class="flex justify-center items-center py-12">
            <UIcon name="i-tabler-loader-2" class="animate-spin text-white text-4xl" />
            <span class="ml-4 text-white text-lg font-semibold"
              >Mise à jour de la playlist en cours...</span
            >
          </div>

          <div v-else-if="currentPlayListInfo" class="flex flex-col items-center text-center mb-3">
            <!-- Contenu principal -->
            <div v-if="!isLoading" class="w-full max-w-6xl">
              <div class="mb-8 text-center">
                <h2 class="text-white text-lg font-semibold mb-4">Duel en cours</h2>

                <div v-if="currentTracksVersus">
                  <TracksVersusSectionStreamer
                    :currentTracksVersus="currentTracksVersus"
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
                <PlaylistTrackRow
                  v-for="track in playlistTracks"
                  :key="track.trackId"
                  :track="track"
                />
              </div>
            </div>
          </div>

          <div v-else>
            <div class="text-center text-white text-sm py-6">Aucune playlist sélectionnée</div>
          </div>
        </section>

        <CreatePlaylistModal :is-open="isCreatePlaylistModalOpen" @proceed-result="proceedResult" />
        <SpecialSliderStreamer
          :isOpen="isSlideOverOpen"
          :playlists="streamerPlaylists || []"
          @update:isOpen="isSlideOverOpen = $event"
          @change-playlist="changePlaylist"
          @delete-playlist="deletePlaylist"
        />
      </AuthenticatedSpotifyContainer>
    </AuthenticatedTwitchContainer>
  </UContainer>
</template>

<style></style>
