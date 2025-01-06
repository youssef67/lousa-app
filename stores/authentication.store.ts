import { AuthState } from '~/utils/auth/AuthResult'
import type { Auth } from '~~/types/session.type'

export const useAuthenticationStore = defineStore('authentication', () => {
  const { saveData, deleteData } = useSpecialStorage()
  const auth = ref<Auth | null>(null)
  const authState = ref<AuthState>(AuthState.NONE)
  const sessionStore = useSessionStore()
  const { pushMyAccount } = useSpecialRouter()

  const updateAuth = (authUpdated: Auth) => {
    saveData(StorageKey.AUTH, authUpdated)
    auth.value = authUpdated
  }

  const clearAuth = () => {
    authState.value = AuthState.NONE
    deleteData(StorageKey.AUTH)
    auth.value = null
  }

  const proceedLoginClick = () => {
    if (sessionStore.isSessionAuthenticated()) {
      pushMyAccount()
    } else {
      authState.value = AuthState.LOGIN
    }
  }

  const accountButtonLabel = () => {
    if (sessionStore.isSessionAuthenticated()) {
      return "Mon compte"
    } else {
      return "Se connecter"
    }
  }

  return {
    auth,
    authState,
    accountButtonLabel,
    proceedLoginClick,
    updateAuth,
    clearAuth
  }
})
