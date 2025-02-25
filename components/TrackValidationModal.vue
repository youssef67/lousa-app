<script lang="ts" setup>
import type { Track } from '~/types/viewer.type'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  foundTracks: {
    type: Array as PropType<Track[]>,
    required: true
  },
  playlistId: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update:isOpen', 'proceedResult'])
const { runAddTrack } = useViewerRepository()
const viewerStore = useViewerStore()
const toast = useSpecialToast()

const handleTrackValidation = async (trackChosen: Track) => {

  const response = await runAddTrack(props.playlistId, trackChosen)

  if(response) {
    await viewerStore.addPlaylistTracks(response.newPlaylistTrack)
    updateIsOpen(false)
    toast.showSuccess('Son choisi')
  }
}

const updateIsOpen = (value: boolean) => {
  emit('update:isOpen', value)
  if (!value) {
    emit('proceedResult')
  }
}
</script>

<template>
  <UModal :model-value="isOpen" @update:model-value="updateIsOpen">
    <div class="p-4">
      <div class="relative flex flex-grow">
        <p class="mx-auto font-bold text-3xl">Résultat de la recherche</p>
        <UButton
          variant="ghost"
          icon="i-tabler-x"
          color="black"
          size="xl"
          class="absolute top-0 right-0"
          @click="updateIsOpen(false)"
        />
      </div>

      <div v-for="item in props.foundTracks" :key="item.id" class="mt-2 mx-2">
        <TrackInfoCard :track="item" @track-validation="handleTrackValidation"/>
      </div>
    </div>
  </UModal>
</template>

<style scoped></style>
