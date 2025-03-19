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

</script>

<template>
  <div 
    class="border rounded-lg p-4 shadow-sm transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
    @click="goToSpaceStreamer"
  >
    <img 
      :src="spaceStreamer.spaceStreamerImg" 
      :alt="spaceStreamer.twitchUserLogin" 
      class="w-full h-48 object-cover rounded-md"
    />
    <h2 class="mt-2 text-lg font-semibold">{{ spaceStreamer.twitchUserLogin }}</h2>
    <p class="text-gray-500">@{{ spaceStreamer.twitchUserLogin }}</p>
  </div>
</template>
