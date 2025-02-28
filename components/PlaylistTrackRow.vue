<script lang="ts" setup>
import type { PlaylistTrack } from '~/types/viewer.type'

const props = defineProps<{
  track: PlaylistTrack
}>()

const emit = defineEmits(['play', 'favorite'])
</script>

<template>
  <div class="flex items-center gap-4 py-3 px-4 hover:bg-gray-800 rounded-lg transition duration-200">
    <!-- Cover -->
    <img
      :src="track.cover"
      alt="Cover"
      class="w-16 h-16 rounded-md object-cover"
    />

    <!-- Info Track -->
    <div class="flex-1">
      <h3 class="text-lg font-medium">{{ track.trackName }}</h3>
      <p class="text-gray-400 text-sm">{{ track.artistName }}</p>
      <p>ajouté par {{ track.user.userName }}</p>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-3">
      <UButton
        icon="i-tabler-play"
        variant="ghost"
        size="sm"
        class="text-white hover:text-green-400"
        @click="emit('play', track)"
      />
      <UButton
        icon="i-tabler-heart"
        variant="ghost"
        size="sm"
        class="text-white hover:text-red-500"
        @click="emit('favorite', track)"
      />
      <UButton
        icon="i-tabler-dots"
        variant="ghost"
        size="sm"
        class="text-white hover:text-gray-300"
      />
    </div>
  </div>
</template>
