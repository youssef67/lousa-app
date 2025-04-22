<script setup lang="ts">
import type { StreamerPlaylist } from '~/types/streamer.type'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  playlists: {
    type: Object as PropType<StreamerPlaylist[]>,
    required: true
  },
})

const inputText = ref(null)
const playlistName = ref('')
const playlistsOfStreamer = ref<StreamerPlaylist[]>(props.playlists)

const emit = defineEmits(['update:isOpen', 'changePlaylist', 'deletePlaylist'])

const closeSlider = () => {
  playlistName.value = ''
  emit('update:isOpen', false)
}

const selectPlaylist = (value: string) => {
  emit('update:isOpen', false)
  if (value) {
    emit('changePlaylist', value)
  }
}

const deletePlaylist = async (id: string) => {
  emit('deletePlaylist', id)
  // const playlistToDelete = playlistsOfStreamer.value.find(
  //   playlist => playlist.id === id
  // )

  // const response = await runDeletePlaylist(playlistToDelete.id)

  // if (response.result) {
  //   playlistsOfStreamer.value = playlistsOfStreamer.value.filter(
  //     playlist => playlist.id !== id
  //   )
  //   showSuccess('Playlist supprimée avec succès')
  // } else {
  //   showError('Erreur lors de la suppression de la playlist')
  // }
}

const filteredPlaylists = computed(() => {
  if (!playlistName.value) {
    return playlistsOfStreamer.value
  }
  return playlistsOfStreamer.value.filter(playlist =>
    playlist.playlistName
      .toLowerCase()
      .includes(playlistName.value.toLowerCase())
  )
})

// const proceedResult = (playlist: PlaylistCardInfo) => {
//   streamerStore.updateStreamerPlaylists(playlistsOfStreamer.value)
//   isCreatePlaylistModalOpen.value = false
// }

watch(
  () => props.playlists,
  newValue => {
    playlistsOfStreamer.value = newValue
  },
  { immediate: true }
)
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
        <!-- <UButton
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
        /> -->
        <template v-if="filteredPlaylists.length > 0">
          <div
            v-for="playlist in filteredPlaylists"
            :key="playlist.id"
            class="mt-2 mx-2"
          >
            <PlaylistCardSliderStreamer
              :playlist="playlist"
              @select-playlist="selectPlaylist"
              @delete-playlist="deletePlaylist"
            />
          </div>
        </template>
        <div v-else class="text-center mt-4 text-gray-500">
          <p>Aucune playlist trouvée</p>
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
