<script lang="ts" setup>
import { LoginResult } from '~/utils/auth/AuthResult'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const inputText = ref(null)
const email = ref('')
const loading = ref(false)
const emit = defineEmits(['update:isOpen', 'proceedResult'])

const { runLoginEmail } = useAuthRepository()
const { handleError } = useSpecialError()

const updateIsOpen = (value: boolean) => {
  emit('update:isOpen', value)
  if (!value) {
    emit('proceedResult', LoginResult.CANCELLED)
  }
}

async function onLoginClick() {
  loading.value = true
  try {
    await runLoginEmail(email.value)
    emit('proceedResult', LoginResult.GO_TO_CONFIRM)
  } catch (error) {
    handleError(error)
  } finally {
    loading.value = false
  }
}

async function onSignUpClick() {
  emit('proceedResult', LoginResult.GO_TO_SIGN_UP)
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
        <p class="mx-auto font-bold text-3xl">Se connecter</p>
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
          v-model="email"
          input-text
          type="email"
          :placeholder="'Saisissez votre email'"
          required
          size="xl"
          icon="i-tabler-mail"
          autocomplete="off"
          class="flex mt-12"
        />

        <UButton
          label="Se connecter"
          :block="true"
          variant="solid"
          size="xl"
          color="secondary"
          class="flex"
          @click="onLoginClick()"
        />

        <div
          id="content"
          class="flex justify-center items-center align-middle flex-1 w_full gap-4"
        >
          <div class="bg-white flex flex-1 w_full h-px" />
          <span class="flex w_full">Pas encore de compte ?</span>
          <div class="bg-white flex flex-1 w_full h-px" />
        </div>

        <UButton
          :label="'S\'inscrire maintenant'"
          :block="true"
          variant="outline"
          size="xl"
          color="black"
          class="flex"
          @click="onSignUpClick()"
        />
      </div>
    </div>
  </UModal>
</template>

<style scoped></style>
