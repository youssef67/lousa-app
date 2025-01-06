<script lang="ts" setup>
import type { LargeButtonData } from '~~/types/button.type'

const { buildLargeButtonData } = useUiUtils()
const { refreshUserSession } = useSessionRepository()
const { handleError } = useSpecialError()
const sessionStore = useSessionStore()

const { 
  pushEditProfile,
  pushManageStreamer,
  pushSetting
} = useSpecialRouter()

const handleButtonClick = (button: LargeButtonData) => {
  button.onClick()
}

const buttons: LargeButtonData[] = [
  buildLargeButtonData('Mon profil', 'Editer mon profil', 'i-heroicons-clipboard-document-list', () => { pushEditProfile() }),
  buildLargeButtonData('Mon profil streamer', 'Gérer mon profil streamer', 'i-heroicons-user-group-20-solid', () => { pushManageStreamer() }),
  buildLargeButtonData('Paramètres', 'Editer mes paramètres', 'i-heroicons-cog-6-tooth-20-solid', () => { pushSetting() }),
]

onMounted(async () => {
  try {
    await refreshUserSession()
  } catch (error) {
    handleError(error)
  }
})
</script>

<template>
  <AuthenticatedContainer class="wrapper w-full py-6">
    <UContainer class="flex flex-col gap-4">
      <div class="text-5xl font-medium w-full">
        Mon compte
      </div>
      <div class="text-3xl font-medium w-full">
        <UIcon
          name="i-heroicons-user-circle"
          class="icon-baseline"
        />
        {{ sessionStore.session?.user?.email ?? '' }}
      </div>

      <div class="grid sm:grid-cols-2 grid-cols-1 gap-4 max-w-4xl py-6">
        <LargeButton
          v-for="(button, index) in buttons"
          :key="index"
          :data="button"
          :on-click="() => handleButtonClick(button)"
        />
      </div>

      <div class="text-3xl font-medium w-full" />
    </UContainer>
  </AuthenticatedContainer>
</template>



<style>

</style>