import type { Track } from '~/types/playlist.type'

export const usePlaylistRepository = () => {
  const {
    searchTrack,
    getPlaylistUpdated,
    addPendingTrack,
    getPlaylistTracks,
    likeTrack,
    specialLikeTrack,
    getTracksVersus,
    getPlaylistSelected,
    getPlaylistUpdatedForStreamer,
    setGoldenLike
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

  const runGetPlaylistUpdated = async (versusId: string) => {
    try {
      const res = await getPlaylistUpdated(versusId)

      return res
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  const runAddPendingTrack = async (playlistId: string, track: Track) => {
    try {
      const response = await addPendingTrack(playlistId, track)

      console.log('response', response)
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

  const runGetPlaylistSelected = async () => {
    try {
      const res = await getPlaylistSelected()

      return res
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  const runGetPlaylistUpdatedForStreamer = async (playlistId: string) => {
    try {
      const res = await getPlaylistUpdatedForStreamer(playlistId)

      return res
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  const runSetGoldenLike = async (tracksVersusId: string, trackId: string, targetTrack: number) => {
    try {
      const res = await setGoldenLike(tracksVersusId, trackId, targetTrack)

      return res
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  return {
    runSearchTrack,
    runGetPlaylistUpdated,
    runGetPlaylistTracks,
    runAddPendingTrack,
    runLikeTrack,
    runSpecialLikeTrack,
    runGetTracksVersus,
    runGetPlaylistSelected,
    runGetPlaylistUpdatedForStreamer,
    runSetGoldenLike
  }
}
