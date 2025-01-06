import type { UserSession } from './session.type'

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
}

export interface LoginSpotifyResponse {
  urlAuthorize: string
}
