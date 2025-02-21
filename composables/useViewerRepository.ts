import type { EditUser } from '~/types/session.type'

export const useViewerRepository = () => {
  const sessionStore = useSessionStore()
  const {
    addFavoritePlaylist,
    deleteFavoritePlaylist,
    addFavoriteStreamer,
    deleteFavoriteStreamer
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

  return {
    runAddFavoritePlaylist,
    runDeleteFavoritePlaylist,
    runAddFavoriteStreamer,
    runDeleteFavoriteStreamer
  }
}
