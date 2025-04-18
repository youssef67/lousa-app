<script setup lang="ts">
import type {
  PlaylistFavorite,
  SpaceStreamerFavorite
} from '~/types/viewer.type'

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const inputText = ref(null)
const dataName = ref('')
const favoritesPlaylists = ref<PlaylistFavorite[]>([])
const favoritesSpaceStreamers = ref<SpaceStreamerFavorite[]>([])
const toast = useSpecialToast()
const displayPlaylist = ref(true) // true = Playlists, false = Streamers
const emit = defineEmits(['update:isOpen', 'changePlaylist'])
const { pushStreamers } = useSpecialRouter()
const { runGetFavorites, runDeleteFavoritePlaylist } = useViewerRepository()

const closeSlider = () => {
  dataName.value = ''
  emit('update:isOpen', false)
}

const selectPlaylist = (value: string) => {
  emit('update:isOpen', false)
  if (value) {
    emit('changePlaylist', value)
  }
}

const deletePlaylistFromFavorites = (playlistToDelete: PlaylistFavorite) => {
  const response = runDeleteFavoritePlaylist(playlistToDelete.id)

  if (!response) {
    toast.showError('Erreur lors de la suppression de la playlist')
    return
  }

  favoritesPlaylists.value = favoritesPlaylists.value.filter(
    playlist => playlist.id !== playlistToDelete.id
  )
  toast.showSuccess('Playlist retirée des favoris')
}

const deleteStreamerFromFavorites = (
  spaceStreamerToDelete: SpaceStreamerFavorite
) => {
  favoritesSpaceStreamers.value = favoritesSpaceStreamers.value.filter(
    streamer => streamer.id !== spaceStreamerToDelete.id
  )
  toast.showSuccess('Streamer retiré des favoris')
}

const filteredData = computed(() => {
  if (!dataName.value) {
    return displayPlaylist.value
      ? favoritesPlaylists.value
      : favoritesSpaceStreamers.value
  }

  return displayPlaylist.value
    ? favoritesPlaylists.value.filter(playlist =>
        playlist.playlistName
          .toLowerCase()
          .includes(dataName.value.toLowerCase())
      )
    : favoritesSpaceStreamers.value.filter(streamer =>
        streamer.spaceName.toLowerCase().includes(dataName.value.toLowerCase())
      )
})

const toggleDataType = () => {
  displayPlaylist.value = !displayPlaylist.value
  dataName.value = ''
}

onMounted(async () => {
  const response = await runGetFavorites()

  if (response) {
    favoritesPlaylists.value = response.playlistsFavorites
    favoritesSpaceStreamers.value = response.spaceStreamersFavorites
  }

  // for (const playlist of favoritesPlaylists.value) {
  //   if (playlist.isSelected) {
  //     emit('changePlaylist', playlist.id)
  //   }
  // }
})
</script>

<template>
  <USlideover
    :model-value="isOpen"
    @update:model-value="emit('update:isOpen', $event)"
    side="left"
  >
    <div class="p-4 flex flex-col h-full">
      <!-- Header : Logo + Close -->
      <div class="flex justify-between items-center mb-6">
        <UIcon name="my-icon:logo-name" size="40" mode="svg" />
        <UButton
          variant="ghost"
          icon="i-tabler-x"
          color="black"
          class="font-black"
          @click="closeSlider"
        />
      </div>

      <!-- Barre de recherche -->
      <div class="mb-4">
        <UInput
          ref="inputText"
          v-model="dataName"
          type="text"
          :placeholder="displayPlaylist ? 'Rechercher une playlist' : 'Rechercher un streamer'"
          size="md"
          icon="i-tabler-search"
          autocomplete="off"
          class="w-full"
        />
      </div>

      <!-- Switch entre playlists et streamers -->
      <div class="mb-6">
        <UButton
          :label="displayPlaylist ? 'Voir les streamers favoris' : 'Voir les playlists favorites'"
          variant="outline"
          size="sm"
          color="red"
          class="w-full justify-center text-center"
          @click="toggleDataType"
        />
      </div>

      <!-- Contenu scrollable -->
      <div class="flex-1 overflow-y-auto space-y-6 mt-5 px-1">
        <template v-if="filteredData.length > 0">
          <div
            v-for="item in filteredData"
            :key="item.id"
            class="transition-all duration-300 hover:scale-[1.02]"
          >
            <FavoritePlaylistCardSlider
              v-if="displayPlaylist"
              :item="item as PlaylistFavorite"
              @select-playlist="selectPlaylist"
              @delete-favorites="deletePlaylistFromFavorites"
            />
            <FavoriteSpaceStreamerCardSlider
              v-else
              :item="item as SpaceStreamerFavorite"
              :closeSlider="closeSlider"
              @delete-favorites="deleteStreamerFromFavorites"
            />
          </div>
        </template>

        <!-- Aucune donnée -->
        <div v-else class="text-center text-gray-500 mt-10 space-y-4">
          <p v-if="displayPlaylist">Aucune playlist en favoris</p>
          <p v-else>Aucun streamer en favoris</p>
          <UButton
            label="Voir tous les streamers"
            variant="solid"
            size="md"
            color="secondary"
            @click="pushStreamers"
          />
        </div>
      </div>
    </div>
  </USlideover>
</template>


<style scoped>
.flex-1::-webkit-scrollbar {
  width: 8px;
}

.flex-1::-webkit-scrollbar-thumb {
  background-color: white;
  border-radius: 4px;
}

.flex-1::-webkit-scrollbar-thumb:hover {
  background-color: #b03032;
}
</style>
