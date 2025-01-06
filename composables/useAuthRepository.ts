import type { Auth, Session } from '~~/types/session.type'

export const useAuthRepository = () => {
  const sessionStore = useSessionStore()
  const authenticationStore = useAuthenticationStore()

  const { newError } = useSpecialError()
  const { generateDevice } = useDeviceUtils()
  const {
    signUpAnonymous,
    loginEmail,
    signUpEmail,
    signUpEmailConfirm,
    loginEmailConfirm,
    loginSpotify
  } = useAuthApi()

  const runSignUpAnonymous = async () => {
    if (sessionStore.isSessionOpen()) {
      throw newError('ERROR_INVALID_DATA', 'AREP-1')
    } else {
      const device = generateDevice()
      const response = await signUpAnonymous(device)
      const session = response as Session
      sessionStore.updateSession(session)
    }
  }

  const runLoginEmail = async (email: string) => {
    const device = generateDevice()
    const response = await loginEmail(device, email, 'XXXX')
    const authId = response.authId
    const newAuth: Auth = {
      authId: authId,
      email: email
    }
    authenticationStore.updateAuth(newAuth)
  }

  const runSignUpEmail = async (email: string) => {
    const device = generateDevice()
    const response = await signUpEmail(device, email, 'XXXX')
    const authId = response.authId
    const newAuth: Auth = {
      authId: authId,
      email: email
    }
    authenticationStore.updateAuth(newAuth)
  }

  const runSignUpEmailConfirm = async (code: string) => {
    if (!authenticationStore.auth) {
      throw newError('ERROR_INVALID_DATA', 'AREP-2')
    }
    const response = await signUpEmailConfirm(
      authenticationStore.auth.authId,
      code,
      'XXXX'
    )

    sessionStore.updateSessionUser(response.user)
  }

  const runLoginEmailConfirm = async (code: string) => {
    if (!authenticationStore.auth) {
      throw newError('ERROR_INVALID_DATA', 'AREP-3')
    }
    const response = await loginEmailConfirm(
      authenticationStore.auth.authId,
      code,
      'XXXX'
    )

    sessionStore.updateSession(response)
  }

  const runAuthenticationSpotify = async (authUrl: string) => {
    try {
      window.location.href = authUrl
    } catch (error) {
      throw newError('ERROR_INVALID_DATA', 'AREP-6')
    }
  }

  const runLoginSpotifyStreamer = async () => {
    try {
      const response = await loginSpotify()

      if(!response.urlAuthorize) {
        throw newError('ERROR_INVALID_DATA', 'AREP-4')
      }

      await runAuthenticationSpotify(response.urlAuthorize)
      return true
    } catch (error) {
      throw newError('ERROR_INVALID_DATA', 'AREP-5')
    }
  }

  return {
    runSignUpAnonymous,
    runLoginEmail,
    runSignUpEmail,
    runSignUpEmailConfirm,
    runLoginEmailConfirm,
    runLoginSpotifyStreamer
  }
}
