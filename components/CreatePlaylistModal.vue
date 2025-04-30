<script lang="ts" setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})

const inputText = ref(null)
const playlistName = ref('')
const loading = ref(false)
const onlyFollowers = ref(true)
const maxRankedTracks = ref(10)

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
    // 👇 Tu peux passer onlyFollowers et maxRankedTracks ici si besoin
    console.log('onlyFollowers', onlyFollowers.value)
    console.log('maxRankedTracks', maxRankedTracks.value)

    const response = await runCreatePlaylist(playlistName.value, onlyFollowers.value, maxRankedTracks.value)
    toast.showSuccess('Playlist créée avec succès')
    emit('proceedResult', response.playlistCreated)
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
          icon="i-tabler-playlist"
          autocomplete="off"
          class="flex mt-12"
        />

        <!-- Switch: followers only -->
        <div class="flex items-center justify-between">
          <label class="text-lg font-medium">Réservée aux followers</label>
          <UToggle v-model="onlyFollowers" />
        </div>

        <!-- Input: max ranked tracks -->
        <div class="flex flex-col gap-1">
          <label for="max-ranked-tracks" class="text-lg font-medium"
            >Nombre maximal de musiques classées</label
          >
          <UInput
            id="max-ranked-tracks"
            v-model="maxRankedTracks"
            type="number"
            :min="1"
            :placeholder="'Ex: 20'"
            size="xl"
            icon="i-tabler-list-numbers"
            class="flex"
          />
        </div>

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
