import type { Track } from '~/types/playlist.type'

export const usePlaylistRepository = () => {
  const {
    searchTrack,
    addTrack,
    addPendingTrack,
    getPlaylistTracks,
    likeTrack,
    specialLikeTrack,
    getTracksVersus
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

  const runAddTrack = async (versusId: string) => {
    try {
      const res = await addTrack(versusId)

      return res
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

  const runGetTracksVersus = async (playlistId: string) => {
    try {
      const response = await getTracksVersus(playlistId)
      return response
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  const runLikeTrack = async (tracksVersusId: string, trackId: string, targetTrack: number) => {
    try {
      const response = await likeTrack(tracksVersusId, trackId, targetTrack)
      return response
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  const runSpecialLikeTrack = async (tracksVersusId: string, targetTrack: number, amount: number) => {
    try {
      const response = await specialLikeTrack(tracksVersusId, targetTrack, amount)
      return response
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  const addTrackToTracksVersus = async (tracksVersusId: string, targetTrack: number, amount: number) => {
    try {
      const response = await specialLikeTrack(tracksVersusId, targetTrack, amount)
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
    runLikeTrack,
    runSpecialLikeTrack,
    runGetTracksVersus
  }
}
