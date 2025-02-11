<script setup lang="ts">
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const nameStreamer = ref(null)
const loading = ref(false)
const streamerNotFound = ref('')
const { runAddStreamer } = useTwitchRepository()
const toast = useSpecialToast()
const { handleError } = useSpecialError()
const emit = defineEmits(['update:isOpen', 'proceedResult'])

const updateIsOpen = (value: boolean) => {
  emit('update:isOpen', value)
  if (!value) {
    emit('proceedResult', value)
  }
}

async function onAddStreamerClick() {
  loading.value = true
  streamerNotFound.value = ''
  try {
    const response = await runAddStreamer(nameStreamer.value)

    if (response) {
      toast.showSuccess('Le streamer a bien été ajouté')
      emit('proceedResult', false)
    } else {
      streamerNotFound.value = 'Streamer non trouvé'
    }
  } catch (error) {
    handleError(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UModal :model-value="isOpen" @update:model-value="updateIsOpen" class="p-4">
    <div class="p-4">
      <div class="relative flex flex-grow">
        <p class="mx-auto font-bold text-3xl">Ajouter le streamer</p>
        <UButton
          variant="ghost"
          icon="i-tabler-x"
          color="black"
          size="xl"
          class="absolute top-0 right-0"
          @click="updateIsOpen(false)"
        />
      </div>
      
      <div id="content" class="flex flex-col w-full gap-6">
        <UInput
          ref="inputText"
          v-model="nameStreamer"
          input-text
          :placeholder="'Indiquez le nom du streamer'"
          required
          size="xl"
          icon="i-tabler-user"
          autocomplete="off"
          class="flex mt-12"
        />
        <p v-if="streamerNotFound" class="text-red-500 text-sm mt-2">
          {{ streamerNotFound }}
        </p>
        <UButton
          label="Valider"
          :block="true"
          variant="solid"
          size="xl"
          color="secondary"
          class="flex"
          @click="onAddStreamerClick()"
        />
      </div>
    </div>
  </UModal>
</template>


