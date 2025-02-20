<script lang="ts" setup>
import type { Streamer } from '~/types/session.type.js'

const props = defineProps<{ spaceStreamer: Streamer }>()
const { pushSpaceStreamerForViewer } = useSpecialRouter()

const goToSpaceStreamer = () => {
  console.log('space streamer info', props.spaceStreamer.id)
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
