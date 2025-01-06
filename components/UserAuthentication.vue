<script setup lang="ts">
import { AuthState, AuthType, ConfirmResult, LoginResult, SignUpResult } from '~/utils/auth/AuthResult'

const toast = useSpecialToast()

const authenticationStore = useAuthenticationStore()
const { pushDashboard } = useSpecialRouter()


const proceedResultLogin = (result: LoginResult) => {
  switch (result) {
    case LoginResult.GO_TO_SIGN_UP: {
      authenticationStore.authState = AuthState.SIGNUP
      break
    }
    case LoginResult.GO_TO_CONFIRM: {
      authenticationStore.authState = AuthState.LOGIN_CONFIRM
      break
    }
    case LoginResult.CANCELLED: {
      authenticationStore.authState = AuthState.NONE
      break
    }
  }
}

const proceedResultLoginConfirm = (result: ConfirmResult) => {
  switch (result) {
    case ConfirmResult.GO_TO_RESEND: {
      authenticationStore.authState = AuthState.LOGIN
      break
    }
    case ConfirmResult.GO_TO_SUCCESS: {
      toast.showSuccess('Vous êtes connecté avec succès')
      authenticationStore.authState = AuthState.NONE
      pushDashboard()
      break
    }
    case ConfirmResult.CANCELLED: {
      authenticationStore.authState = AuthState.NONE
      break
    }
  }
}

const proceedResultSignUp = (result: SignUpResult) => {
  switch(result) {
    case SignUpResult.GO_TO_LOGIN: {
      authenticationStore.authState = AuthState.LOGIN
      break
    }
    case SignUpResult.GO_TO_CONFIRM: {
      authenticationStore.authState = AuthState.SIGNUP_CONFIRM
      break
    }
    case SignUpResult.CANCELLED: {
      authenticationStore.authState = AuthState.NONE
      break
    }
  } 
}

const proceedResultSignUpConfirm = (result: ConfirmResult) => {
  switch (result) {
    case ConfirmResult.GO_TO_RESEND: {
      authenticationStore.authState = AuthState.SIGNUP
      break
    }
    case ConfirmResult.GO_TO_SUCCESS: {
      toast.showSuccess('Connecté avec succès')
      authenticationStore.authState = AuthState.NONE
      break
    }
    case ConfirmResult.CANCELLED: {
      authenticationStore.authState = AuthState.NONE
      break
    }
  }
}
</script>

<template>
  <LoginModal
    :is-open="authenticationStore.authState == AuthState.LOGIN"
    @proceed-result="proceedResultLogin"
  />
  <SignUpModal
    :is-open="authenticationStore.authState == AuthState.SIGNUP"
    @proceed-result="proceedResultSignUp"
  />
  <AuthEmailConfirmCode
    :is-open="authenticationStore.authState == AuthState.LOGIN_CONFIRM"
    :auth-type="AuthType.EMAIL_LOGIN"
    @proceed-result="proceedResultLoginConfirm"
  />

  <AuthEmailConfirmCode
    :is-open="authenticationStore.authState == AuthState.SIGNUP_CONFIRM"
    :auth-type="AuthType.EMAIL_SIGNUP"
    @proceed-result="proceedResultSignUpConfirm"
  />
</template>



<style>

</style>