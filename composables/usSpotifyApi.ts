import type {
  CreatePlaylistResponse,
  GetAllPlaylistsResponse,
  DeletePlaylistResponse
} from '~/types/session.type.js'

export const useSpotifyApi = () => {
  const { proceedApiError } = useSpecialError()
  const sessionStore = useSessionStore()
  const { fetch } = useSpecialApi()

  const createPlaylist = async (
    playlistName: string
  ): Promise<CreatePlaylistResponse> => {
    try {
      const response = await fetch('/api/v1/spotify/playlist', {
        method: FetchMethod.POST,
        body: { playlistName },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as CreatePlaylistResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const getAllPlaylists = async (): Promise<GetAllPlaylistsResponse> => {
    try {
      const response = await fetch('/api/v1/spotify/playlists', {
        method: FetchMethod.GET,
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as GetAllPlaylistsResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const deletePlaylist = async (
    id: string
  ): Promise<DeletePlaylistResponse> => {
    try {
      const response = await fetch('/api/v1/spotify/playlist/delete', {
        method: FetchMethod.POST,
        body: { id },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as DeletePlaylistResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  return {
    createPlaylist,
    getAllPlaylists,
    deletePlaylist
  }
}
