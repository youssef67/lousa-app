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

</script>

<template>
  <UContainer>
    <AuthenticatedTwitchContainer>
      <AuthenticatedSpotifyContainer>
        <div class="space-y-10 py-6">
          <!-- Header utilisateur -->
          <div class="text-center">
            <h1 class="text-3xl font-bold text-white">
              Bienvenue, {{ sessionStore.session.user.email }}
            </h1>
          </div>

          <!-- Actions principales -->
          <section class="flex flex-wrap justify-center gap-4">
            <UButton
              label="Mes playlists actives"
              type="button"
              variant="solid"
              size="xl"
              color="secondary"
              @click="toggleSlider"
            />
            <UButton
              label="Créer une playlist"
              type="button"
              variant="solid"
              size="xl"
              color="secondary"
              @click="isCreatePlaylistModalOpen = true"
            />
          </section>

          <!-- Zone de battle / playlist -->
          <section>
            <!-- Loader -->
            <div v-if="isBattleLoading" class="flex flex-col items-center py-12">
              <UIcon name="i-tabler-loader-2" class="animate-spin text-white text-4xl" />
              <span class="mt-4 text-white text-lg font-medium">
                Mise à jour de la playlist en cours...
              </span>
            </div>

            <!-- Playlist sélectionnée -->
            <div v-else-if="currentPlayListInfo" class="w-full max-w-6xl mx-auto space-y-8">
              <!-- Battle en cours -->
              <div>
                <h2 class="text-white text-xl font-semibold text-center mb-4">🎶 Duel en cours</h2>

                <div v-if="currentTracksVersus">
                  <TracksVersusSectionStreamer
                    :currentTracksVersus="currentTracksVersus"
                    @updateAll="handleUpdateAll"
                  />
                </div>
                <div v-else class="text-center text-white py-6 text-sm">
                  🎵 En attente de nouveaux morceaux pour lancer un battle...
                </div>
              </div>

              <!-- Nom de la playlist -->
              <div class="text-white text-2xl font-bold text-center">
                {{ currentPlayListInfo.playlistName }}
              </div>

              <!-- Liste des tracks -->
              <div v-if="playlistTracks.length > 0" class="divide-y divide-gray-700 rounded-md overflow-hidden">
                <PlaylistTrackRow
                  v-for="track in playlistTracks"
                  :key="track.trackId"
                  :track="track"
                />
              </div>
            </div>

            <!-- Aucune playlist sélectionnée -->
            <div v-else class="text-center text-white text-sm py-6">
              Aucune playlist sélectionnée
            </div>
          </section>

          <!-- Modaux & sliders -->
          <CreatePlaylistModal
            :is-open="isCreatePlaylistModalOpen"
            @proceed-result="proceedResult"
          />
          <SpecialSliderStreamer
            :isOpen="isSlideOverOpen"
            :playlists="streamerPlaylists || []"
            @update:isOpen="isSlideOverOpen = $event"
            @change-playlist="changePlaylist"
            @delete-playlist="deletePlaylist"
          />
        </div>
      </AuthenticatedSpotifyContainer>
    </AuthenticatedTwitchContainer>
  </UContainer>
</template>


<style></style>
