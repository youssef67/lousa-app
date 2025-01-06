import type {
  SignUpAnonymousResponse,
  LoginEmailResponse,
  SignUpEmailResponse,
  SignUpEmailConfirmResponse,
  LoginEmailConfirmResponse,
  LoginSpotifyResponse
} from '~/types/authentication.type'
import type { DeviceInput } from '~/types/session.type'

export const useAuthApi = () => {
  const { proceedApiError } = useSpecialError()
  const sessionStore = useSessionStore()
  const { fetch } = useSpecialApi()

  const signUpAnonymous = async (
    device: DeviceInput
  ): Promise<SignUpAnonymousResponse> => {
    try {
      const response = await fetch('/api/v1/auth/signup/anonymous', {
        method: FetchMethod.POST,
        body: { device },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as SignUpAnonymousResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const signUpEmail = async (
    device: DeviceInput,
    email: string,
    date: string
  ): Promise<SignUpEmailResponse> => {
    try {
      const response = await fetch('/api/v1/auth/signup/email', {
        method: FetchMethod.POST,
        body: { device, email, date },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as SignUpEmailResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const loginEmail = async (
    device: DeviceInput,
    email: string,
    date: string
  ): Promise<LoginEmailResponse> => {
    try {
      const response = await fetch('/api/v1/auth/login/email', {
        method: FetchMethod.POST,
        body: { device, email, date },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as LoginEmailResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const signUpEmailConfirm = async (
    authId: string,
    code: string,
    date: string
  ): Promise<SignUpEmailConfirmResponse> => {
    try {
      const response = await fetch('/api/v1/auth/signup/email/confirm', {
        method: FetchMethod.POST,
        body: { authId, code, date },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as SignUpEmailConfirmResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const loginEmailConfirm = async (authId: string, code: string, date: string): Promise<LoginEmailConfirmResponse> => {
    try {
      const response = await fetch('/api/v1/auth/login/email/confirm', {
        method: FetchMethod.POST,
        body: { authId, code, date },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as LoginEmailConfirmResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const loginSpotify = async (): Promise<LoginSpotifyResponse> => {
    try {
      const response = await fetch('/api/v1/auth/login/spotify/streamer', {
        method: FetchMethod.GET,
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as LoginSpotifyResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  return {
    signUpAnonymous,
    loginEmail,
    signUpEmail,
    signUpEmailConfirm,
    loginEmailConfirm,
    loginSpotify
  }
}
