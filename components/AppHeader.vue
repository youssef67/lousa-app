<script setup lang="ts">
import { computed, ref } from 'vue'

const isSlideOverOpen = ref(false)
const authenticationStore = useAuthenticationStore()
const sessionStore = useSessionStore()
const { pushAdmin, pushBuyLouz } = useSpecialRouter()

// Vérification si l'utilisateur est admin (réactif)
const isAdmin = computed(() => sessionStore.isAdmin())

const onMenuOptionClick = async () => {
  isSlideOverOpen.value = false
  authenticationStore.proceedLoginClick()
}

const victoryPoints = computed(() => {

    return sessionStore?.session?.user?.victoryPoints.toString() + ' points'

})
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/" aria-label="lousa.one logo">
        <UIcon name="my-icon:logo-name" size="40" mode="svg" />
      </NuxtLink>
      <div class="hidden lg:flex">
        <UButton label="Mon histoire" variant="ghost" color="black" />
      </div>
      <div class="hidden lg:flex">
        <UButton label="Comment ça marche ?" variant="ghost" color="black" />
      </div>
    </template>

    <template #right>
      <div class="flex flex-wrap items-center space-x-2 lg:space-x-4">
        <UButton
          v-if="isAdmin"
          label="Admin"
          icon="i-tabler-user"
          color="secondary"
          @click="pushAdmin()"
        />

        <div class="flex space-x-2">
          <UButton v-if="sessionStore.isSessionAuthenticated()" :label="victoryPoints" variant="ghost" color="black" />
          <UButton label="Acheter des Louz" color="secondary" @click="pushBuyLouz()" />
        </div>

        <UButton
          class="hidden lg:flex"
          :label="authenticationStore.accountButtonLabel()"
          icon="i-tabler-user"
          color="secondary"
          @click="onMenuOptionClick"
        />
      </div>

      <ColorModeButton class="text-white" />
    </template>

    <template #panel-button>
      <UButton
        variant="ghost"
        icon="i-tabler-menu-2"
        color="black"
        class="font-black lg:hidden flex"
        @click="isSlideOverOpen = true"
      />
    </template>
  </UHeader>

  <USlideover v-model="isSlideOverOpen">
    <div class="p-4 flex-1 flex-col">
      <div id="content" class="flex justify-between items-center">
        <UIcon name="my-icon:logo-name" size="40" mode="svg" />
        <UButton
          variant="ghost"
          icon="i-tabler-x"
          color="black"
          class="font-black"
          @click="isSlideOverOpen = false"
        />
      </div>
      <div class="flex p-4 flex-1 flex-col">
        <UButton
          :label="authenticationStore.accountButtonLabel()"
          icon="i-tabler-user"
          color="secondary"
          @click="onMenuOptionClick"
        />
        <div class="flex flex-col mt-6">
          <UButton label="Mon histoire" variant="ghost" color="black" />
          <UButton label="Comment ça marche ?" variant="ghost" color="black" />
        </div>

        <UButton
          v-if="isAdmin"
          label="Admin"
          icon="i-tabler-user"
          color="secondary"
          @click="pushAdmin"
        />
      </div>
    </div>
  </USlideover>
</template>
