import type {
  AddFavoritePlaylistResponse,
  DeleteFavoritePlaylistResponse,
  AddFavoriteStreamerResponse,
  DeleteFavoriteStreamerResponse,
  GetViewerDataResponse
} from '~/types/viewer.type'

export const useViewerApi = () => {
  const { proceedApiError } = useSpecialError()
  const sessionStore = useSessionStore()
  const { fetch } = useSpecialApi()

  const addFavoritePlaylist = async (
    playlistId: string
  ): Promise<AddFavoritePlaylistResponse> => {
    try {
      const response = await fetch('/api/v1/viewer/favorite/playlist/add', {
        method: FetchMethod.POST,
        body: { playlistId },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as AddFavoritePlaylistResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const deleteFavoritePlaylist = async (
    playlistId: string
  ): Promise<DeleteFavoritePlaylistResponse> => {
    try {
      const response = await fetch('/api/v1/viewer/favorite/playlist/delete', {
        method: FetchMethod.POST,
        body: { playlistId },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as DeleteFavoritePlaylistResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const addFavoriteStreamer = async (
    spaceStreamerId: string
  ): Promise<AddFavoriteStreamerResponse> => {
    try {
      const response = await fetch('/api/v1/viewer/favorite/streamer/add', {
        method: FetchMethod.POST,
        body: { spaceStreamerId },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as AddFavoriteStreamerResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const deleteFavoriteStreamer = async (
    spaceStreamerId: string
  ): Promise<DeleteFavoriteStreamerResponse> => {
    try {
      const response = await fetch('/api/v1/viewer/favorite/streamer/delete', {
        method: FetchMethod.POST,
        body: { spaceStreamerId },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as DeleteFavoritePlaylistResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const getViewerData =
    async (): Promise<GetViewerDataResponse> => {
      try {
        // Création de l'objet en filtrant les valeurs null
        const response = await fetch('/api/v1/viewer', {
          method: FetchMethod.GET,
          headers: sessionStore.defaultHeaders(),
          cache: 'no-cache'
        })

        return response as GetViewerDataResponse
      } catch (error) {
        await proceedApiError(error)
      }
    }

  return {
    addFavoritePlaylist,
    deleteFavoritePlaylist,
    addFavoriteStreamer,
    deleteFavoriteStreamer,
    getViewerData
  }
}
