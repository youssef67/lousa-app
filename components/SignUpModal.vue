<script lang="ts" setup>
import { SignUpResult } from '~/utils/auth/AuthResult'

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const inputText = ref(null)
const email = ref('')
const loading = ref(false)
const error = ref('')

const emit = defineEmits(['update:isOpen', 'proceedResult'])

const updateIsOpen = (value: boolean) => {
  emit('update:isOpen', value)
  if (!value) {
    emit('proceedResult', SignUpResult.CANCELLED)
  }
}

const { runSignUpEmail } = useAuthRepository()
const { handleError } = useSpecialError()

async function proceedGoToLogin() {
  emit('proceedResult', SignUpResult.GO_TO_LOGIN)
}

async function proceedSignUp() {
  loading.value = true

  try {
    await runSignUpEmail(email.value)
    emit('proceedResult', SignUpResult.GO_TO_CONFIRM)
  } catch (error) {
    handleError(error)
  }

  loading.value = false
}
</script>

<template>
  <UModal :model-value="isOpen" @update:model-value="updateIsOpen">
    <div class="p-4">
      <div class="relative flex flex-grow pt-3">
        <p class="mx-auto font-bold text-3xl">
          S'inscrire
        </p>
        <UButton
          variant="ghost"
          icon="i-tabler-x"
          color="black"
          size="xl"
          :disabled="loading"
          class="absolute top-0 right-0 bottom-0"
          @click="updateIsOpen(false)"
        />
      </div>

      <div id="content" class="flex flex-col w-full py-6 gap-6 px-5">
        <UInput
          ref="inputText"
          v-model="email"
          type="email"
          :disabled="loading"
          placeholder="Votre email"
          required
          size="xl"
          icon="i-tabler-mail"
          autocomplete="off"
          class="flex mt-12 text-left"
        />
        <div v-if="error" class="lousa-error">
          {{ error }}
        </div>
        <UButton
          label="Créer un compte"
          :loading="loading"
          variant="solid"
          :block="true"
          size="xl"
          color="secondary"
          class="flex"
          @click="proceedSignUp()"
        />

        <UButton
          label="Se connecter"
          :disabled="loading"
          :block="true"
          variant="ghost"
          size="xl"
          color="black"
          class="flex"
          @click="proceedGoToLogin()"
        />
      </div>
    </div>
  </UModal>
</template>

<style></style>
