<script lang="ts" setup>
import type { Streamer } from '~/types/session.type.js'

const props = defineProps<{ streamer: Streamer }>()
const { pushSpaceStreamer } = useSpecialRouter()

const goToSpaceStreamer = () => {
  pushSpaceStreamer(props.streamer.userLogin, true)
}

</script>

<template>
  <div 
    class="border rounded-lg p-4 shadow-sm transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
    @click="goToSpaceStreamer"
  >
    <img 
      :src="streamer.thumbnailUrl" 
      :alt="streamer.userLogin" 
      class="w-full h-48 object-cover rounded-md"
    />
    <h2 class="mt-2 text-lg font-semibold">{{ streamer.userLogin }}</h2>
    <p class="text-gray-500">@{{ streamer.userLogin }}</p>
  </div>
</template>
