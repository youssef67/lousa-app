<script lang="ts" setup>
import type { TracksVersus, VersusTrack } from '~/types/playlist.type'

const props = defineProps({
  currentTracksVersus: {
    type: Object as PropType<TracksVersus>,
    required: true,
  },
  handleSearchTrack: {
    type: Function as PropType<(trackName: string) => Promise<void>>,
    required: true,
  },
})
const isOpenSpecialLikeModal = ref(false)
const { runLikeTrack, runSpecialLikeTrack } = usePlaylistRepository()
const sessionStore = useSessionStore()
const targetTrack = ref(0)
const firstTrack = ref<VersusTrack>(props.currentTracksVersus.firstTrack)
const secondTrack = ref<VersusTrack>(props.currentTracksVersus.secondTrack)
const isComplete = ref<boolean>(props.currentTracksVersus.isComplete)
const emit = defineEmits(['updateTracks', 'updateAll'])
const { showSuccess, showError } = useSpecialToast()

const proceedResult = async (amount: number) => {
  isOpenSpecialLikeModal.value = false

  if (amount !== undefined && targetTrack.value !== 0) {
    const response = await runSpecialLikeTrack(
      props.currentTracksVersus.id,
      targetTrack.value,
      amount
    )

    if (response) {
      sessionStore.updateSessionVirtualCurrency(response.user.amountVirtualCurrency)
      showSuccess('Merci pour votre vote et votre soutien à votre streamer !')
    }
  }

  targetTrack.value = 0
}

const proceedSpecialLike = async (index: number) => {
  targetTrack.value = index
  isOpenSpecialLikeModal.value = true
}

const proceedEndCountDown = async () => {
  emit('updateAll')
}

const proceedLike = async (trackId: string, targetTrack: number) => {
  const response = await runLikeTrack(props.currentTracksVersus.id, trackId, targetTrack)

  if (response) {
    showSuccess('Merci pour votre vote et votre soutien à votre streamer !')
  } else {
    showError("Une erreur est survenue lors de l'envoi de votre vote.")
  }
}

watch(
  () => props.currentTracksVersus,
  newVersus => {
    firstTrack.value = { ...newVersus.firstTrack }
    secondTrack.value = { ...newVersus.secondTrack }
    isComplete.value = newVersus.isComplete
  },
  { immediate: true }
)
</script>

<template>
  <div
    class="left-4 right-4 bg-gray-900 bg-opacity-90 p-3 shadow-lg border-t border-gray-800 rounded-lg"
  >
    <!-- Versus section -->
    <div class="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-10">
      <!-- Card 1 -->
      <TrackVersusCard
        :indexTrack="1"
        :track="firstTrack"
        :isComplete="isComplete"
        :isStreamer="false"
        @proceedSpecialLike="proceedSpecialLike"
        @proceedLike="proceedLike"
        class="w-full md:w-1/3"
      />

      <!-- Countdown -->
      <CountDown
        :closing-date="props.currentTracksVersus.closingDate"
        :tracks-versus-id="props.currentTracksVersus.id"
        class="w-20 h-20 flex-shrink-0"
        @endCountDown="proceedEndCountDown"
      />

      <!-- Card 2 -->
      <TrackVersusCard
        :indexTrack="2"
        :track="secondTrack"
        :isComplete="isComplete"
        :isStreamer="false"
        @proceedSpecialLike="proceedSpecialLike"
        @proceedLike="proceedLike"
        class="w-full md:w-1/3"
      />
    </div>

    <!-- Modal -->
    <SpecialLikeModal
      :is-open="isOpenSpecialLikeModal"
      :amountCurrency="sessionStore.session.user.amountVirtualCurrency"
      @proceed-result="proceedResult"
    />
  </div>
</template>
