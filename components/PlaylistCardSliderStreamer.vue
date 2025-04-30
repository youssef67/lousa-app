<script lang="ts" setup>
import type { StreamerPlaylist } from '~/types/streamer.type'

const props = defineProps({
  playlist: {
    type: Object as PropType<StreamerPlaylist>,
    required: true
  },
  closeSlider: Function
})

const playlistCard = ref<StreamerPlaylist>(props.playlist)
const emit = defineEmits(['selectPlaylist', 'deletePlaylist'])

const deletePlaylist = async () => {
  emit('deletePlaylist', props.playlist.id)
}

const selectPlaylist = async () => {
  emit('selectPlaylist', props.playlist.id)
}

</script>

<template>
  <div
    class="flex flex-col mx-4 py-2 border rounded-md px-2 max-w-sm items-center"
  >
    <h2>{{ playlist.playlistName }}</h2>
    <p>Nombre de musique : {{ playlist.nbTracks }}</p>
    <p>Nombre de followers: {{ playlist.nbFollowers }}</p>
    <p>{{ playlist.onlyFollowers ? 'ouverte'  : 'fermée'}}</p>
    <div class="flex gap-2 mt-2 w-full">
      <UButton
        label="Sélectionner"
        :disabled="playlistCard.isSelected"
        type="submit"
        variant="solid"
        size="md"
        color="primary"
        class="w-auto"
        @click="selectPlaylist"
      />
      <UButton
        label="Supprimer"
        :disabled="playlistCard.isSelected"
        type="submit"
        variant="solid"
        size="md"
        color="secondary"
        class="w-auto"
        @click="deletePlaylist"
      />
    </div>
  </div>
</template>

<style></style>
