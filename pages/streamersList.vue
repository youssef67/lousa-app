<script lang="ts" setup>
import type { Streamer } from '~/types/session.type.js'
import { useDebounceFn } from '@vueuse/core'

const { runGetStreamersList } = useSessionRepository()
const streamersList = ref<Streamer[]>([]) // Liste paginée pour affichage
const allStreamersList = ref<Streamer[]>([]) // Contient tous les streamers chargés
const filteredStreamers = ref<Streamer[]>([]) // Résultat de la recherche
const paginatedStreamers = ref<Streamer[]>([]) // Liste finale après recherche + pagination
const currentPage = ref(1)
const totalPages = ref(1)
const searchQuery = ref('')
const perPage = 15
const isFetchingAll = ref(false) // Pour éviter de recharger inutilement

// Fonction pour charger tous les streamers une seule fois
const fetchAllStreamers = async () => {
  if (isFetchingAll.value) return
  isFetchingAll.value = true

  let page = 1
  let allStreamers: Streamer[] = []

  while (true) {
    const response = await runGetStreamersList(page)
    allStreamers = [...allStreamers, ...response.data]

    if (page >= response.meta.lastPage) break
    page++
  }

  allStreamersList.value = allStreamers
  filteredStreamers.value = allStreamers
  updatePaginatedStreamers()
}

// Fonction pour charger les streamers d'une page spécifique (pagination normale)
const fetchStreamers = async (page: number) => {
  const response = await runGetStreamersList(page)

  streamersList.value = response.data
  currentPage.value = response.meta.currentPage
  totalPages.value = response.meta.lastPage

  if (allStreamersList.value.length === 0) {
    fetchAllStreamers()
  }
}

// Applique la pagination après la recherche
const updatePaginatedStreamers = () => {
  const start = (currentPage.value - 1) * perPage
  const end = start + perPage
  paginatedStreamers.value = filteredStreamers.value.slice(start, end)
}

// **Ajout du debounce pour la recherche**
const debouncedSearch = useDebounceFn(() => {
  currentPage.value = 1 // Reset à la première page lors d'une recherche

  if (!searchQuery.value) {
    filteredStreamers.value = allStreamersList.value
  } else {
    filteredStreamers.value = allStreamersList.value.filter(streamer =>
      streamer.twitchUserLogin
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
    )
  }

  totalPages.value = Math.ceil(filteredStreamers.value.length / perPage)
  updatePaginatedStreamers()
}, 300) // 300ms de délai avant d'exécuter la recherche

// Surveille searchQuery mais applique le debounce
watch(searchQuery, () => {
  debouncedSearch()
})

// Surveille la page actuelle pour mettre à jour la liste affichée
watch(currentPage, () => {
  updatePaginatedStreamers()
})

// Charger la première page au montage du composant
onMounted(() => {
  fetchStreamers(currentPage.value)
})

// Naviguer vers la page suivante
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// Naviguer vers la page précédente
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>

<template>
  <UContainer>
    <h1 class="text-2xl font-bold mb-4">Liste des streamers</h1>

    <!-- Champ de recherche avec debounce -->
    <div class="mb-6 flex justify-center">
      <UInput
        v-model="searchQuery"
        placeholder="Rechercher un streamer"
        size="xl"
        class="w-1/2"
        icon="i-tabler-search"
      />
    </div>

    <!-- Vérifie si la liste est vide -->
    <div v-if="paginatedStreamers.length === 0" class="text-gray-500">
      Aucun streamer trouvé.
    </div>

    <!-- Boucle sur les streamers pour afficher les cartes -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <SpaceStreamerCard
        v-for="streamer in paginatedStreamers"
        :key="streamer.id"
        :spaceStreamer="streamer"
      />
    </div>

    <!-- Pagination -->
    <div class="flex justify-center items-center gap-4 mt-6 mb-10">
      <UButton
        label="Précédent"
        :disabled="currentPage === 1"
        @click="prevPage"
      />
      <span>Page {{ currentPage }} sur {{ totalPages }}</span>
      <UButton
        label="Suivant"
        :disabled="currentPage === totalPages"
        @click="nextPage"
      />
    </div>
  </UContainer>
</template>

<style></style>
