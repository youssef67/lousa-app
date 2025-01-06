<script lang="ts" setup>
import { type UserSession } from '~~/types/session.type'

import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const sessionStore = useSessionStore()
const { pushMyAccount } = useSpecialRouter()
const toasts  = useSpecialToast()
const { runEditUser } = useSessionRepository()

const currentUser = ref<UserSession | null>(null)
const states = ref({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
})

const schema = z.object({
  firstName: z.string().min(1, 'Prénom trop court').optional(),
  lastName: z.string().min(1, 'Nom trop court').optional(),
  dateOfBirth: z.string().optional(), // Accepte une instance de Date
})

type Schema = z.output<typeof schema>

const isEdited = computed(() => {
  return (
    states.value.firstName !== currentUser.value?.firstName ||
    states.value.lastName !== currentUser.value?.lastName ||
    new Date(states.value.dateOfBirth).toISOString() !== new Date(currentUser.value.dateOfBirth).toISOString()
  )
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await runEditUser(event.data)
    pushMyAccount()
    toasts.showSuccess('Vos informations ont bien été mises à jour')
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  currentUser.value = sessionStore.session.user

  console.log(currentUser.value.dateOfBirth)
  if (currentUser.value) {
    states.value.firstName = currentUser.value.firstName
    states.value.lastName = currentUser.value.lastName
    states.value.dateOfBirth = currentUser.value.dateOfBirth
      ? new Date(currentUser.value.dateOfBirth).toISOString()
      : null
  }
})
</script>

<template>
  <UContainer>
    <div class="text-4xl font-medium w-full mb-10">Mes informations</div>
    <UForm
      :schema="schema"
      :state="states"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup label="Prénom" name="firstName" class="text-lg">
        <UInput v-model="states.firstName" />
      </UFormGroup>
      <UFormGroup label="Nom" name="lastName">
        <UInput v-model="states.lastName" />
      </UFormGroup>

      <UFormGroup label="Date de naissance" name="dateOfBirth">
        <VueDatePicker
          v-model="states.dateOfBirth"
          :enable-time-picker="false"
          locale="fr"
          format="dd/MM/yyyy" 
          model-type="iso"
          cancelText="Annuler"
          selectText="Confirmer"
          position="left"
          class="datePicker"
        />
      </UFormGroup>

      <UButton
        type="submit"
        variant="solid"
        size="xl"
        color="secondary"
        :disabled="!isEdited"
      >
        Valider
      </UButton>
    </UForm>
  </UContainer>
</template>

<style scoped>
.datePicker {
  --dp-background-color: rgb(223 238 255 / var(--tw-bg-opacity));
  --dp-border-radius: 0.5rem;
  --dp-icon-color: #000000;
  --dp-selected-background-color: var(--dp-primary-color);
  --dp-primary-color: #d0383a;
}

.dp__today {
  border: 1px solid #d0383a !important;
}
</style>
