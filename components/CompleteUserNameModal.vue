<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['update:isOpen', 'proceedResult'])

const userName = ref('')
const isUserNameValid = ref(false) // Pour gérer l'activation du bouton
const isChecking = ref(false) // Indique si la vérification est en cours
const isError = ref(false)
const { runCompleteProfile, runCheckUserNameAvailability } =
  useViewerRepository()

const { handleError } = useSpecialError()
const sessionStore = useSessionStore()
const { showSuccess, showError } = useSpecialToast()

const updateIsOpen = (value: boolean) => {
  emit('update:isOpen', value)
  if (!value) {
    emit('proceedResult')
  }
}

async function onCompleteClick() {
  try {
    const response = await runCompleteProfile(userName.value)

    if (response.result) {
      sessionStore.updateSessionUser(response.result)
      showSuccess('Profil complété avec succès')
    } else {
      showError("Erreur lors de l'ajout du titre")
    }
    updateIsOpen(false)
  } catch (error) {
    handleError(error)
  }
}

async function onTwitchLoginClick() {
  updateIsOpen(false)
}

// Fonction de vérification de l'username (simulée)
const validateUserName = async () => {
  if (!userName.value.trim()) {
    isUserNameValid.value = false
    return
  }

  isChecking.value = true
  try {
    // Simule une requête API qui vérifie la disponibilité du username
    const response = await runCheckUserNameAvailability(userName.value)
    isUserNameValid.value = response.result // Retourne true si dispo
    isError.value = !response.result // Affiche une erreur si indispo
  } catch (error) {
    console.error('Erreur lors de la vérification du username', error)
    isUserNameValid.value = false
  } finally {
    isChecking.value = false
  }
}

// Débounce la vérification (500ms)
const debouncedValidateUserName = useDebounceFn(validateUserName, 500)

// Surveille les changements du champ
watch(userName, () => {
  debouncedValidateUserName()
})
</script>

<template>
  <UModal :model-value="isOpen" @update:model-value="updateIsOpen">
    <div class="p-4">
      <div class="relative flex flex-grow">
        <p class="mx-auto font-bold text-3xl">Complétez votre profil</p>
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
        <div class="flex flex-col mt-12 gap-4">
          <p>
            Afin de profitez pleinement de votre expérience avec notre outil, il
            est nécessaire d'indiquer un userName
          </p>
          <p>
            Cet UserName sera visible quand une de vos playlist sera en liste
            d'attente ou mieux encore, en 1ère place d'une des playlist de votre
            streamer préféré
          </p>
          <p>
            Il est possible d'utiliser votre userName Twitch, vous serez
            rapidement reconnu par le streamer et sa commu
          </p>
        </div>

        <UInput
          ref="inputText"
          v-model="userName"
          input-text
          type="text"
          placeholder="Saisissez votre userName"
          required
          size="xl"
          icon="i-tabler-user-hexagon"
          autocomplete="off"
          class="flex mt-12"
        />
        <p v-if="isError" class="text-red-500">
          Désolé, ce UserName est déjà pris
        </p>

        <UButton
          label="Valider"
          :block="true"
          variant="solid"
          size="xl"
          color="secondary"
          class="flex"
          :disabled="!isUserNameValid || isChecking"
          @click="onCompleteClick()"
        >
          <span v-if="isChecking">Vérification...</span>
          <span v-else>Valider</span>
        </UButton>

        <div
          id="content"
          class="flex justify-center items-center align-middle flex-1 w_full gap-4"
        >
          <div class="bg-white flex flex-1 w_full h-px" />
          <span class="flex w_full">Connexion Twitch</span>
          <div class="bg-white flex flex-1 w_full h-px" />
        </div>

        <UButton
          label="Récupérer le username de Twitch"
          :block="true"
          variant="outline"
          size="xl"
          color="black"
          class="flex"
          @click="onTwitchLoginClick()"
        />
      </div>
    </div>
  </UModal>
</template>

<style scoped></style>
