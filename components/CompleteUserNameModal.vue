<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core'
import { Subscription, Transmit } from '@adonisjs/transmit-client'
import type { TwitchCallBackTransmit } from '~/types/session.type'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['update:isOpen', 'proceedResult'])

const userName = ref('')
const config = useRuntimeConfig()
const { runLoginTwitch } = useAuthRepository()
const isUserNameValid = ref(false) // Pour gérer l'activation du bouton
const isChecking = ref(false) // Indique si la vérification est en cours
const isError = ref(false)
const ErrorMessage = ref('')
const { runCompleteProfile, runCheckUserNameAvailability } =
  useViewerRepository()

const { handleError } = useSpecialError()
const sessionStore = useSessionStore()
const { showSuccess, showError } = useSpecialToast()

const closeModal = () => {
  emit('update:isOpen', false)
}

const updateIsOpen = (value: boolean) => {
  emit('update:isOpen', value)
  if (!value) {
    emit('proceedResult', value)
  }
}

async function closeEventStream(subscription: Subscription) {
  await subscription.delete()
}

async function onCompleteClick() {
  try {
    const response = await runCompleteProfile(userName.value)

    if (response.result) {
      sessionStore.updateSessionUser(response.result)
      showSuccess('Profil complété avec succès')
      updateIsOpen(false)
    } else {
      ErrorMessage.value = 'Erreur lors de la complétion du profil'
    }
  } catch (error) {
    handleError(error)
  }
}

async function onTwitchLoginClick() {
  const transmit = new Transmit({
    baseUrl: `${config.public.siteUrl}/api/v1`
  })

  const subscription = transmit.subscription(
    `authentication/twitch/${sessionStore.session.user.id}`
  )

  await subscription.create()

  try {
    const newWindow = await runLoginTwitch()
    // Mise en place de l'écoute des messages envoyés par le serveur au moment du callback
    subscription.onMessage(async (data: TwitchCallBackTransmit) => {
      const response = await runCompleteProfile(data.displayName)

      if (response.result.userName) {
        await sessionStore.updateSessionUser(response.result)
        showSuccess('Profil complété avec succès avec votre userName Twitch')
        updateIsOpen(false)
      } else {
        isError.value = true
      }
      // // Fermeture de la page de connexion twitch et de la connextion serveur sent events
      newWindow?.close()
      await closeEventStream(subscription)
    })
  } catch (error) {
    handleError(error)
  }
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
  <UModal
    :model-value="isOpen"
    @update:model-value="emit('update:isOpen', $event)"
  >
    <div class="p-4">
      <div class="relative flex flex-grow">
        <p class="mx-auto font-bold text-3xl">Complétez votre profil</p>
        <UButton
          variant="ghost"
          icon="i-tabler-x"
          color="black"
          size="xl"
          class="absolute top-0 right-0"
          @click="closeModal()"
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
          {{ ErrorMessage }}
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
