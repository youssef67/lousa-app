
export const useStreamerRepository = () => {
  const sessionStore = useSessionStore()
  const {
    getSpaceStreamerData,
    setAndGetPlaylistSelected,
    checkIfStreamer,
    deleteStreamerProfile,
  } = useStreamerApi()
  const logger = useSpecialLogger()

 
  const runGetSpaceStreamerData = async (twitchUserId: string | null, spaceStreamerId: string | null) => {
    try {
      const response = await getSpaceStreamerData(twitchUserId, spaceStreamerId)
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


  const runCheckIfStreamer = async () => {
    const response = await checkIfStreamer()
    return response
  }


  const runDeleteStreamerProfile = async () => {
    try {
      await deleteStreamerProfile()
    } catch (error) {
      logger.e('Error logging out', error)
    } finally {
      sessionStore.clearSession()
    }
  }

  return {
    runGetSpaceStreamerData,
    runSetAndGetPLaylistSelected,
    runCheckIfStreamer,
    runDeleteStreamerProfile
  }
}
