<script lang="ts" setup>
const { runUpdateStreamersList } = useTwitchRepository()
const sessionStore = useSessionStore()
const isModalVisible = ref(false)

const openModal = () => {
  isModalVisible.value = true
}

const proceedResult = (result: boolean) => {
  if (!result) {
    isModalVisible.value = false
  }
}

</script>

<template>
  <UContainer>
    <AuthenticatedAdminContainer>
      <div>staff dashboard</div>
      <AuthenticatedTwitchContainer :isStreamerAuthentication="false">
        <section class="space-y-4">
          <div class="flex items-center">
            <UButton
              label="Mettre à jour les streamers"
              type="submit"
              variant="solid"
              size="xl"
              color="secondary"
              @click="() => runUpdateStreamersList()"
            />
            <p v-if="sessionStore.session.admin !== undefined" class="ml-[5px] text-sm text-gray-600">
              Mise à jour le {{ sessionStore.session.admin.dateStreamsLastUpdate }}
            </p>
          </div>

          <UButton
            label="Ajouter un stream"
            type="button"
            variant="solid"
            size="xl"
            color="secondary"
            @click="openModal"
          />
        </section>

        <!-- Composant Modal -->
        <AddStreamerModal
          :isOpen="isModalVisible"
          @proceed-result="proceedResult"
        />

        <section
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 lg:gap-6"
        >
          <!-- StreamerCard components -->
        </section>
      </AuthenticatedTwitchContainer>
    </AuthenticatedAdminContainer>
  </UContainer>
</template>
