import { type SpotifyUserSession } from './spotify.type.js'
import { type TwitchUserSession } from './twitch.type.js'
import { type SpaceStreamerProfile } from './streamer.type.js'

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

export interface Session {
  at: string
  di: string
  rt: string
  user: UserSession
  admin?: AdminSession
}

export interface UserSession {
  id: string
  userName?: string
  firstName?: string
  lastName?: string
  email: string
  role: UserRole
  amountVirtualCurrency: number
  victoryPoints: number
  twitchUser?: TwitchUserSession
  spotifyUser?: SpotifyUserSession
}

export interface TwitchCallBackTransmit {
  id: string
  displayName: string
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

export interface GetStreamersListResponse {
  data: {
    data: SpaceStreamerProfile[]
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
  streamersList: SpaceStreamerProfile[]
}