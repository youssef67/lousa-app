<script lang="ts" setup>
import type { SpaceStreamerFavorite } from '~/types/viewer.type'

const props = defineProps({
  item: {
    type: Object as PropType<SpaceStreamerFavorite>,
    required: true
  },
  closeSlider: Function
})

const { pushSpaceStreamerForViewer } = useSpecialRouter()
const emit = defineEmits(['deleteFavorites'])
const deleteFavorites = async () => {
  emit('deleteFavorites', props.item)
}

</script>
<template>
  <div
    class="flex flex-col mx-4 py-2 border rounded-md px-2 max-w-sm items-center"
  >
    <h2>{{ item.spaceName }}</h2>
    <UAvatar :src="item.spaceStreamerImg" alt="Avatar" />
    <p>Nombre de playlits : {{ item.nbPlaylists }}</p>
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
        @click="deleteFavorites"
      />
    </div>
  </div>
</template>

<style></style>
