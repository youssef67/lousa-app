import type { Track } from '~/types/viewer.type'

export const useViewerRepository = () => {
  const {
    addFavoritePlaylist,
    deleteFavoritePlaylist,
    addFavoriteStreamer,
    deleteFavoriteStreamer,
    setAndGetPlaylistSelected,
    searchTrack,
    addTrack,
    getPlaylistTracks,
    completeProfile,
    checkUserNameAvailability,
    getFavorites
  } = useViewerApi()
  const logger = useSpecialLogger()
  // const { getData, saveData, deleteData } = useSpecialStorage()

  const runAddFavoritePlaylist = async (playlistId: string) => {
    try {
      const response = await addFavoritePlaylist(playlistId)
      return response
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  const runDeleteFavoritePlaylist = async (playlistId: string) => {
    try {
      const response = await deleteFavoritePlaylist(playlistId)
      return response
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  const runAddFavoriteStreamer = async (spaceStreamerId: string) => {
    try {
      const response = await addFavoriteStreamer(spaceStreamerId)
      return response
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  const runDeleteFavoriteStreamer = async (spaceStreamerId: string) => {
    try {
      const response = await deleteFavoriteStreamer(spaceStreamerId)
      return response
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  const runSetAndGetPLaylistSelected = async (playlistId: string) => {
    try {
      const response = await setAndGetPlaylistSelected(playlistId)
      return response
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  const runSearchTrack = async (playlistId: string, trackName: string) => {
    try {
      const response = await searchTrack(playlistId, trackName)
      return response
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  const runAddTrack = async (playlistId: string, track: Track) => {
    try {
      const response = await addTrack(playlistId, track)
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

  const runCompleteProfile = async (userName: string) => {
    try {
      const response = await completeProfile(userName)
      return response
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  const runCheckUserNameAvailability = async (userName: string) => {
    try {
      const response = await checkUserNameAvailability(userName)
      return response
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  const runGetFavorites = async () => {
    try {
      const response = await getFavorites()
      return response
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  return {
    runAddFavoritePlaylist,
    runDeleteFavoritePlaylist,
    runAddFavoriteStreamer,
    runDeleteFavoriteStreamer,
    runSetAndGetPLaylistSelected,
    runSearchTrack,
    runAddTrack,
    runGetPlaylistTracks,
    runCompleteProfile,
    runCheckUserNameAvailability,
    runGetFavorites
  }
}
