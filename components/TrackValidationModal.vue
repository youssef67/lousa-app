<script lang="ts" setup>
import type { Track } from '~/types/playlist.type'

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
const { runAddPendingTrack } = usePlaylistRepository()
const toast = useSpecialToast()

const pendingTrackValidation = async (trackChosen: Track) => {
  const response = await runAddPendingTrack(
    props.playlistId,
    trackChosen
  )

  if (response) {
    updateIsOpen(false)
    toast.showSuccess("Son en liste d'attente")
  } else {
    toast.showError("Erreur lors de l'ajout de la chanson en liste d'attente")
  }
}

const updateIsOpen = (value: boolean) => {
  emit('update:isOpen', value)
  if (!value) {
    emit('proceedResult', null)
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

      <div v-for="item in props.foundTracks" :key="item.trackId" class="mt-2 mx-2">
        <TrackInfoCard
          :track="item"
          @track-validation="pendingTrackValidation"
        />
      </div>
    </div>
  </UModal>
</template>

<style scoped></style>
