<script lang="ts" setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const inputText = ref(null)
const playlistName = ref('')
const loading = ref(false)
const emit = defineEmits(['update:isOpen', 'proceedResult'])
const toast = useSpecialToast()


const { runCreatePlaylist } = useStreamerRepository()
const { handleError } = useSpecialError()

const updateIsOpen = (value: boolean) => {
  emit('update:isOpen', value)
  if (!value) {
    emit('proceedResult')
  }
}

async function onCreateClick() {
  loading.value = true
  try {
    const newPlaylist = await runCreatePlaylist(playlistName.value)
    toast.showSuccess('Playlist créée avec succès')
    emit('proceedResult', newPlaylist.playlist)
  } catch (error) {
    handleError(error)
  } finally {
    loading.value = false
  }
}

watch(
  () => props.isOpen,
  newVal => {
    if (newVal) {
      nextTick(() => {
        inputText.value.$refs.input.focus()
      })
    }
  }
)
</script>

<template>
  <UModal :model-value="isOpen" @update:model-value="updateIsOpen">
    <div class="p-4">
      <div class="relative flex flex-grow">
        <p class="mx-auto font-bold text-3xl">Créer une playlist</p>
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
        <UInput
          ref="inputText"
          v-model="playlistName"
          input-text
          type="text"
          :placeholder="'Saisissez le nom de votre playlist'"
          required
          size="xl"
          icon="i-tabler-mail"
          autocomplete="off"
          class="flex mt-12"
        />

        <UButton
          label="Créer la playlist"
          :block="true"
          variant="solid"
          size="xl"
          color="secondary"
          class="flex"
          @click="onCreateClick()"
        />
      </div>
    </div>
  </UModal>
</template>

<style scoped></style>
