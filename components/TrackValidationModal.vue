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

const handleTrackValidation = async (track: Track) => {
  const response = await runAddPendingTrack(props.playlistId, track)

  switch (response.result) {
    case PendingAddResult.VOTING:
      toast.showSuccess('Votre musique est soumise au vote du public')
      break
    case PendingAddResult.ON_HOLD:
      toast.showSuccess('Votre musique est en file d\'attente')
      break
    case PendingAddResult.MISSING:
      toast.showSuccess('Votre musique est en attente d\'un adversaire')
      break
    case PendingAddResult.LIMIT_REACH:
      toast.showError('Vous avez atteint le nombre maximum de musiques à soumettre')
      break
  }

  closeModal()
}

const closeModal = () => {
  emit('update:isOpen', false)
  emit('proceedResult', null)
}
</script>

<template>
  <UModal :model-value="isOpen" @update:model-value="closeModal">
    <div class="p-4">
      <div class="relative flex flex-grow">
        <p class="mx-auto font-bold text-3xl">Résultat de la recherche</p>

        <UButton
          variant="ghost"
          icon="i-tabler-x"
          color="black"
          size="xl"
          class="absolute top-0 right-0"
          @click="closeModal"
        />
      </div>

      <div
        v-for="item in props.foundTracks"
        :key="item.trackId"
        class="mt-2 mx-2"
      >
        <TrackInfoCard
          :track="item"
          @track-validation="handleTrackValidation"
        />
      </div>
    </div>
  </UModal>
</template>

<style scoped></style>
