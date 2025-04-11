import {
  UserRole,
  type Session,
  type UserSession,
  type AdminSession
} from '~~/types/session.type'
import type { SpotifyUserSession } from '~/types/spotify.type'
import type { TwitchUserSession } from '~/types/twitch.type'

export const useSessionStore = defineStore('session', () => {
  const session = ref<Session | null>(null)
  const { newError } = useSpecialError()
  const { getData, saveData, deleteData } = useSpecialStorage()

  // SESSION
  const restoreSession = () => {
    if (session.value) {
      return
    }

    const sessionFromStorage = getData(StorageKey.SESSION) as Session
    if (!sessionFromStorage) {
      throw newError('ERROR_INVALID_DATA', 'SSTO-2')
    } else {
      session.value = sessionFromStorage
    }
  }

  const defaultHeaders = (
    data: { multipart: boolean } = { multipart: false }
  ): any => {
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

  // SESSION
  const updateSession = async (sessionUpdated: Session) => {
    saveData(StorageKey.SESSION, sessionUpdated)
    session.value = sessionUpdated
  }

  const updateSessionUser = async (userUpdated: UserSession) => {
    session.value.user = userUpdated
    await updateSession(session.value)
  }

  const updateSessionVirtualCurrency = async (amount: number) => {
    session.value.user.amountVirtualCurrency = amount
    await updateSession(session.value)

  }

  const updateSessionAdmin = async (AdminUpdated: AdminSession) => {
    session.value.admin = AdminUpdated
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

  const clearSession = () => {
    session.value = null
    deleteData(StorageKey.SESSION)
    deleteData(StorageKey.AUTH)
  }

  // TWITCH
  const updateSessionTwitchUser = async (
    twitchUserUpdated: TwitchUserSession
  ) => {
    session.value.user.twitchUser = twitchUserUpdated
    await updateSession(session.value)
  }

  const isTwitchUserAuthenticated = () => {
    return !!session.value?.user.twitchUser
  }

  const isTwitchStreamerAuthenticated = () => {
    return !!session.value.user.twitchUser?.spaceStreamerId
  }

  // SPOTIFY
  const updateSessionSpotifyUser = async (
    spotifyUserUpdated: SpotifyUserSession
  ) => {
    session.value.user.spotifyUser = spotifyUserUpdated
    await updateSession(session.value)
  }

  const isSpotifyUserAuthenticated = () => {
    return !!session.value?.user.spotifyUser
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
    isTwitchUserAuthenticated,
    updateSessionTwitchUser,
    updateSessionAdmin,
    isAdmin,
    isTwitchStreamerAuthenticated,
    updateSessionVirtualCurrency
  }
})
