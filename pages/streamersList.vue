<script lang="ts" setup>
import type { SpaceStreamerProfile  } from '~/types/streamer.type.js'
import { useDebounceFn } from '@vueuse/core'

const { runGetStreamersList } = useSessionRepository()
const streamersList = ref<SpaceStreamerProfile[]>([]) // Liste paginée pour affichage
const allStreamersList = ref<SpaceStreamerProfile[]>([]) // Contient tous les streamers chargés
const allStreamersActiveList = ref<SpaceStreamerProfile[]>([]) // Liste des streamers actifs
const filteredStreamers = ref<SpaceStreamerProfile[]>([]) // Résultat de la recherche
const paginatedStreamers = ref<SpaceStreamerProfile[]>([]) // Liste finale après recherche + pagination
const currentPage = ref(1)
const totalPages = ref(1)
const searchQuery = ref('')
const showOnlyActive = ref(false)
const perPage = 15
const isFetchingAll = ref(false) // Pour éviter de recharger inutilement

// Fonction pour charger tous les streamers une seule fois
const fetchAllStreamers = async () => {
  if (isFetchingAll.value) return
  isFetchingAll.value = true

  let page = 1
  let allStreamers: SpaceStreamerProfile[] = []

  while (true) {
    const response = await runGetStreamersList(page)
    allStreamers = [...allStreamers, ...response.data]

    if (page >= response.meta.lastPage) break
    page++
  }

  allStreamersList.value = allStreamers
  filteredStreamers.value = allStreamers
  allStreamersActiveList.value = allStreamers.filter(
    streamer => streamer.twitchUserId !== null
  )

  console.log('allStreamersActiveList', allStreamersActiveList.value)
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
  currentPage.value = 1

  // Source selon l'état du filtre
  const baseList = showOnlyActive.value
    ? allStreamersActiveList.value
    : allStreamersList.value

  let filtered = baseList

  if (searchQuery.value) {
    filtered = filtered.filter(streamer =>
      streamer.twitchUserLogin
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
    )
  }

  filteredStreamers.value = filtered
  totalPages.value = Math.ceil(filtered.length / perPage)
  updatePaginatedStreamers()
}, 300)

// Surveille searchQuery mais applique le debounce
watch(searchQuery, () => {
  debouncedSearch()
})

const selectActiveStreamers = () => {
  showOnlyActive.value = true
  searchQuery.value = '' // (optionnel) reset recherche
  debouncedSearch()
}

const showAllStreamers = () => {
  showOnlyActive.value = false
  searchQuery.value = '' // (optionnel) reset recherche
  debouncedSearch()
}

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
    <div class="mb-6 flex justify-center gap-4 items-center flex-wrap">
  <UInput
    v-model="searchQuery"
    placeholder="Rechercher un streamer"
    size="xl"
    class="w-full md:w-1/2"
    icon="i-tabler-search"
  />
  <UButton
    label="Streamers Actifs"
    icon="i-tabler-lock-open-2"
    :variant="showOnlyActive ? 'solid' : 'outline'"
    color="primary"
    @click="selectActiveStreamers"
  />
  <UButton
    label="Tous les streamers"
    icon="i-tabler-users-group"
    :variant="!showOnlyActive ? 'solid' : 'outline'"
    color="gray"
    @click="showAllStreamers"
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
