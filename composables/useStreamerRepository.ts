export const useStreamerRepository = () => {
  const sessionStore = useSessionStore()
  const {
    setAndGetPlaylistSelected,
    checkIfStreamer,
    deleteStreamerProfile,
    getStreamerProfile,
    createPlaylist,
    deletePlaylist,
    addStreamer,
    updateStreamersList,
    getSpaceStreamerInfo
  } = useStreamerApi()
  const logger = useSpecialLogger()
  const { newError } = useSpecialError()

  const runGetStreamerProfile = async () => {
    try {
      const response = await getStreamerProfile()

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

  const runCreatePlaylist = async (playlistName: string, onlyFollowers: boolean, maxRankedTracks: number) => {
    try {
      const response = await createPlaylist(playlistName, onlyFollowers, maxRankedTracks)
      return response
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  const runDeletePlaylist = async (playlistId: string) => {
    try {
      const response = await deletePlaylist(playlistId)
      return response
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  const runAddStreamer = async (nameStreamer: string) => {
    const response = await addStreamer(nameStreamer)

    try {
      if (response.result) {
        return true
      } else {
        return false
      }
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  const runUpdateStreamersList = async () => {
    const response = await updateStreamersList()

    try {
      if (response.dateLastUpdate) {
        const date = response.dateLastUpdate

        const formattedDate = new Date(date).toLocaleString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })

        await sessionStore.updateSessionAdmin({
          dateStreamsLastUpdate: formattedDate
        })

        return true
      } else {
        throw newError('ERROR_INVALID_DATA', 'TRGS-1')
      }
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  const runGetSpaceStreamerInfo = async () => {
    try {
      const res = await getSpaceStreamerInfo()

      return res
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  return {
    runSetAndGetPLaylistSelected,
    runCheckIfStreamer,
    runDeleteStreamerProfile,
    runGetStreamerProfile,
    runCreatePlaylist,
    runDeletePlaylist,
    runAddStreamer,
    runUpdateStreamersList,
    runGetSpaceStreamerInfo
  }
}
