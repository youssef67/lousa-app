import type {
  SearchTracksResponse,
  GetPlaylistTracksResponse,
  AddPendingTracksResponse,
  LikeTracksResponse,
  Track,
  SpecialLikeTracksResponse,
  GetTracksVersusResponse,
  GetPlaylistUpdatedResponse,
  GetPlaylistSelectedResponse,
  GetPlaylistUpdatedForStreamerResponse,
  SetGoldenLikeResponse
} from '~/types/playlist.type'

export const usePlaylistApi = () => {
  const { proceedApiError } = useSpecialError()
  const sessionStore = useSessionStore()
  const { fetch } = useSpecialApi()

  const searchTrack = async (
    playlistId: string,
    trackName: string
  ): Promise<SearchTracksResponse> => {
    try {
      const url = `/api/v1/playlist/track/search?playlistId=${playlistId}&trackName=${trackName}`

      const response = await fetch(url, {
        method: FetchMethod.GET,
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache',
      })
      return response as SearchTracksResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const getPlaylistUpdated = async (versusId: string): Promise<GetPlaylistUpdatedResponse> => {
    try {
      const url = `/api/v1/playlist/updated?tracksVersusId=${versusId}`

      const res = await fetch(url, {
        method: FetchMethod.GET,
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache',
      })

      return res as GetPlaylistUpdatedResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const addPendingTrack = async (
    playlistId: string,
    track: Track
  ): Promise<AddPendingTracksResponse> => {
    try {
      const response = await fetch('/api/v1/playlist/pending/track/add', {
        method: FetchMethod.POST,
        body: { playlistId, track },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache',
      })
      return response as AddPendingTracksResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const getPlaylistTracks = async (playlistId: string): Promise<GetPlaylistTracksResponse> => {
    try {
      const url = `/api/v1/playlist?playlistId=${playlistId}`

      const response = await fetch(url, {
        method: FetchMethod.GET,
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache',
      })
      return response as GetPlaylistTracksResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const getTracksVersus = async (playlistId: string): Promise<GetTracksVersusResponse> => {
    try {
      const url = `/api/v1/playlist/tracksVersus?playlistId=${playlistId}`

      const response = await fetch(url, {
        method: FetchMethod.GET,
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache',
      })
      return response as GetTracksVersusResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const likeTrack = async (
    tracksVersusId: string,
    trackId: string,
    targetTrack: number
  ): Promise<LikeTracksResponse> => {
    try {
      const response = await fetch('/api/v1/playlist/track/like', {
        method: FetchMethod.POST,
        body: { tracksVersusId, trackId, targetTrack },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache',
      })
      return response as LikeTracksResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const specialLikeTrack = async (
    tracksVersusId: string,
    targetTrack: number,
    amount: number
  ): Promise<SpecialLikeTracksResponse> => {
    try {
      const response = await fetch('/api/v1/playlist/track/special/like', {
        method: FetchMethod.POST,
        body: { tracksVersusId, targetTrack, amount },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache',
      })
      return response as SpecialLikeTracksResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const getPlaylistSelected = async (): Promise<GetPlaylistSelectedResponse> => {
    try {
      const response = await fetch('/api/v1/playlist/selected', {
        method: FetchMethod.GET,
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache',
      })
      return response as GetPlaylistSelectedResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const getPlaylistUpdatedForStreamer = async (playlistId: string): Promise<GetPlaylistUpdatedForStreamerResponse> => {
    try {
      const url = `/api/v1/playlist/updated/streamer?playlistId=${playlistId}`

      const response = await fetch(url, {
        method: FetchMethod.GET,
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache',
      })
      return response as GetPlaylistUpdatedForStreamerResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const setGoldenLike = async (
    tracksVersusId: string,
    trackId: string,
    targetTrack: number
  ): Promise<SetGoldenLikeResponse> => {
    try {
      const response = await fetch('/api/v1/playlist/golden-like', {
        method: FetchMethod.POST,
        body: { tracksVersusId, trackId, targetTrack },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache',
      })
      return response as SetGoldenLikeResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  return {
    searchTrack,
    getPlaylistUpdated,
    addPendingTrack,
    getPlaylistTracks,
    likeTrack,
    specialLikeTrack,
    getTracksVersus,
    getPlaylistSelected,
    getPlaylistUpdatedForStreamer,
    setGoldenLike
  }
}
