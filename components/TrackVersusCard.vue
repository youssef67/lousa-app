<script lang="ts" setup>
import type { VersusTrack } from '~/types/playlist.type'

const props = defineProps({
  indexTrack: {
    type: Number,
    required: true,
  },
  track: {
    type: Object as PropType<VersusTrack | null>,
    required: false,
    default: null,
  },
  isComplete: {
    type: Boolean,
    required: false,
  },
})

const baseBtnClass = 'w-full md:w-[220px] p-2 rounded-full text-sm transition duration-200'
const track = ref<VersusTrack>(props.track)
const isComplete = ref<boolean>(props.isComplete)
const animate = ref(false)
const emit = defineEmits(['proceedSpecialLike', 'proceedLike'])

const sessionStore = useSessionStore()

const playTrack = () => {
  window.open(props.track.url, '_blank')
}

const SetSpecialLike = () => {
  animate.value = true
  setTimeout(() => (animate.value = false), 200)
  emit('proceedSpecialLike', props.indexTrack)
}

const likeTrack = async (trackId: string, targetTrack: number) => {
  emit('proceedLike', trackId, targetTrack)
}

const alreadyLiked = computed(() => {
  const userId = sessionStore.session?.user?.id

  if (track.value) {
    return track.value?.scoreAndLikes?.listOfUserIdWhoLiked?.includes(userId)
  }
})

const nbLikes = computed(() => {
  if (track.value) {
    return track.value?.scoreAndLikes?.listOfUserIdWhoLiked?.length
  } else {
    return 0
  }
})

watch(
  () => props.track,
  newTrack => {
    if (newTrack) {
      track.value = newTrack
    }
  },
  { immediate: true }
)

watch(
  () => props.isComplete,
  newIsComplete => {
    isComplete.value = newIsComplete
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="track.trackId" class="flex-1 text-center">
    Proposé par
    <span class="text-white">{{ track.user.userName }}</span>
    <img :src="track.cover" alt="Cover 1" class="w-16 h-16 mx-auto rounded-md shadow-md mt-2" />
    <h4 class="text-white text-xs font-semibold mt-1">
      {{ track.trackName }}
    </h4>
    <p class="text-gray-400 text-xs">
      {{ track.artistName }}
    </p>
    <div class="text-green-400 text-sm font-bold">{{ track.scoreAndLikes.trackScore }} pts</div>
    <div class="text-green-400 text-sm font-bold">
      {{ track.scoreAndLikes.listOfUserIdWhoLiked.length }} like
    </div>
    <div
      class="text-green-400 text-sm font-bold"
      v-if="sessionStore.session.user.id === track.user.id && track.scoreAndLikes.specialLike > 0"
    >
      {{ track.scoreAndLikes.specialLike }} louz dépensés
    </div>
    <!-- Vote button -->
    <div v-if="isComplete" class="flex flex-col justify-center items-center gap-2 mt-2">
      <div v-if="sessionStore.session.user.id === track.user.id">
        <div v-if="track.scoreAndLikes.specialLike === 0">
          <UButton
            :class="[baseBtnClass, animate ? 'scale-105' : 'scale-100']"
            icon="i-tabler-music-up"
            label="Utiliser des louz"
            @click="SetSpecialLike()"
          />
        </div>
        <div v-else>
          <UButton :class="baseBtnClass" icon="i-tabler-music-up" label="Augmenter les louz" />
        </div>
      </div>
      <div v-else>
        <div v-if="track.scoreAndLikes.specialLike > 0">
          <UButton :class="baseBtnClass" icon="i-tabler-flame" color="pink" variant="soft">
            Coup spécial reçu 💖
          </UButton>
        </div>
      </div>

      <UButton
        :class="baseBtnClass"
        icon="i-tabler-music-heart"
        @click="likeTrack(track.trackId, props.indexTrack)"
        :disabled="alreadyLiked"
      >
        {{ alreadyLiked ? 'Déjà liké' : 'Liker la musique' }}
      </UButton>
      <UButton
        :class="baseBtnClass"
        icon="i-tabler-play"
        size="sm"
        label="Écouter la musique"
        @click="playTrack"
      />
    </div>
  </div>
  <div v-else class="flex-1 text-center">
    <p>En attente d'une musique</p>
  </div>
</template>

<style scoped>
@keyframes heartbeat {
  0%,
  100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.02);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.02);
  }
}

.heartbeat {
  animation: heartbeat 1s infinite;
}
</style>
