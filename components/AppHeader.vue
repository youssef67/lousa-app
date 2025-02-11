<script setup lang="ts">
import { computed, ref } from 'vue'

const isSlideOverOpen = ref(false)
const authenticationStore = useAuthenticationStore()
const sessionStore = useSessionStore()
const { pushAdmin } = useSpecialRouter()

// Vérification si l'utilisateur est admin (réactif)
const isAdmin = computed(() => sessionStore.isAdmin())

const onMenuOptionClick = async () => {
  isSlideOverOpen.value = false
  authenticationStore.proceedLoginClick()
}
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
      <div class="hidden lg:flex space-x-4">
        <UButton
          v-if="isAdmin"
          label="Admin"
          icon="i-tabler-user"
          color="secondary"
          @click="pushAdmin"
        />
        <UButton
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
      <div class="flex p-4 flex-1 flex-col space-y-4">
        <UButton label="Mon histoire" variant="ghost" color="black" class="flex pt-6" />
        <UButton
          :label="authenticationStore.accountButtonLabel()"
          icon="i-tabler-user"
          color="secondary"
          @click="onMenuOptionClick"
        />
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
