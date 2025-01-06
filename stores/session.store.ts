import { UserRole, type Session, type UserSession, type SpotifyUserSession, type Playlist } from '~~/types/session.type'

export const useSessionStore = defineStore('session', () => {
  const session = ref<Session | null>(null)
  const { newError } = useSpecialError()
  const { getData, saveData, deleteData } = useSpecialStorage()

  const restoreSession = () => {
    if (session.value) {
      // Session is already open
      return 
    }

    const sessionFromStorage = getData(StorageKey.SESSION) as Session
    if (!sessionFromStorage) {
      throw newError('ERROR_INVALID_DATA', 'SSTO-2')
    } else {
      session.value = sessionFromStorage
    }
  }

  const defaultHeaders = (data: { multipart: boolean } = { multipart: false }): any => {
    const lang = 'fr'
    const headers = {
      'accept-language': lang
    }
    if (session.value) {
      headers['x-d-a'] = session.value.at
      headers['x-d-i'] = session.value.di
    }
    if (data.multipart) {
      headers['content-type'] = 'multipart/form-data'
    }
    return headers
  }

  const updateSession = async (sessionUpdated: Session) => {
    saveData(StorageKey.SESSION, sessionUpdated)
    session.value = sessionUpdated
  }

  const updateSessionUser = async (userUpdated: UserSession) => {
    session.value.user = userUpdated
    await updateSession(session.value)
  }

  const updateSessionSpotifyUser = async (spotifyUserUpdated: SpotifyUserSession) => {
    session.value.spotifyUser = spotifyUserUpdated
    await updateSession(session.value)
  }

  const isSessionOpen = () => {
    return !!session.value || !!(getData(StorageKey.SESSION) as Session)
  }

  const isSessionAuthenticated = () => {
    return !!session.value && session.value.user.role !== UserRole.ANONYMOUS
  }

  const isAdmin = () => {
    return !!session.value && session.value.user.role === UserRole.ADMIN
  }

  const isSpotifyUserAuthenticated = () => { 
    return !!session.value?.spotifyUser
  }

  const clearSession = () => {
    session.value = null
    deleteData(StorageKey.SESSION)
    deleteData(StorageKey.AUTH)
  }

  return {
    session,
    restoreSession,
    defaultHeaders,
    isSessionOpen,
    updateSession,
    isSessionAuthenticated,
    updateSessionUser,
    clearSession,
    updateSessionSpotifyUser,
    isSpotifyUserAuthenticated,
    isAdmin
  }
})
