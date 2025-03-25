import type { PlaylistTrack, Track, VersusTrack } from '~/types/playlist.type'

export const usePlaylistRepository = () => {
  const {
    searchTrack,
    addTrack,
    addPendingTrack,
    getPlaylistTracks,
    refreshVersus
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

  const runAddTrack = async (versusId: string, winnerTrack: { trackId: string, score: number, userId: string, spotifyTrackId: string}) => {
    try {
      await addTrack(versusId, winnerTrack)
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

  const runRefreshVersus = async (playlistId: string) => {
    try {
      const response = await refreshVersus(playlistId)
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
    runRefreshVersus
  }
}
