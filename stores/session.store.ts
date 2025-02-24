import {
  UserRole,
  type Session,
  type UserSession,
  type SpotifyUserSession,
  type TwitchUserSession,
  type AdminSession,
  type Playlist,
  type SpaceStreamerData,
} from '~~/types/session.type'

export const useSessionStore = defineStore('session', () => {
  const session = ref<Session | null>(null)
  const spaceStreamer = ref<SpaceStreamerData>()
  const playlistSelected = ref<Playlist | null>(null)
  const { newError } = useSpecialError()
  const { getData, saveData, deleteData } = useSpecialStorage()

  const restoreSession = () => {
    if (session.value) {
      // Session is already open
      return
    } else {
      session.value = getData(StorageKey.SESSION) as Session
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

  const updateSession = async (sessionUpdated: Session) => {
    saveData(StorageKey.SESSION, sessionUpdated)
    session.value = sessionUpdated
  }

  const updateSessionUser = async (userUpdated: UserSession) => {
    session.value.user = userUpdated
    await updateSession(session.value)
  }

  const updateSessionSpotifyUser = async (
    spotifyUserUpdated: SpotifyUserSession
  ) => {
    session.value.user.spotifyUser = spotifyUserUpdated
    await updateSession(session.value)
  }

  const updateSessionTwitchUser = async (
    twitchUserUpdated: TwitchUserSession
  ) => {
    session.value.user.twitchUser = twitchUserUpdated
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

  const isSpotifyUserAuthenticated = () => {
    return !!session.value?.user.spotifyUser
  }

  const isTwitchUserAuthenticated = () => {
    return !!session.value?.user.twitchUser
  }

  const isTwitchStreamerAuthenticated = () => {
    return !!session.value.user.twitchUser?.spaceStreamerId
  }

  const clearSession = () => {
    session.value = null
    deleteData(StorageKey.SESSION)
    deleteData(StorageKey.AUTH)
  }

  const addPlaylistsToList = (playlist: Playlist) => {
    if (playlist !== undefined) {
      spaceStreamer.value?.playlists.push(playlist)
    }
  }

  const deletePlaylistsToList = (playlistIdToDelete: string) => {

    const indexPlaylistToDelete = spaceStreamer.value?.playlists.findIndex(playlist => playlist.id === playlistIdToDelete)

    if (indexPlaylistToDelete === -1) return false
  
    spaceStreamer.value?.playlists.splice(indexPlaylistToDelete, 1)
    return false
  }

  const updateSpaceStreamerData = async (spaceStreamerData: SpaceStreamerData) => {
    if(!spaceStreamer.value) { 
      spaceStreamer.value = {} as SpaceStreamerData
    }

    spaceStreamer.value = spaceStreamerData
  }


  return {
    session,
    spaceStreamer,
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
    playlistSelected,
    updateSpaceStreamerData,
    deletePlaylistsToList,
    addPlaylistsToList
  }
})
