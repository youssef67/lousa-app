import type {
  SearchTracksResponse,
  GetPlaylistTracksResponse,
  AddPendingTracksResponse,
  LikeTracksResponse
} from '~/types/playlist.type'
import type  { Track } from '~/types/playlist.type'

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
        cache: 'no-cache'
      })
      return response as SearchTracksResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const addTrack = async (
    versusId: string,
    spotifyTrackId: string | null
  ): Promise<void> => {
    try {
      await fetch('/api/v1/playlist/track/add', {
        method: FetchMethod.POST,
        body: { versusId, spotifyTrackId },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const addPendingTrack = async (
    playlistId: string,
    track: Track
  ): Promise<AddPendingTracksResponse> => {
    try {
      console.log('playlistId ', playlistId)
      const response = await fetch('/api/v1/playlist/pending/track/add', {
        method: FetchMethod.POST,
        body: { playlistId, track },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as AddPendingTracksResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const getPlaylistTracks = async (
    playlistId: string
  ): Promise<GetPlaylistTracksResponse> => {
    try {
      const url = `/api/v1/playlist?playlistId=${playlistId}`

      const response = await fetch(url, {
        method: FetchMethod.GET,
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as GetPlaylistTracksResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const likeTrack = async (
    tracksVersusId: string,
    track: number
  ): Promise<LikeTracksResponse> => {
    try {
      const response = await fetch('/api/v1/playlist/track/like', {
        method: FetchMethod.POST,
        body: { tracksVersusId, track },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as LikeTracksResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }
  

  return {
    searchTrack,
    addTrack,
    addPendingTrack,
    getPlaylistTracks,
    likeTrack
  }
}
