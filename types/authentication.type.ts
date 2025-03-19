import type { UserSession } from './session.type'
import type { TwitchUserSession } from './twitch.type'

export interface SignUpAnonymousResponse {
  at: string
  di: string
  rt: string
  user: UserSession
}

export interface SignUpEmailResponse {
  authId: string
}

export interface SignUpEmailConfirmResponse {
  user: UserSession
}

export interface LoginEmailResponse {
  authId: string
}

export interface LoginEmailConfirmResponse {
  at: string
  di: string
  rt: string
  user: UserSession
  twitchUser?: TwitchUserSession
}

export interface LoginSpotifyResponse {
  urlAuthorize: string
}

export interface LoginTwitchResponse {
  url: string
}
