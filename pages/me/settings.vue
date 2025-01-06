<script lang="ts" setup>
import LogOutModal from '~/components/LogOutModal.vue';
import type { LargeButtonData } from '~~/types/button.type'

const { buildLargeButtonData } = useUiUtils()
const isOpenLogoutModal = ref(false)
const isOpenDeleteModal = ref(false)
const sessionStore = useSessionStore()

const handleButtonClick = (button: LargeButtonData) => {
  button.onClick()
}

const buttons: LargeButtonData[] = [
  buildLargeButtonData(
    'Ma session',
    'Me deconnecter',
    'i-heroicons-arrow-left-start-on-rectangle-20-solid',
    () => {
      isOpenLogoutModal.value = true
    }
  ),

  buildLargeButtonData(
    'Mon compte',
    'Supprimer mon compte',
    'i-heroicons-trash-20-solid',
    () => {
      isOpenDeleteModal.value = true
    }
  )
]
</script>

<template>
  <AuthenticatedContainer class="wrapper w-full py-6">
    <UContainer class="flex flex-col gap-4">
      <div class="text-5xl font-medium w-full">Paramètres</div>
      <div class="text-3xl font-medium w-full">
        <UIcon name="i-heroicons-user-circle" class="icon-baseline" />
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

      <LogOutModal
        :is-open="isOpenLogoutModal"
        @proceed-result="() => { isOpenLogoutModal = false }"
      />
      <DeleteUserModal
        :is-open="isOpenDeleteModal"
        @proceed-result="() => { isOpenDeleteModal = false }"
      />
      <div class="text-3xl font-medium w-full" />
    </UContainer>
  </AuthenticatedContainer>
</template>

<style></style>
