import type { AddTrackResponse, LikeTrackResponse, UpdateTracksVersusResponse } from "~/types/playlist.type"

// composables/usePlaylistTransmit.ts
export function usePlaylistTransmit() {
  const { $transmit } = useNuxtApp()
  const { showSuccess, showError } = useSpecialToast()

  const subscribeToPlaylist = async (
    playlistId: string,
    onAddTrack: (data: AddTrackResponse) => void,
    onLikeUpdate: (data: LikeTrackResponse) => void,
    onVersusUpdate: (data: UpdateTracksVersusResponse) => void
  ) => {
    const playlistUpdated = $transmit.subscription(`playlist/updated/${playlistId}`)
    const likeUpdated = $transmit.subscription(`playlist/like/${playlistId}`)
    const tracksVersusUpdated = $transmit.subscription(`playlist/tracksVersus/${playlistId}`)

    await playlistUpdated.create()
    await likeUpdated.create()
    await tracksVersusUpdated.create()

    playlistUpdated.onMessage(onAddTrack)
    likeUpdated.onMessage(onLikeUpdate)
    tracksVersusUpdated.onMessage(onVersusUpdate)

    return {
      playlistUpdated,
      likeUpdated,
      tracksVersusUpdated,
    }
  }

  return { subscribeToPlaylist }
}
