import type { GetPlaylistResponse } from "~/types/playlist.type"

export function usePlaylistUpdater() {
  const { showError } = useSpecialToast()
  const { runGetPlaylistForStreamer, runGetPlaylist } = usePlaylistRepository()

  const updatePlaylist = async (playlistId: string, isStreamer: boolean) => {
    await new Promise(resolve => setTimeout(resolve, 1500))

    try {
      let response: GetPlaylistResponse

      console.log('updater ', playlistId, isStreamer)
      if (isStreamer) {
        response = await runGetPlaylistForStreamer(playlistId)
      } else {
        response = await runGetPlaylist(playlistId)
      }
      // const response = await runGetPlaylistUpdatedForStreamer(playlistId)

      if (response) {
        return {
          success: true,
          tracks: response.playlistsTracks,
          versus: response.currentTracksVersus,
          currentUser: response.currentUser ?? null,
        }
      } else {
        showError("Erreur lors de la récupération de la playlist.")
        return { success: false }
      }
    } catch (error) {
      showError("Erreur interne pendant la mise à jour.")
      console.error(error)
      return { success: false }
    }
  }

  return { updatePlaylist }
}
