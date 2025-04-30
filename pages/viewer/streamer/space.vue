<script lang="ts" setup>
import type { PlaylistViewer } from '~/types/playlist.type'
import type { SpaceStreamerProfile } from '~/types/streamer.type'

const route = useRoute()
const spaceStreamerId = computed(
  () => route.query.streamer as string | undefined
)

const spaceStreamerProfile = ref<SpaceStreamerProfile | null>(null)
const playlists = ref<PlaylistViewer[]>([])
const isLoading = ref(true)
const isFavoriteStreamer = ref(false)

const {
  runGetStreamerProfile,
  runAddFavoriteStreamer,
  runDeleteFavoriteStreamer
} = useViewerRepository()
const toast = useSpecialToast()

const toggleFavoriteStreamer = async () => {
  if (!spaceStreamerId.value) return

  if (isFavoriteStreamer.value) {
    const response = await runDeleteFavoriteStreamer(spaceStreamerId.value)
    if (response) {
      isFavoriteStreamer.value = false
      toast.showSuccess('Space streamer retiré des favoris')
    }
  } else {
    const response = await runAddFavoriteStreamer(spaceStreamerId.value)
    if (response) {
      isFavoriteStreamer.value = true
      toast.showSuccess('Space streamer ajouté aux favoris')
    }
  }
}

// Surveille les changements de `spaceStreamerId` pour éviter un appel API avec `undefined`
watchEffect(async () => {
  if (!spaceStreamerId.value) return

  isLoading.value = true

  try {
    const response = await runGetStreamerProfile(spaceStreamerId.value)
    console.log('response', response.playlists)
    if (response) {
      spaceStreamerProfile.value = response.spaceStreamerProfile || null
      playlists.value = response.playlists || []
      isFavoriteStreamer.value = !!response.isFavoriteStreamer
    } else {
      console.error('Aucune donnée reçue pour ce streamer.')
    }
  } catch (err) {
    console.error('Erreur lors de la récupération du profil:', err)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <UContainer>
    <!-- Chargement -->
    <template v-if="isLoading">
      <div class="text-center py-10 text-gray-500">Chargement en cours...</div>
    </template>

    <!-- Erreur -->
    <template v-else-if="!spaceStreamerProfile">
      <div class="text-center py-10 text-red-500">
        Erreur : impossible de charger le profil du Space Streamer.
      </div>
    </template>

    <!-- Affichage principal -->
    <template v-else>
      <!-- Profil streamer -->
      <div class="flex flex-col items-center text-center mt-8 mb-6 space-y-4">
        <UAvatar
          :src="spaceStreamerProfile.spaceStreamerImg"
          alt="Avatar"
          size="xl"
        />

        <h1 class="text-2xl font-bold text-white">
          {{ spaceStreamerProfile.spaceName }}
        </h1>

        <UButton
          :label="
            isFavoriteStreamer
              ? 'Retirer ce streamer de mes favoris'
              : 'Ajouter ce streamer à mes favoris'
          "
          type="button"
          variant="soft"
          size="md"
          color="pink"
          :icon="
            isFavoriteStreamer
              ? 'i-heroicons-heart-20-solid'
              : 'i-heroicons-heart'
          "
          @click="toggleFavoriteStreamer"
          class="w-full max-w-xs"
        />
      </div>

      <!-- Playlists -->
      <section v-if="playlists.length" class="mt-10">
        <h2 class="text-xl font-semibold text-white mb-4 text-center">
          Playlists disponibles
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <PlaylistCard
            v-for="playlist in playlists"
            :key="playlist.id"
            :playlist="playlist"
          />
        </div>
      </section>

      <!-- Pas de playlists -->
      <p v-else class="text-center text-gray-400 mt-8">
        Aucune playlist disponible.
      </p>
    </template>
  </UContainer>
</template>

