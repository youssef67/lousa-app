export const useViewerRepository = () => {
  const {
    addFavoritePlaylist,
    deleteFavoritePlaylist,
    addFavoriteStreamer,
    deleteFavoriteStreamer,
    completeProfile,
    checkUserNameAvailability,
    getFavorites,
    getStreamerProfile,
    getStats
  } = useViewerApi()
  const logger = useSpecialLogger()

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

  const runGetStreamerProfile = async (spaceStreamerId: string) => {
    try {
      const response = await getStreamerProfile(spaceStreamerId)
      return response
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  const runGetStats = async (userId: string) => {
    try {
      const response = await getStats(userId)
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
    runCompleteProfile,
    runCheckUserNameAvailability,
    runGetFavorites,
    runGetStreamerProfile,
    runGetStats
  }
}
