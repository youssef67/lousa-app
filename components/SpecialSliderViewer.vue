<script setup lang="ts">
import type { Playlist, SpaceStreamer } from '~/types/viewer.type'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  favoritesPlaylists: {
    type: Object as PropType<Playlist[]>,
    required: true
  },
  favoritesSpaceStreamers: {
    type: Object as PropType<SpaceStreamer[]>,
    required: true
  }
})

const inputText = ref(null)
const dataName = ref('')
const toast = useSpecialToast()
const dataToDisplay = ref(null)
const dataTypeToDisplay = ref('playlists')
const emit = defineEmits(['update:isOpen', 'proceedResult'])
const { pushStreamers } = useSpecialRouter()

const closeSlider = () => {
  dataName.value = ''
  emit('update:isOpen', false)
}

const filteredData = computed(() => {
  if (dataTypeToDisplay.value === 'playlists') {
    if (!dataName.value) {
      return props.favoritesPlaylists
    }
    return props.favoritesPlaylists.filter(playlist =>
      playlist.playlistName.toLowerCase().includes(dataName.value.toLowerCase())
    )
  } else {
    if (!dataName.value) {
      return props.favoritesSpaceStreamers
    }
    return props.favoritesSpaceStreamers.filter(spaceStreamer =>
      spaceStreamer.spaceName
        .toLowerCase()
        .includes(dataName.value.toLowerCase())
    )
  }
})

const toggleDataType = () => {
  dataTypeToDisplay.value = dataTypeToDisplay.value === 'playlists' ? 'spaceStreamers' : 'playlists'
  dataName.value = ''
}

onMounted(() => {
  if (props.favoritesPlaylists.length > 0) {
    dataToDisplay.value = props.favoritesPlaylists as Playlist[]
  } else {
    if (props.favoritesSpaceStreamers.length > 0) {
      dataToDisplay.value = props.favoritesSpaceStreamers as SpaceStreamer[]
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
        placeholder="Rechercher une playlist"
        required
        size="sm"
        icon="i-tabler-search"
        autocomplete="off"
        class="flex mt-12"
        :trailing="true"
      />
      <div class="flex-1 overflow-y-auto">
        <UButton
          :label="dataTypeToDisplay === 'playlists' ? 'Voir les streamers' : 'Voir les playlists'"
          type="submit"
          variant="solid"
          size="xl"
          color="secondary"
          @click="toggleDataType"
        />
        <template v-if="filteredData.length > 0">
          <div v-for="item in filteredData" :key="item.id" class="mt-2 mx-2">
            <FavoritePlaylistCardSlider
              v-if="dataTypeToDisplay === 'playlists'"
              :item="item as Playlist"
              :closeSlider="closeSlider"
            />
            <FavoriteSpaceStreamerCardSlider
              v-else
              :item="item as SpaceStreamer"
              :closeSlider="closeSlider"
            />
          </div>
        </template>
        <div v-else class="text-center mt-4 text-gray-500">
          <p v-if="dataTypeToDisplay==='playlists'">Aucune playlist en favoris</p>
          <p v-else>Aucun espace de streamer en favoris</p>
          <UButton
        label="Liste des streamers"
        type="submit"
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
