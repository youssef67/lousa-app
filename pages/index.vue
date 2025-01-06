<script setup lang="ts">
const { pushStreamers } = useSpecialRouter()

definePageMeta({
  middleware: 'auth'
})


</script>

<template>
  <UContainer>
    <ULandingHero
      title="Turn Your Vision into Reality"
      description="Watch your dreams materialize before your eyes with us."
    />
    <UButton
        type="submit"
        variant="solid"
        size="xl"
        color="secondary"
        @click="() => pushStreamers()"
      >
        Rechercher un streamer
      </UButton>
  </UContainer>
</template>
