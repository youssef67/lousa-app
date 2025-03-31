<script lang="ts" setup>
import type { UserSession } from '~/types/session.type'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
  // user: {
  //   type: Object as PropType<UserSession>,
  //   required: true
  // }
})

const emit = defineEmits(['update:isOpen', 'proceedResult'])

const amount = ref(25)
const loading = ref(false)

const updateIsOpen = (value: boolean) => {
  emit('update:isOpen', value)
  if (!value) {
    emit('proceedResult')
  }
}

const onSubmitClick = async () => {
  loading.value = true
  try {
    // emit('submit', amount.value)
    // emit('update:isOpen', false)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UModal :model-value="isOpen" @update:model-value="updateIsOpen">
    <div class="p-4">
      <div class="relative flex flex-grow">
        <p class="mx-auto font-bold text-3xl">
          Choisis combien de Louz utiliser
        </p>
        <UButton
          variant="ghost"
          icon="i-tabler-x"
          color="black"
          size="xl"
          class="absolute top-0 right-0"
          @click="updateIsOpen(false)"
        />
      </div>
      <div id="content" class="flex flex-col w-full py-6 gap-6">
        <div class="flex flex-col items-center gap-4">
          <input
            type="range"
            min="0"
            max="50"
            v-model="amount"
            class="w-full accent-purple-600"
          />
          <div class="text-lg font-medium">🎯 {{ amount }} Louz</div>
        </div>

        <UButton
          label="Valider ce montant"
          :block="true"
          variant="solid"
          size="xl"
          color="secondary"
          class="flex"
          @click="onSubmitClick()"
        />
      </div>
    </div>
  </UModal>
</template>

<style scoped>
input[type='range'] {
  height: 6px;
  border-radius: 9999px;
}
</style>
