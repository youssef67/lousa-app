<script lang="ts" setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  amountCurrency: {
    type: Number,
    required: true
  }
})

console.log('SpecialLikeModal', props)

const emit = defineEmits(['update:isOpen', 'proceedResult'])
const sessionStore = useSessionStore()

const amount = ref(0)
const totalCurrency = ref(sessionStore.session.user.amountVirtualCurrency)
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
    emit('proceedResult', amount.value)
  } finally {
    loading.value = false
  }
}

const setZero = () => {
  amount.value = 0
}

const setMax = () => {
  amount.value = totalCurrency.value
}

const setHalf = () => {
  amount.value = Math.floor(totalCurrency.value / 2)
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
        <p>Crédit disponible : {{ props.amountCurrency }} Louz</p>

        <div class="flex gap-4 justify-center">
          <UButton label="Zero" @click="setZero" />
          <UButton label="Max" @click="setMax" />
          <UButton label="Moitié" @click="setHalf" />
        </div>

        <div class="flex flex-col items-center gap-4">
          <input
            type="range"
            min="0"
            :max="totalCurrency"
            v-model="amount"
            class="w-full accent-purple-600"
          />
          <UInput
            type="number"
            :max="totalCurrency"
            min="0"
            v-model="amount"
            class="w-full text-center rounded px-2 py-1"
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
          :loading="loading"
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
