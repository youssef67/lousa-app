<script setup lang="ts">
import type { BroadcastTrack } from '~/types/playlist.type'
import goldCrown from '~/assets/images/gold-crown.webp'
import silverCrown from '~/assets/images/silver-crown.webp'
import bronzeCrown from '~/assets/images/bronze-crown.webp'

const props = defineProps<{
  track: BroadcastTrack
}>()

const delay = ref(props.track.position * 100)

const sessionStore = useSessionStore()
const userId = ref(sessionStore.session.user.id)

const isOwner = computed(() => props.track.user.id === userId.value)

const crownImage = computed(() => {
  if (props.track.position === 1) return goldCrown
  if (props.track.position === 2) return silverCrown
  if (props.track.position === 3) return bronzeCrown
  return null
})

const playTrack = () => {
  window.open(props.track.url, '_blank')
}

onMounted(async () => {
  if (isOwner.value) {
    await nextTick()
  }
})
</script>

<template>
  <div class="relative">
    <div v-if="isOwner" class="absolute inset-0 z-0">
      <span
        v-for="i in 20"
        :key="i"
        :class="`particle-${track.playlistTrackId}`"
      ></span>
    </div>

    <!-- Track avec bordure personnalisée -->
    <div
      v-motion
      :initial="{ opacity: 0, y: 100 }"
      :enter="{ opacity: 1, y: 0, scale: 1 }"
      :hovered="{ scale: 1.02 }"
      :delay="delay"
      :duration="100"
      :class="[
        'relative z-10 flex items-center gap-4 py-3 px-4 rounded-lg transition duration-200',
        isOwner
          ? 'border-2 border-yellow-400 shadow-yellow-500/50 shadow-lg'
          : 'bg-gray-900 hover:bg-gray-800'
      ]"
    >
      <!-- Crown -->
      <div class="w-20 h-20 flex flex-col items-center justify-center">
        <img
          v-if="crownImage"
          :src="crownImage"
          alt="Crown"
          class="w-16 h-16 rounded-lg object-cover"
        />
        <div
          v-else
          class="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center"
        >
          <span class="text-gray-400 text-sm font-bold"
            >#{{ track.position }}</span
          >
        </div>
        <span class="text-xs text-gray-400 mt-1">Score: {{ track.score }}</span>
        <span class="text-xs text-gray-400 mt-1"
          >Louz: {{ track.specialScore }}</span
        >
      </div>

      <!-- Cover -->
      <img
        :src="track.cover"
        alt="Cover"
        class="w-16 h-16 rounded-md object-cover"
      />

      <!-- Infos -->
      <div class="flex-1">
        <h3 class="text-lg font-medium text-white">{{ track.trackName }}</h3>
        <p class="text-gray-400 text-sm">{{ track.artistName }}</p>
        <p class="text-gray-500 text-xs">
          Ajouté par <span class="text-white">{{ track.user.userName }}</span>
        </p>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <UButton
          icon="i-tabler-play"
          variant="ghost"
          size="sm"
          class="text-white hover:text-green-400"
          @click="playTrack"
        />
      </div>
    </div>
  </div>
</template>
