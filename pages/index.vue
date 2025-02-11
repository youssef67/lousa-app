<script setup lang="ts">
import { Subscription, Transmit } from '@adonisjs/transmit-client'

definePageMeta({
  middleware: 'auth'
})

const { pushSpaceStreamer, pushSpaceViewer, pushCreateSpaceStreamer } =
  useSpecialRouter()
const sessionStore = useSessionStore()
// Fonction pour naviguer vers la page des streamers
const goToSpaceStreamer = () => {
  pushSpaceViewer(sessionStore.session.user.id, true)
}
// Fonction pour créer l'espace streamer (ajoute ton username dynamiquement)
const goToStreamerSpace = () => {
  pushSpaceStreamer(sessionStore.session.user.email, true)
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
          @click="goToSpaceStreamer"
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
    </section>

    <!-- <CreateSpaceStreamerModal
      :isOpen="isModalVisible"
      @proceed-result="proceedResult"
    /> -->
  </UContainer>
</template>
