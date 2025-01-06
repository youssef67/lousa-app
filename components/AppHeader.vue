<script setup lang="ts">
const isSlideOverOpen = ref(false)
const authenticationStore = useAuthenticationStore()
const sessionStore = useSessionStore()
const { pushAdmin } = useSpecialRouter()


const onMenuOptionClick = async () => {
  isSlideOverOpen.value = false

  authenticationStore.proceedLoginClick()
}
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink :to="'/'" :aria-label="'lousa.one logo'">
        <UIcon name="my-icon:logo-name" size="40" mode="svg" />
      </NuxtLink>
      <div class="hidden lg:flex">
        <UButton
          :label="'Mon histoire'"
          variant="ghost"
          color="black"
          class="hidden lg:flex"
        />
      </div>
      <div class="hidden lg:flex">
        <UButton
          :label="'Comment ça marche ?'"
          variant="ghost"
          color="black"
          class="hidden lg:flex"
        />
      </div>
    </template>
    <template #right>
      <div class="hidden lg:flex">
        <div v-if="sessionStore.isAdmin()">
          <UButton
          label="Admin"
          icon="i-tabler-user"
          color="secondary"
          class="hidden lg:flex"
          @click="() => pushAdmin()"
        />
        </div>
        <UButton
          :label="authenticationStore.accountButtonLabel()"
          icon="i-tabler-user"
          color="secondary"
          class="hidden lg:flex"
          @click="onMenuOptionClick()"
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
      <div class="p-4 flex-1 flex-col space-y-4">
        <UButton
          label="Mon histoire"
          variant="ghost"
          color="black"
          class="flex pt-6"
        />
        <UButton
          :label="authenticationStore.accountButtonLabel()"
          icon="i-tabler-user"
          color="secondary"
          class="flex"
          @click="onMenuOptionClick()"
        />
      </div>
    </div>
  </USlideover>
</template>
