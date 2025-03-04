<script setup lang="ts">
import type { PlaylistFavorite, SpaceStreamerFavorite } from '~/types/viewer.type'

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
const { runGetFavorites } = useViewerRepository()

const closeSlider = () => {
  dataName.value = ''
  emit('update:isOpen', false)
}

const selectPlaylist = (value: PlaylistFavorite) => {
  emit('update:isOpen', false)
  if (value) {
    emit('changePlaylist', value)
  }
}

const deletePlaylistFromFavorites = (playlistToDelete: PlaylistFavorite) => {
  favoritesPlaylists.value = favoritesPlaylists.value.filter(
    playlist => playlist.id !== playlistToDelete.id
  )
  toast.showSuccess('Playlist retirée des favoris')
}

const deleteStreamerFromFavorites = (spaceStreamerToDelete: SpaceStreamerFavorite) => {
  favoritesSpaceStreamers.value = favoritesSpaceStreamers.value.filter(
    streamer => streamer.id !== spaceStreamerToDelete.id
  )
  toast.showSuccess('Streamer retiré des favoris')
}

const filteredData = computed(() => {
  if (!dataName.value) {
    return displayPlaylist.value ? favoritesPlaylists.value : favoritesSpaceStreamers.value
  }
  
  return displayPlaylist.value
    ? favoritesPlaylists.value.filter(playlist =>
        playlist.playlistName.toLowerCase().includes(dataName.value.toLowerCase())
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

  for (const playlist of favoritesPlaylists.value) {
    if (playlist.isSelected) {
      emit('changePlaylist', playlist)
    }
  }
})
</script>

<template>
  <USlideover
    :model-value="isOpen"
    @update:model-value="emit('update:isOpen', $event)"
    side="left"
  >
    <div class="p-4 flex flex-col h-full">
      <div class="flex justify-between items-center mb-4">
        <UIcon name="my-icon:logo-name" size="40" mode="svg" />

        <UButton
          variant="ghost"
          icon="i-tabler-x"
          color="black"
          class="font-black"
          @click="closeSlider"
        />
      </div>

      <UInput
        ref="inputText"
        v-model="dataName"
        input-text
        type="text"
        :placeholder="displayPlaylist ? 'Rechercher une playlist' : 'Rechercher un streamer'"
        required
        size="sm"
        icon="i-tabler-search"
        autocomplete="off"
        class="flex mt-12"
      />

      <div class="flex-1 overflow-y-auto">
        <UButton
          :label="displayPlaylist ? 'Voir les streamers favoris' : 'Voir les playlists favorites'"
          variant="solid"
          size="xl"
          color="secondary"
          class="mb-4"
          @click="toggleDataType"
        />

        <template v-if="filteredData.length > 0">
          <div v-for="item in filteredData" :key="item.id" class="mt-2 mx-2">
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

        <div v-else class="text-center mt-4 text-gray-500">
          <p v-if="displayPlaylist">Aucune playlist en favoris</p>
          <p v-else>Aucun streamer en favoris</p>
          <UButton
            label="Liste des streamers"
            variant="solid"
            size="xl"
            color="secondary"
            @click="pushStreamers()"
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
