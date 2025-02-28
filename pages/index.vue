<script setup lang="ts">
import { Subscription, Transmit } from '@adonisjs/transmit-client'
import type { TwitchCallBackTransmit } from '~/types/session.type'

definePageMeta({
  middleware: 'auth'
})

const sessionStore = useSessionStore()
const config = useRuntimeConfig()
const isCompleteUserNameModalOpen = ref(false)
const { runLoginTwitch } = useAuthRepository()
const { showSuccess, showError } = useSpecialToast()
const { runCompleteProfile, runGetViewerData } = useViewerRepository()
const { handleError } = useSpecialError()
const { pushSpaceStreamer, pushSpaceViewer } = useSpecialRouter()

// Fonction pour naviguer vers la page des streamers
const goToSpaceViewer = () => {
  if (!sessionStore.session.user.userName) {
    isCompleteUserNameModalOpen.value = true
  } else {
    pushSpaceViewer()
  }
}
const goToStreamerSpace = () => {
  pushSpaceStreamer()
}

async function closeEventStream(subscription: Subscription) {
  await subscription.delete()
}

const proceedResult = async () => {
  isCompleteUserNameModalOpen.value = false

  const transmit = new Transmit({
    baseUrl: `${config.public.siteUrl}/api/v1`
  })

  const subscription = transmit.subscription(
    `authentication/twitch/${sessionStore.session.user.id}`
  )

  await subscription.create()

  try {
    const newWindow = await runLoginTwitch()
    // Mise en place de l'écoute des messages envoyés par le serveur au moment du callback
    subscription.onMessage(async (data: TwitchCallBackTransmit) => {
      const response = await runCompleteProfile(data.displayName)

      if (response.result.userName) {
        await sessionStore.updateSessionUser(response.result)
        showSuccess('Profil complété avec succès avec votre userName Twitch')
        pushSpaceViewer()
      } else {
        showError("Désolé, ce nom d'utilisateur est déjà pris. Veuillez en choisir un autre.")
      }
      // // Fermeture de la page de connexion twitch et de la connextion serveur sent events
      newWindow?.close()
      await closeEventStream(subscription)
    })
  } catch (error) {
    handleError(error)
  }
}
</script>

<template>
  <UContainer>
    <!-- Hero Section -->
    <ULandingHero
      title="Créer une communauté musicale"
      description="Faites découvrir vos pépites musicales"
    />

    <!-- Section avec les cartes -->
    <section class="flex flex-col sm:flex-row gap-6 justify-center mt-10">
      <!-- Carte Viewer -->
      <UCard class="min-w-[300px] text-center">
        <template #header>
          <h2 class="text-lg font-semibold">Je suis viewer</h2>
        </template>
        <UButton
          label="Accéder à mon espace viewer"
          color="primary"
          @click="goToSpaceViewer"
        />
      </UCard>

      <!-- Carte Streamer -->
      <UCard class="min-w-[300px] text-center">
        <template #header>
          <h2 class="text-lg font-semibold">Je suis streamer</h2>
        </template>
        <div></div>
        <UButton
          label="Accéder à mon espace streamer"
          color="secondary"
          @click="goToStreamerSpace"
        />
      </UCard>

      <CompleteUserNameModal
        :is-open="isCompleteUserNameModalOpen"
        @proceed-result="proceedResult"
      />
    </section>
  </UContainer>
</template>
