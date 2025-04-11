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
    <template v-if="isLoading">
      <p>Chargement en cours...</p>
    </template>

    <template v-else-if="!spaceStreamerProfile">
      <p>Erreur : impossible de charger le profil du Space Streamer.</p>
    </template>

    <template v-else>
      <UAvatar :src="spaceStreamerProfile?.spaceStreamerImg" alt="Avatar" />
      <h1>Space Streamer of {{ spaceStreamerProfile?.spaceName }}</h1>

      <section>
        <UButton
          :label="
            isFavoriteStreamer
              ? 'Retirer ce streamer de mes favoris'
              : 'Ajouter ce streamer à mes favoris'
          "
          type="submit"
          variant="solid"
          size="xl"
          color="secondary"
          :icon="
            isFavoriteStreamer
              ? 'i-heroicons-heart-20-solid'
              : 'i-heroicons-heart'
          "
          @click="toggleFavoriteStreamer"
        />
      </section>

      <section v-if="playlists.length">
        <div v-for="playlist in playlists" :key="playlist.id" class="mt-2 mx-2">
          <PlaylistCard :playlist="playlist" />
        </div>
      </section>

      <p v-else>Aucune playlist disponible.</p>
    </template>
  </UContainer>
</template>
