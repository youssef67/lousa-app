<script setup lang="ts">
import viewerAccess from '~/assets/images/viewer-access.webp'
import streamerAccess from '~/assets/images/streamer-access.webp'

definePageMeta({
  middleware: 'auth'
})

const sessionStore = useSessionStore()
const isCompleteUserNameModalOpen = ref(false)
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

</script>

<template>
  <UContainer>
    <!-- Hero -->
    <ULandingHero
      title="Créer une communauté musicale"
      description="Faites découvrir vos pépites musicales"
    />

    <!-- Cartes accès viewer/streamer -->
    <section
      class="grid grid-cols-1 sm:grid-cols-2 gap-12  max-w-4xl mx-auto"
    >
      <!-- Carte Viewer -->
      <UCard class="flex flex-col text-center p-6">
        <template #header>
          <h2 class="text-xl font-semibold mb-4">Je suis viewer</h2>
        </template>

        <img
          :src="viewerAccess"
          alt="Accès viewer"
          class="w-full h-40 object-contain mb-6 rounded-lg shadow"
        />

        <p class="text-sm text-gray-500 mb-6 px-2">
          Rejoignez différents espaces, ajoutez et votez pour vos musiques préférées.
        </p>

        <UButton
          label="Accéder à mon espace viewer"
          color="primary"
          size="md"
          class="w-full justify-center text-center"
          @click="goToSpaceViewer"
        />
      </UCard>

      <!-- Carte Streamer -->
      <UCard class="flex flex-col text-center p-6">
        <template #header>
          <h2 class="text-xl font-semibold mb-4">Je suis streamer</h2>
        </template>

        <img
          :src="streamerAccess"
          alt="Accès streamer"
          class="w-full h-40 object-contain mb-6 rounded-lg shadow"
        />

        <p class="text-sm text-gray-500 mb-6 px-2">
          Gérez vos playlists et interagissez avec votre communauté musicale.
        </p>

        <UButton
          label="Accéder à mon espace streamer"
          color="secondary"
          size="md"
          class="w-full justify-center text-center"
          @click="goToStreamerSpace"
        />
      </UCard>

      <!-- Modal nom d'utilisateur -->
      <CompleteUserNameModal
        :is-open="isCompleteUserNameModalOpen"
        @update:isOpen="isCompleteUserNameModalOpen = $event"
      />
    </section>
  </UContainer>
</template>


