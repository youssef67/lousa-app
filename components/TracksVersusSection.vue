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
  }
})
const isOpenSpecialLikeModal = ref(false)
const { runLikeTrack, runSpecialLikeTrack } = usePlaylistRepository()
const sessionStore = useSessionStore()
const trackName = ref('')
const targetTrack = ref(0)
const firstTrack = ref<VersusTrack>(props.currentTracksVersus.firstTrack)
const secondTrack = ref<VersusTrack>(props.currentTracksVersus.secondTrack)
const emit = defineEmits(['updateTracks', 'updateAll'])

const proceedResult = async (amount: number) => {
  isOpenSpecialLikeModal.value = false

  if (amount !== undefined && targetTrack.value !== 0) {
    await runSpecialLikeTrack(props.currentTracksVersus.id, targetTrack.value, amount)
  }

  targetTrack.value = 0
}

const proceedSpecialLike = async (track: number) => {
  targetTrack.value = track
  isOpenSpecialLikeModal.value = true
}

const proceedEndCountDown = async () => {
  console.log('🎯 End countdown reçu dans TracksVersusSection')
  emit('updateAll')
}

const proceedLike = async (trackId: string, targetTrack: number) => {
  await runLikeTrack(props.currentTracksVersus.id, trackId, targetTrack)
}

watch(
  () => props.currentTracksVersus,
  newVersus => {
    firstTrack.value = { ...newVersus.firstTrack }
    secondTrack.value = { ...newVersus.secondTrack }
  },
  { immediate: true }
)


</script>

<template>
  <div v-if="!firstTrack.trackId || !secondTrack.trackId">
     <UInput
        ref="inputText"
        v-model="trackName"
        input-text
        type="text"
        :placeholder="'Saisissez le nom de musique'"
        required
        size="xl"
        icon="i-tabler-music-heart"
        autocomplete="off"
      />
      <UButton
        label="Rechercher"
        variant="solid"
        size="xl"
        color="secondary"
        class="flex"
        @click="props.handleSearchTrack(trackName)"
      />
  </div>
  <div class="left-4 right-4 bg-gray-900 bg-opacity-90 p-3 shadow-lg border-t border-gray-800 rounded-lg">
    <!-- Versus section -->
    <div class="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-10">
      <!-- Card 1 -->
      <TrackVersusCard
        :indexTrack="1"
        :track="firstTrack"
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
        @proceedSpecialLike="proceedSpecialLike"
        @proceedLike="proceedLike"
        class="w-full md:w-1/3"
      />
    </div>

    <!-- Progress Bar -->
    <ProgressBar :currentTracksVersus="currentTracksVersus" class="mt-6" />

    <!-- Modal -->
    <SpecialLikeModal
      :is-open="isOpenSpecialLikeModal"
      :amountCurrency="sessionStore.session.user.amountVirtualCurrency"
      @proceed-result="proceedResult"
    />
  </div>
</template>

