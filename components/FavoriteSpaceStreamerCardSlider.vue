<script lang="ts" setup>
import type { PlaylistData, SpaceStreamerData } from '~/types/viewer.type'

const props = defineProps({
  item: {
    type: Object as PropType<SpaceStreamerData>,
    required: true
  },
  closeSlider: Function
})

const { runAddFavoritePlaylist, runDeleteFavoriteStreamer } =
  useViewerRepository()
const { pushSpaceStreamerForViewer } = useSpecialRouter()

const viewerStore = useViewerStore()
const toast = useSpecialToast()

const deleteStreamerFromFavorites = () => {
  const response = runDeleteFavoriteStreamer(props.item.id)

  if (response) {
    viewerStore.updateSpacesStreamersList(props.item.id)
    toast.showSuccess('Playlist retirée des favoris')
  }
}
</script>
<template>
  <div
    class="flex flex-col mx-4 py-2 border rounded-md px-2 max-w-sm items-center"
  >
    <h2>{{ item.spaceName }}</h2>
    <UAvatar :src="item.spaceStreamerImg" alt="Avatar" />
    <p>Nombre de musique : 0</p>
    <p>Nombre de followers: 0</p>
    <div class="flex flex-col gap-2 mt-2 w-full">
      <UButton
        label="Espace streamer"
        type="submit"
        variant="solid"
        size="md"
        color="primary"
        class="w-full"
        icon="heroicons-arrow-top-right-on-square-solid"
        @click="pushSpaceStreamerForViewer(item.id, true)"
      />
      <UButton
        label="Retirer des favoris"
        type="submit"
        variant="solid"
        size="md"
        color="secondary"
        class="w-full"
        icon="heroicons:trash"
        @click="deleteStreamerFromFavorites"
      />
    </div>
  </div>
</template>

<style></style>
