<script lang="ts" setup>

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:isOpen', 'proceedResult'])

const { pushHome } = useSpecialRouter()
const { runLogout } = useSessionRepository()
const { runSignUpAnonymous } = useAuthRepository()
const { handleError } = useSpecialError()
const toast = useSpecialToast()

const updateIsOpen = (value: boolean) => {
  emit('update:isOpen', value)
  if (!value) {
    emit('proceedResult')
  }
}

async function onLoginClick() {
  try {
    await runLogout()
    await runSignUpAnonymous()
  } catch (error) {
    handleError(error)
  } finally {
    updateIsOpen(false)
    pushHome()
    toast.showSuccess('Vous êtes déconnecté avec succès')
  }
}


</script>

<template>
  <UModal :model-value="isOpen" @update:model-value="updateIsOpen">
    <div class="p-4">
      <div class="flex">
        <div>
          <h2 class="mx-auto font-bold text-3xl mb-4">Se déconnecter</h2>
          <p>Êtes-vous sur de vouloir deconnecter votre compte</p>
        </div>
        
        <UButton
          variant="ghost"
          icon="i-tabler-x"
          color="black"
          size="xl"
          class="absolute top-0 right-0"
          @click="updateIsOpen(false)"
        />
      </div>

      <div id="content" class="flex flex-row w-full py-6 justify-center">
        <UButton
          label="Valider"
          variant="solid"
          size="xl"
          color="secondary"
          class="flex justify-center items-center text-center mr-2"
          @click="onLoginClick()"
        />
        <UButton
          label="Annuler"
          variant="solid"
          size="xl"
          color="secondary"
          class="flex justify-center items-center text-center"
          @click="updateIsOpen(false)"
        />
      </div>
    </div>
  </UModal>
</template>

<style scoped></style>
