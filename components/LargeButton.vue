<script lang="ts" setup>
import type { PropType } from 'vue';
import type { LargeButtonData } from '~~/types/button.type'

const props = defineProps( {
  data: {
    type: Object as PropType<LargeButtonData>,
    required: true
  },
  onClick: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div
    class="flex dark:bg-lousa-input-bg-dark bg-lousa-input-bg-light text-black rounded-xl p-4 gap-2 cursor-pointer shadow-md"
    @click="props.onClick()"
  >
    <UIcon
      :name="props.data.icon"
      class="text-2xl shrink-0"
    />
    <div class="">
      <div class="font-semibold">
        {{ data.line1 }}
      </div>
      <div class="font-regular text-sm">
        {{ data.line2 }}
      </div>
    </div>
  </div>
</template>