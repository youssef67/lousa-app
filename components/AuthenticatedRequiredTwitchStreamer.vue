<script lang="ts" setup>
import { Subscription, Transmit } from '@adonisjs/transmit-client'

const { showSuccess, showError } = useSpecialToast()
const config = useRuntimeConfig()
const sessionStore = useSessionStore()
const { runLoginTwitch } = useAuthRepository()
const { runCheckIfStreamer, runDeleteStreamerProfile } =
  useSessionRepository()

const { handleError } = useSpecialError()

async function closeEventStream(subscription: Subscription) {
  await subscription.delete()
}

async function onLoginClick() {
  // Initialisation de la connexion
  const transmit = new Transmit({
    baseUrl: `${config.public.siteUrl}/api/v1`
  })

  // Création de la souscription
  const subscription = transmit.subscription(
    `authentication/twitch/${sessionStore.session.user.id}`
  )

  await subscription.create()

  try {
    const newWindow = await runLoginTwitch()
    // Mise en place de l'écoute des messages envoyés par le serveur au moment du callback
    subscription.onMessage(async () => {
      const response = await runCheckIfStreamer()

      if (response.twitchUser.isStreamer) {
        await sessionStore.updateSessionTwitchUser(response.twitchUser)

        showSuccess('Vous êtes maintenant connecté à votre espace streamer')
      } else {
        await runDeleteStreamerProfile()

        showError("Désolé, vous n'êtes pas autorisé à accéder à cet espace")
      }

      // Fermeture de la page de connexion twitch et de la connextion serveur sent events
      newWindow?.close()
      await closeEventStream(subscription)
    })
  } catch (error) {
    handleError(error)
  }
}

const links: any = [
  {
    label: 'Se connecter à twitch',
    color: 'secondary',
    click: () => {
      onLoginClick()
    }
  }
]
</script>

<template>
  <ULandingHero
    title="Authentification Streamer Twitch requise"
    description="Vous devez être authentifié à l'API twitch pour activer votre espace streamer"
    :links="links"
    :ui="{
      title:
        'text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl',
      description:
        'mt-6 text-base/7 text-gray-500 dark:text-gray-400 text-center'
    }"
  />
</template>
