import type { EditUser } from '~/types/session.type'

export const useSessionRepository = () => {
  const sessionStore = useSessionStore()
  const {
    logout,
    getUserSession,
    editUserSession,
    deleteUser,
    getStreamersList
  } = useSessionApi()
  const logger = useSpecialLogger()
  // const { getData, saveData, deleteData } = useSpecialStorage()

  const runLogout = async () => {
    try {
      await logout()
    } catch (error) {
      logger.e('Error logging out', error)
    } finally {
      sessionStore.clearSession()
    }
  }

  const runEditUser = async (data: EditUser) => {
    const response = await editUserSession(data)
    sessionStore.updateSessionUser(response.user)
  }

  const refreshUserSession = async () => {
    const response = await getUserSession()
    sessionStore.updateSessionUser(response.user)
  }

  const runDeleteUser = async () => {
    try {
      await deleteUser()
    } catch (error) {
      logger.e('Error logging out', error)
    } finally {
      sessionStore.clearSession()
    }
  }

  const runGetStreamersList = async (page: number) => {
    try {
      const response = await getStreamersList(page)

      return response.data
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  return {
    runLogout,
    refreshUserSession,
    runEditUser,
    runDeleteUser,
    runGetStreamersList
  }
}
