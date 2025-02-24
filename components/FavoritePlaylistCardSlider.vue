<script lang="ts" setup>
import type { PlaylistData, SpaceStreamerData } from '~/types/viewer.type'

const props = defineProps({
  item: {
    type: Object as PropType<PlaylistData>,
    required: true
  },
  closeSlider: Function,
})

const { runAddFavoritePlaylist, runDeleteFavoritePlaylist } =
  useViewerRepository()
const viewerStore = useViewerStore()
const toast = useSpecialToast()

const selectPlaylist = () => {
  viewerStore.playlistSelected = props.item
  props.closeSlider()
}

const deletePlaylistFromFavorites = () => {
  const response = runDeleteFavoritePlaylist(props.item.id)

  if (response) {
    viewerStore.updateFavoritesPlaylistsList(props.item.id)
    toast.showSuccess('Playlist retirée des favoris')
  }
}
</script>
<template>
  <div
    class="flex flex-col mx-4 py-2 border rounded-md px-2 max-w-sm items-center"
  >
    <h2>{{ item.playlistName }}</h2>
    <h3>{{ item.spaceStreamerName }}</h3>
    <UAvatar
      :src="item.spaceStreamerImg"
      alt="Avatar"
    />
    <p>Nombre de musique : 0</p>
    <p>Nombre de followers: 0</p>
  
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
        @click="deletePlaylistFromFavorites"
      />
    </div>
  </div>
</template>

<style></style>
