<script lang="ts" setup>
import type { SpaceStreamerProfile } from '~/types/streamer.type.js'

const props = defineProps<{ spaceStreamer: SpaceStreamerProfile }>()
const { pushSpaceStreamerForViewer } = useSpecialRouter()
const toast = useSpecialToast()

const goToSpaceStreamer = () => {
  if (!props.spaceStreamer.twitchUserId) {
    toast.showError('Space streamer non disponible')
    return
  }
  pushSpaceStreamerForViewer(props.spaceStreamer.id, true)
}

const isClickable = computed(() => !!props.spaceStreamer.twitchUserId)
</script>

<template>
  <div
    class="relative group"
    @click="isClickable ? goToSpaceStreamer() : null"
  >
    <div
      :class="[
        'border rounded-lg p-4 shadow-sm transition-transform transform',
        isClickable
          ? 'hover:scale-105 hover:shadow-lg cursor-pointer'
          : 'cursor-not-allowed'
      ]"
    >
      <!-- Image + overlay -->
      <div class="relative">
        <img
          :src="spaceStreamer.spaceStreamerImg"
          :alt="spaceStreamer.twitchUserLogin"
          class="w-full h-48 object-cover rounded-md"
        />
        <!-- Overlay sombre sur l'image uniquement -->
        <div
          v-if="!isClickable"
          class="absolute inset-0 bg-black bg-opacity-50 rounded-md flex items-center justify-center text-white text-sm font-semibold backdrop-blur-sm pointer-events-none"
        >
          Indisponible
        </div>
      </div>

      <!-- Texte visible même si la card est inactive -->
      <h2 class="mt-2 text-lg font-semibold">{{ spaceStreamer.twitchUserLogin }}</h2>
      <p class="text-gray-500">@{{ spaceStreamer.twitchUserLogin }}</p>
    </div>
  </div>
</template>
