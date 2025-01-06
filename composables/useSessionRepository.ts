import type {
  EditUser,
} from '~/types/session.type'

export const useSessionRepository = () => {
  
  const sessionStore = useSessionStore()
  const { logout, getUserSession, editUserSession, deleteUser } = useSessionApi()
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
    console.log('call getUserSession - ', response)
    sessionStore.updateSessionUser(response.user)
    sessionStore.updateSessionSpotifyUser(response.spotifyUser)
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

  return {
    runLogout,
    refreshUserSession,
    runEditUser,
    runDeleteUser
  }
}
