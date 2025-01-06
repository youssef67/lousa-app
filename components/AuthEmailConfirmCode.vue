<script setup lang="ts">
import type { PropType } from 'vue'
import { AuthType, ConfirmResult } from '~/utils/auth/AuthResult'

const authenticationStore = useAuthenticationStore()
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  authType: {
    type: Number as PropType<AuthType>,
    required: true
  }
})

const loading = ref(false)
const opt = ref('')

const emit = defineEmits(['update:isOpen', 'proceedResult'])

const updateIsOpen = (value) => {
  emit('update:isOpen', value)
  if (!value) {
    emit('proceedResult', ConfirmResult.CANCELLED)
  }
}

const { runSignUpEmailConfirm, runLoginEmailConfirm } = useAuthRepository()
const { newError, handleError } = useSpecialError()

async function proceedValidate() {
  loading.value = true

  try {
    if (opt.value.length !== 5) {
      throw newError('ERROR_INVALID_DATA', 'AECC-1')
    }
    if (props.authType == AuthType.EMAIL_LOGIN) {
      await runLoginEmailConfirm(opt.value)
    } else if (props.authType == AuthType.EMAIL_SIGNUP) {
      await runSignUpEmailConfirm(opt.value)
    } else {
      throw newError('ERROR_INVALID_DATA', 'AECC-2')
    }
    emit('proceedResult', ConfirmResult.GO_TO_SUCCESS)
    authenticationStore.clearAuth()
  } catch (err) {
    handleError(err)
  }
  loading.value = false
}

async function proceedRetry() {
  emit('proceedResult', ConfirmResult.GO_TO_RESEND)
}

const onOTPComplete = (value: string) => {
  opt.value = value
}
</script>

<template>
  <UModal
    :model-value="isOpen"
    @update:model-value="updateIsOpen"
  >
    <div class="p-4">
      <div class="relative flex flex-grow pt-3 px-3">
        <p class="mx-auto font-bold text-3xl">
          Code de vérification
        </p>
        <UButton
          variant="ghost"
          :disabled="loading"
          icon="i-tabler-x"
          color="black"
          size="xl"
          class="absolute top-0 right-0 bottom-0"
          @click="updateIsOpen(false)"
        />
      </div>

      <p class="font-medium text-l text-center py-4">
        Saisissez le code de vérification à 5 chiffres envoyé à {{ authenticationStore.auth?.email }}  
      </p>
      <OTPInput
        class="mx-auto"
        @handle-on-complete="onOTPComplete"
      />
      <div
        id="content"
        class="flex flex-col w-full py-6 gap-6 px-5"
      >
        <UButton
          label="Valider"
          :loading="loading"
          variant="solid"
          :block="true"
          size="xl"
          color="secondary"
          class="flex mt-6"
          @click="proceedValidate()"
        />

        <UButton
          label="Je n'ai pas reçu le demande? Demandez un nouveau"
          :disabled="loading"
          :block="true"
          variant="ghost"
          size="xl"
          color="black"
          class="flex"
          @click="proceedRetry()"
        />
      </div>
    </div>
  </UModal>
</template>

<style scoped></style>
