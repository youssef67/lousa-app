import type {
  AddFavoritePlaylistResponse,
  DeleteFavoritePlaylistResponse,
  AddFavoriteStreamerResponse,
  DeleteFavoriteStreamerResponse,
  CompleteProfileResponse,
  CheckUserNameAvailabilityResponse,
  GetFavoritesResponse,
  GetStreamerProfileResponse,
  StatsResponse
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

  const completeProfile = async (
    userName: string
  ): Promise<CompleteProfileResponse> => {
    try {
      const response = await fetch('/api/v1/viewer/profile', {
        method: FetchMethod.POST,
        body: { userName },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as CompleteProfileResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const checkUserNameAvailability = async (
    userName: string
  ): Promise<CheckUserNameAvailabilityResponse> => {
    try {
      const url = `/api/v1/viewer/profile?userName=${userName}`

      const response = await fetch(url, {
        method: FetchMethod.GET,
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as CheckUserNameAvailabilityResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const getFavorites = async (): Promise<GetFavoritesResponse> => {
    try {
      const response = await fetch('/api/v1/viewer/favorites', {
        method: FetchMethod.GET,
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as GetFavoritesResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const getStreamerProfile = async (spaceStreamerId: string): Promise<GetStreamerProfileResponse> => {
    try {
      const url = `/api/v1/viewer/streamer?spaceStreamerId=${spaceStreamerId}`
      const response = await fetch(url, {
        method: FetchMethod.GET,
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as GetStreamerProfileResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const getStats = async (userId: string): Promise<StatsResponse> => {
    try {
      const url = `/api/v1/viewer/stats?userId=${userId}`

      const response = await fetch(url, {
        method: FetchMethod.GET,
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as StatsResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  return {
    addFavoritePlaylist,
    deleteFavoritePlaylist,
    addFavoriteStreamer,
    deleteFavoriteStreamer,
    completeProfile,
    checkUserNameAvailability,
    getFavorites,
    getStreamerProfile,
    getStats
  }
}
