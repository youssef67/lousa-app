import type {
  SetAndGetPlaylistSelectedResponse,
  GetCheckIfStreamerResponse,
  DeleteStreamerProfileResponse,
  GetStreamerProfileResponse,
  AddStreamerResponse,
  UpdateStreamersListResponse
} from '~/types/streamer.type'
import type {
  CreatePlaylistResponse,
  DeletePlaylistResponse
} from '~/types/playlist.type.js'

export const useStreamerApi = () => {
  const { proceedApiError } = useSpecialError()
  const sessionStore = useSessionStore()
  const { fetch } = useSpecialApi()

  const getStreamerProfile = async (): Promise<GetStreamerProfileResponse> => {
    try {
      const response = await fetch('/api/v1/streamer', {
        method: FetchMethod.GET,
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })

      return response as GetStreamerProfileResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const setAndGetPlaylistSelected = async (
    playlistId: string
  ): Promise<SetAndGetPlaylistSelectedResponse> => {
    try {
      const response = await fetch('/api/v1/streamer/playlist/selected', {
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

  const checkIfStreamer = async (): Promise<GetCheckIfStreamerResponse> => {
    try {
      const response = await fetch('/api/v1/streamer/profile/validation', {
        method: FetchMethod.POST,
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as GetCheckIfStreamerResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const deleteStreamerProfile =
    async (): Promise<DeleteStreamerProfileResponse> => {
      try {
        const response = await fetch('/api/v1/streamer/profile/delete', {
          method: FetchMethod.POST,
          body: {},
          headers: sessionStore.defaultHeaders(),
          cache: 'no-cache'
        })
        return response as DeleteStreamerProfileResponse
      } catch (error) {
        await proceedApiError(error)
      }
    }

  const createPlaylist = async (
    playlistName: string
  ): Promise<CreatePlaylistResponse> => {
    try {
      const response = await fetch('/api/v1/streamer/playlist', {
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

  const deletePlaylist = async (
    id: string
  ): Promise<DeletePlaylistResponse> => {
    try {
      const response = await fetch('/api/v1/streamer/playlist', {
        method: FetchMethod.DELETE,
        body: { id },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as DeletePlaylistResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const addStreamer = async (
    nameStreamer: string
  ): Promise<AddStreamerResponse> => {
    try {
      const response = await fetch('/api/v1/streamer/add', {
        method: FetchMethod.POST,
        body: { nameStreamer },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as AddStreamerResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const updateStreamersList =
    async (): Promise<UpdateStreamersListResponse> => {
      try {
        const response = await fetch('/api/v1/streamers/list/update', {
          method: FetchMethod.POST,
          headers: sessionStore.defaultHeaders(),
          cache: 'no-cache'
        })
        return response as UpdateStreamersListResponse
      } catch (error) {
        await proceedApiError(error)
      }
    }

  return {
    setAndGetPlaylistSelected,
    checkIfStreamer,
    deleteStreamerProfile,
    getStreamerProfile,
    createPlaylist,
    deletePlaylist,
    addStreamer,
    updateStreamersList
  }
}
