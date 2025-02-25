import type {
  AddFavoritePlaylistResponse,
  DeleteFavoritePlaylistResponse,
  AddFavoriteStreamerResponse,
  DeleteFavoriteStreamerResponse,
  GetViewerDataResponse,
  SetAndGetPlaylistSelectedResponse,
  SearchTracksResponse,
  Track,
  getPlaylistTracksResponse,
  addTracksResponse
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

  const getViewerData = async (): Promise<GetViewerDataResponse> => {
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

  const setAndGetPlaylistSelected = async (
    playlistId: string
  ): Promise<SetAndGetPlaylistSelectedResponse> => {
    try {
      const response = await fetch('/api/v1/viewer/playlist/selected', {
        method: FetchMethod.POST,
        body: { playlistId },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as SetAndGetPlaylistSelectedResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const searchTrack = async (
    playlistId: string,
    trackName: string
  ): Promise<SearchTracksResponse> => {
    try {
      const url = `/api/v1/viewer/track/search?playlistId=${playlistId}&trackName=${trackName}`

      const response = await fetch(url, {
        method: FetchMethod.GET,
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as SearchTracksResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const addTrack = async (
    playlistId: string,
    track: Track
  ): Promise<addTracksResponse> => {
    try {
      const response = await fetch('/api/v1/viewer/track/add', {
        method: FetchMethod.POST,
        body: { playlistId, track },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as addTracksResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const getPlaylistTracks = async (
    playlistId: string,
  ): Promise<getPlaylistTracksResponse> => {
    try {
      const url = `/api/v1/viewer/playlist?playlistId=${playlistId}`

      const response = await fetch(url, {
        method: FetchMethod.GET,
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as getPlaylistTracksResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  return {
    addFavoritePlaylist,
    deleteFavoritePlaylist,
    addFavoriteStreamer,
    deleteFavoriteStreamer,
    getViewerData,
    setAndGetPlaylistSelected,
    searchTrack,
    addTrack,
    getPlaylistTracks
  }
}
