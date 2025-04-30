<script lang="ts" setup>
import type { PlaylistFavorite } from '~/types/viewer.type'

const props = defineProps({
  item: {
    type: Object as PropType<PlaylistFavorite>,
    required: true
  },
  closeSlider: Function
})

const emit = defineEmits(['selectPlaylist', 'deleteFavorites'])

const selectPlaylist = async () => {
  emit('selectPlaylist', props.item.id)
}

const deleteFavorites = async () => {
  emit('deleteFavorites', props.item)
}
</script>

<template>
  <div
    class="flex flex-col mx-4 py-2 border rounded-md px-2 max-w-sm items-center"
  >
    <h2>{{ item.playlistName }}</h2>
    <h3>{{ item.spaceStreamerName }}</h3>
    <UAvatar :src="item.spaceStreamerImg" alt="Avatar" />
    <p>Nombre de musique : {{ item.nbTracks }}</p>
    <p>Nombre de followers: {{ item.nbFollowers }}</p>
    <p>{{ item.onlyFollowers ? 'fermée'  : 'ouverte'}}</p>


    <div class="flex flex-col gap-2 mt-2 w-full">
      <UButton
        label="Sélectionner"
        type="submit"
        variant="solid"
        size="md"
        color="primary"
        class="w-full"
        icon="heroicons-arrow-top-right-on-square-solid"
        @click="selectPlaylist"
      />
      <UButton
        label="Retirer des favoris"
        type="submit"
        variant="solid"
        size="md"
        color="secondary"
        class="w-full"
        icon="heroicons:trash"
        @click="deleteFavorites"
      />
    </div>
  </div>
</template>

<style></style>
