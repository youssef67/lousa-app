import type { Track } from '~/types/playlist.type'

export const usePlaylistRepository = () => {
  const {
    searchTrack,
    addTrack,
    addPendingTrack,
    getPlaylistTracks,
    likeTrack
  } = usePlaylistApi()
  const logger = useSpecialLogger()

  const runSearchTrack = async (versusId: string, trackName: string) => {
    try {
      const response = await searchTrack(versusId, trackName)
      return response
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  const runAddTrack = async (versusId: string, spotifyTrackId: string | null) => {
    try {
      await addTrack(versusId, spotifyTrackId)
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  const runAddPendingTrack = async (playlistId: string, track: Track) => {
    try {
      const response = await addPendingTrack(playlistId, track)
      return response
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  const runGetPlaylistTracks = async (playlistId: string) => {
    try {
      const response = await getPlaylistTracks(playlistId)
      return response
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  const runLikeTrack = async (tracksVersusId: string, track: number) => {
    try {
      const response = await likeTrack(tracksVersusId, track)
      return response
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  return {
    runSearchTrack,
    runAddTrack,
    runGetPlaylistTracks,
    runAddPendingTrack,
    runLikeTrack
  }
}
