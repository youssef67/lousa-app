import type {
  AddFavoritePlaylistResponse,
  DeleteFavoritePlaylistResponse
} from '~/types/viewer.type'

export const useViewerApi = () => {
  const { proceedApiError } = useSpecialError()
  const sessionStore = useSessionStore()
  const { fetch } = useSpecialApi()

  const addFavoritePlaylist = async (playlistId: string): Promise<AddFavoritePlaylistResponse> => {
    try {
      const response = await fetch('/api/v1/viewer/favorite/playlist/add', {
        method: FetchMethod.POST,
        body: {playlistId},
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as AddFavoritePlaylistResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const deleteFavoritePlaylist = async (playlistId: string): Promise<DeleteFavoritePlaylistResponse> => {
    try {
      const response = await fetch('/api/v1/viewer/favorite/playlist/delete', {
        method: FetchMethod.POST,
        body: {playlistId},
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as DeleteFavoritePlaylistResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  

  return {
    addFavoritePlaylist,
    deleteFavoritePlaylist
  }
}
