import type {
  LogoutResponse,
  GetUserSessionResponse,
  EditUserSessionResponse,
  DeleteUserResponse,
  EditUser,
  GetStreamersListResponse,
  GetCheckIfStreamerResponse,
  DeleteStreamerProfileResponse,
  SetAndGetPlaylistSelectedResponse,
  GetSpaceStreamerDataResponse
} from '~/types/session.type'

export const useSessionApi = () => {
  const { proceedApiError } = useSpecialError()
  const sessionStore = useSessionStore()
  const { fetch } = useSpecialApi()

  const logout = async (): Promise<LogoutResponse> => {
    try {
      const response = await fetch('/api/v1/session/logout', {
        method: FetchMethod.POST,
        body: {},
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as LogoutResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const getUserSession = async (): Promise<GetUserSessionResponse> => {
    try {
      const response = await fetch('/api/v1/session/user', {
        method: FetchMethod.GET,
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })

      return response as GetUserSessionResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const editUserSession = async (
    UserData: EditUser
  ): Promise<EditUserSessionResponse> => {
    try {
      const response = await fetch('/api/v1/session/user', {
        method: FetchMethod.PUT,
        body: { UserData },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as EditUserSessionResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const deleteUser = async (): Promise<DeleteUserResponse> => {
    try {
      const response = await fetch('/api/v1/session/user/delete', {
        method: FetchMethod.POST,
        body: {},
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as DeleteUserResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const getStreamersList = async (
    page: number
  ): Promise<GetStreamersListResponse> => {
    try {
      const url = `/api/v1/session/streamers?page=${page}`

      const response = await fetch(url, {
        method: FetchMethod.GET,
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })

      return response as GetStreamersListResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const checkIfStreamer = async (): Promise<GetCheckIfStreamerResponse> => {
    try {
      const response = await fetch(
        '/api/v1/session/validate/streamer/profile',
        {
          method: FetchMethod.GET,
          headers: sessionStore.defaultHeaders(),
          cache: 'no-cache'
        }
      )
      return response as GetCheckIfStreamerResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const deleteStreamerProfile =
    async (): Promise<DeleteStreamerProfileResponse> => {
      try {
        const response = await fetch(
          '/api/v1/session/streamer/profile/delete',
          {
            method: FetchMethod.POST,
            body: {},
            headers: sessionStore.defaultHeaders(),
            cache: 'no-cache'
          }
        )
        return response as DeleteStreamerProfileResponse
      } catch (error) {
        await proceedApiError(error)
      }
    }

  const setAndGetPlaylistSelected = async (
    playlistId: string
  ): Promise<SetAndGetPlaylistSelectedResponse> => {
    try {
      const response = await fetch('/api/v1/session/playlist/selected', {
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

  const getSpaceStreamerData = async (
    twitchUserId: string | null,
    spaceStreamerId: string | null
  ): Promise<GetSpaceStreamerDataResponse> => {
    try {
      // Création de l'objet en filtrant les valeurs null
      const body = Object.fromEntries(
        Object.entries({ twitchUserId, spaceStreamerId }).filter(
          ([_, v]) => v !== null
        )
      )

      const response = await fetch('/api/v1/session/streamer/space', {
        method: FetchMethod.POST,
        body: JSON.stringify(body), // Convertir en JSON
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })

      return response as GetSpaceStreamerDataResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  return {
    logout,
    getUserSession,
    editUserSession,
    deleteUser,
    getStreamersList,
    checkIfStreamer,
    deleteStreamerProfile,
    setAndGetPlaylistSelected,
    getSpaceStreamerData
  }
}
