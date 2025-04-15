<script lang="ts" setup>
import type { Track } from '~/types/playlist.type'
import { PendingAddResult } from '~/utils/playlist/PlaylistResult.ts'

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
const toast = useSpecialToast()
const { runAddPendingTrack } = usePlaylistRepository()

const pendingTrackValidation = async (trackChosen: Track) => {
  const response = await runAddPendingTrack(props.playlistId, trackChosen)

  if (response.result === PendingAddResult.VOTING) {
    toast.showSuccess('Votre musique est soumise au vote du public')
  } else if (response.result === PendingAddResult.ON_HOLD) {
    toast.showError('Votre musique est en file d\'attente')
  } else if (response.result === PendingAddResult.MISSING) {
    toast.showSuccess('Votre musique est en attente d\'un adversaire')
  } else if (response.result === PendingAddResult.LIMIT_REACH) {
    toast.showError('Vous avez atteint le nombre maximum de musiques à soumettre')
  }
  updateIsOpen(false)
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

      <div
        v-for="item in props.foundTracks"
        :key="item.trackId"
        class="mt-2 mx-2"
      >
        <TrackInfoCard
          :track="item"
          @track-validation="pendingTrackValidation"
        />
      </div>
    </div>
  </UModal>
</template>

<style scoped></style>
