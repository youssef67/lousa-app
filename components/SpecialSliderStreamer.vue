<script setup lang="ts">
import type { PropType } from 'vue'
import type { PlaylistStreamer } from '~/types/playlist.type'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  playlists: {
    type: Object as PropType<PlaylistStreamer[]>,
    required: true
  },
  openedByStreamer: {
    type: Boolean,
    required: false
  }
})

const inputText = ref(null)
const playlistName = ref('')
const streamerStore = useStreamerStore()

const isCreatePlaylistModalOpen = ref(false)
const emit = defineEmits(['update:isOpen', 'proceedResult'])

const closeSlider = () => {
  playlistName.value = ''
  emit('update:isOpen', false)
}

const filteredPlaylists = computed(() => {
  if (!playlistName.value) {
    return props.playlists
  }
  return props.playlists.filter(playlist =>
    playlist.playlistName
      .toLowerCase()
      .includes(playlistName.value.toLowerCase())
  )
})

const proceedResult = (playlist: PlaylistStreamer) => {
  streamerStore.addPlaylistsToList(playlist)
  isCreatePlaylistModalOpen.value = false
}
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
        v-model="playlistName"
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
          v-if="props.openedByStreamer"
          label="créer la playlist"
          type="submit"
          variant="solid"
          size="xl"
          color="secondary"
          @click="
            () => {
              closeSlider()
              isCreatePlaylistModalOpen = true
            }
          "
        />
        <template v-if="filteredPlaylists.length > 0">
          <div
            v-for="playlist in filteredPlaylists"
            :key="playlist.id"
            class="mt-2 mx-2"
          >
            <PlaylistCardSliderStreamer
              :playlist="playlist"
              :closeSlider="closeSlider"
            />
          </div>
        </template>
        <div v-else class="text-center mt-4 text-gray-500">
          <p>Aucune playlist trouvée</p>
        </div>
      </div>
    </div>
  </USlideover>
  <CreatePlaylistModal
    :is-open="isCreatePlaylistModalOpen"
    @proceed-result="proceedResult"
  />
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
