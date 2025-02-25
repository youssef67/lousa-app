export interface LogoutResponse {
  result: boolean
}

export interface DeleteUserResponse {
  result: boolean
}



export interface GetUserSessionResponse {
  user: UserSession
  spotifyUser?: SpotifyUserSession
  twitchUser?: TwitchUserSession
}

export interface EditUserSessionResponse {
  user: UserSession
}

export interface SetAndGetPlaylistSelectedResponse {
  playlist: Playlist | null
}

export interface Session {
  at: string
  di: string
  rt: string
  user: UserSession
  admin?: AdminSession
}

export interface SpaceStreamerData {
  spaceStreamer: SpaceStreamerMainInfo
  playlists: Playlist[]
}

export interface UserSession {
  id: string
  firstName?: string
  lastName?: string
  email: string
  dateOfBirth?: string
  role: UserRole
  twitchUser?: TwitchUserSession
  spotifyUser?: SpotifyUserSession
}

export interface SpotifyLoginResponse {
  spotifyUser: string
}

export interface SpotifyUserSession {
  spotifyId: string
  displayName: string
  email?: string
}

export interface TwitchLoginStreamResponse {
  twitchUser: string
}

export interface TwitchUserSession {
  id: string
  twitchUserLogin: string
  email: string
  spaceStreamerId: string
}

export interface AdminSession {
  dateStreamsLastUpdate: string
}

export enum UserRole {
  ANONYMOUS = 'anonymous',
  USER = 'user',
  ADMIN = 'admin'
}

export interface DeviceInput {
  locale: string
  language: string
  timezone: string
  model: string
  os: string
  osVersion: string
  appVersion: string
  pushToken?: string
}

export interface EditUser {
  firstName?: string
  lastName?: string
  dateOfBirth?: string
}

export interface Auth {
  email: string
  authId: string
}

export interface LogoutResponse {
  result: boolean
}

export interface Playlist {
  id: string
  playlistName: string
  isFavorite: boolean
}

export interface CreatePlaylistResponse {
  playlist: Playlist
}

export interface DeletePlaylistResponse {
  result: boolean
}

export interface GetStreamersListResponse {
  data: {
    data: Streamer[]
    meta: {
      currentPage: number
      firstPage: number
      firstPageUrl: string
      lastPage: number
      lastPageUrl: string
      nextPageUrl: string
      perPage: number
      previousPageUrl: string
      total: number
    }
  }
  streamersList: Streamer[]
}

export interface Streamer {
  id: string
  spaceName: string
  twitchUserId: string
  twitchUserLogin: string
  spaceStreamerImg: string
}

export interface GetStreamerResponse {
  result: boolean
}

export interface SpaceStreamerMainInfo {
  id: string
  spaceName : string
  spaceStreamerImg: string
  twitchUserId: string
  twitchUserLogin: string
  isFavoriteSpaceStreamer: boolean
}

export interface GetSpaceStreamerDataResponse {
  spaceStreamer: SpaceStreamerMainInfo
  playlists: Playlist[]
}


