<script lang="ts" setup>
const authenticationStore = useAuthenticationStore()

const goToConnect = async () => {
  authenticationStore.proceedLoginClick()
}
</script>

<template>
  <UContainer>
    <!-- Hero Section -->
    <ULandingHero
      title="Créer une communauté musicale"
      description="Faites découvrir vos pépites musicales"
    />

    <section class="flex flex-col sm:flex-row gap-6 justify-center mt-10">
      <UButton
          :label="authenticationStore.accountButtonLabel()"
          icon="i-tabler-user"
          color="secondary"
          @click="goToConnect"
        />
    </section>
  </UContainer>
</template>



<style>

</style>