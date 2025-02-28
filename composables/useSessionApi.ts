import type {
  LogoutResponse,
  GetUserSessionResponse,
  EditUserSessionResponse,
  DeleteUserResponse,
  EditUser,
  GetStreamersListResponse,
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

  

  return {
    logout,
    getUserSession,
    editUserSession,
    deleteUser,
    getStreamersList,
  }
}
