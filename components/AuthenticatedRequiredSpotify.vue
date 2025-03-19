<script lang="ts" setup>
import { Subscription, Transmit } from '@adonisjs/transmit-client'

import {
  type SpotifyLoginResponse,
  type SpotifyUserSession
} from '~~/types/spotify.type'

const { showSuccess, showError } = useSpecialToast()
const config = useRuntimeConfig()
const sessionStore = useSessionStore()
const { handleError } = useSpecialError()
const { runLoginSpotifyStreamer } = useAuthRepository()
const { pushMyAccount } = useSpecialRouter()

async function onLoginClick() {

  const transmit = new Transmit({
    baseUrl: `${config.public.siteUrl}/api/v1`
  })

  const subscription = transmit.subscription(
    `authentication/spotify/${sessionStore.session.user.id}`
  )

  await subscription.create()

  try {
    const newWindow = await runLoginSpotifyStreamer()

    subscription.onMessage(async (data: SpotifyLoginResponse) => {
      const jsonData = JSON.parse(data.spotifyUser) as SpotifyUserSession

      await sessionStore.updateSessionSpotifyUser(jsonData)
      showSuccess('Vous êtes maintenant connecté à Spotify')

      newWindow?.close()
      await closeEventStream(subscription)
    })
  } catch (error) {
    handleError(error)
  }
}

async function closeEventStream(subscription: Subscription) {
  await subscription.delete()
}

const links: any = [
  {
    label: 'Se connecter à spotify',
    color: 'secondary',
    click: () => {
      onLoginClick()
    }
  }
]
</script>

<template>
  <ULandingHero
    title="Authentification requise"
    description="Vous devez être authentifié a spotify pour accéder à cette page"
    :links="links"
    :ui="{
      title:
        'text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl',
      description:
        'mt-6 text-base/7 text-gray-500 dark:text-gray-400 text-center'
    }"
  />
</template>
