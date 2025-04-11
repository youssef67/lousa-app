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
    default: null
  },
})

const track = ref<VersusTrack>(props.track)
const animate = ref(false)
const emit = defineEmits(['proceedSpecialLike', 'proceedLike'])


const sessionStore = useSessionStore()

const SetSpecialLike = (track: number) => {
  animate.value = true
  setTimeout(() => (animate.value = false), 200)
  emit('proceedSpecialLike', track)
}

const likeTrack = async (trackId: string, targetTrack: number) => {
  emit('proceedLike', trackId, targetTrack)
}

watch(
  () => props.track,
  newTrack => {
    if (newTrack) {
      track.value = newTrack
    }
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="track.trackId" class="flex-1 text-center">
    Proposé par
    <span class="text-white">{{ track.user.userName }}</span>
    <img
      :src="track.cover"
      alt="Cover 1"
      class="w-16 h-16 mx-auto rounded-md shadow-md mt-2"
    />
    <h4 class="text-white text-xs font-semibold mt-1">
      {{ track.trackName }}
    </h4>
    <p class="text-gray-400 text-xs">
      {{ track.artistName }}
    </p>
    <div class="text-green-400 text-sm font-bold">
      {{ track.scoreAndLikes.trackScore }} pts
    </div>

    <!-- Vote button -->
    <div class="flex flex-row justify-center items-center gap-2 mt-2">
      <div v-if="sessionStore.session.user.id === track.user.id">
        <UButton
          :class="['p-1 rounded-full transition duration-200', animate ? 'scale-105' : 'scale-100']"
          icon="i-tabler-music-up"
          :label="`Utiliser des louz - ${track.scoreAndLikes.specialLike}`"
          @click="SetSpecialLike(1)"
        />
      </div>
      <div v-else>
        <div v-if="track.scoreAndLikes.specialLike > 0">
          <UButton
            class="p-1 rounded-full heartbeat"
            icon="i-tabler-flame"
            color="pink"
            variant="soft"
          >
            Coup spécial reçu 💖
          </UButton>
        </div>
      </div>

      <UButton
        class="p-1 rounded-full"
        icon="i-tabler-music-heart"
        @click="likeTrack(track.trackId, props.indexTrack)"
      >
        {{ track.scoreAndLikes.nbLikes }} likes /
        {{ track.scoreAndLikes.alreadyLiked ? 'Déjà liké' : 'Liker la musique' }}
      </UButton>
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
