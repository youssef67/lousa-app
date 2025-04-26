<script lang="ts" setup>
const sessionStore = useSessionStore()
const isTwitchAuthenticated = computed(() => sessionStore.isTwitchUserAuthenticated())
const activeView = ref<'viewer' | 'streamer'>('viewer') // Par défaut Viewer

onMounted(() => {
  sessionStore.restoreSession()
  console.log('isTwitchAuthenticated', isTwitchAuthenticated.value)
})
</script>

<template>
  <UContainer>
    <div v-if="isTwitchAuthenticated" class="flex justify-center items-center gap-4 my-6">
      <UButton
        :variant="activeView === 'viewer' ? 'solid' : 'outline'"
        color="secondary"
        @click="activeView = 'viewer'"
      >
        Voir les Offres Viewer
      </UButton>

      <UButton
        :variant="activeView === 'streamer' ? 'solid' : 'outline'"
        color="secondary"
        @click="activeView = 'streamer'"
      >
        Voir les Offres Streamer
      </UButton>
    </div>

    <section v-if="activeView === 'viewer'">
      <PricingViewer />
    </section>

    <section v-if="activeView === 'streamer' && isTwitchAuthenticated">
      <PricingStreamer />
    </section>
  </UContainer>
</template>

<style scoped>
/* Bonus : pour rendre l'animation pulse plus douce si besoin */
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}
</style>
