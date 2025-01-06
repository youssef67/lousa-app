<script lang="ts" setup>
import { AuthState } from '~/utils/auth/AuthResult'

const authenticationStore = useAuthenticationStore()

const links: any = [
  {
    label: 'Se connecter',
    color: 'secondary',
    click: () => {
      authenticationStore.authState = AuthState.LOGIN
    }
  }
]
</script>


<template>
  <ULandingHero
    title="Authentification requise"
    description="Vous devez être authentifié pour accéder à cette page"
    :links="links"
    :ui="{
      title: 'text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl',
      description: 'mt-6 text-base/7 text-gray-500 dark:text-gray-400 text-center'
    }"
  />
</template>