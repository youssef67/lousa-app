export interface LogoutResponse { 
  result: boolean
}

export interface DeleteUserResponse { 
  result: boolean
}

export interface GetUserSessionResponse {
  user: UserSession
  spotifyUser?: SpotifyUserSession
}

export interface EditUserSessionResponse {
  user: UserSession
}

export interface Session {
  at: string
  di: string
  rt: string
  user: UserSession
  spotifyUser?: SpotifyUserSession
}

export interface UserSession {
  id: string
  firstName?: string
  lastName?: string
  email: string
  dateOfBirth?: string
  role: UserRole
}

export interface SpotifyUserSession {
  spotifyId: string
  displayName: string
  email?: string
  accessToken: string
  refreshToken: string
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
}

export interface CreatePlaylistResponse {
  playlist: Playlist
}

export interface GetAllPlaylistResponse {
  playlists: Playlist[]
}

