<script setup lang="ts">
const sessionStore = useSessionStore()
const { pushSpaceViewer, pushSpaceStreamer } = useSpecialRouter()
const route = useRoute()


const shouldShowButton = computed(() => {
  const excludedRoutes = ['/', '/landing', '/viewer/space']
  const isExcluded = excludedRoutes.includes(route.path)
  const isStreamerRoute = route.path.startsWith('/streamer/')
  return !(isExcluded || isStreamerRoute)
})

const shouldShowButtonBeta = computed(() => {
  const excludedRoutes = ['/', '/landing', '/streamer/space']
  const isExcluded = excludedRoutes.includes(route.path)
  const isViewerRoute = route.path.startsWith('/viewer/')
  return !(isExcluded || isViewerRoute)
})

onMounted(() => {
  sessionStore.restoreSession()
})
</script>

<template>
  <div>
    <AppHeader />
    <UserAuthentication />

    <UMain :class="sessionStore.session ? 'transition-show' : 'transition-hide'">
      <slot />
    </UMain>

    <!-- Bouton global en bas à droite -->
    <div v-if="shouldShowButton" class="fixed bottom-4 right-4 z-50">
      <UButton
        color="secondary"
        size="lg"
        class="shadow-xl px-5 py-3 rounded-full"
        icon="i-tabler-rocket"
        @click="pushSpaceViewer()"
      >
        Retour à l'espace viewer
      </UButton>
    </div>

    <div v-if="shouldShowButtonBeta" class="fixed bottom-4 left-4 z-50">
      <UButton
        color="secondary"
        size="lg"
        class="shadow-xl px-5 py-3 rounded-full"
        icon="i-tabler-rocket"
        @click="pushSpaceStreamer()"
      >
        Retour à l'espace streamer
      </UButton>
    </div>
    <AppFooter />
  </div>
</template>

<style>
.transition-hide {
  opacity: 0;
}

.transition-show {
  opacity: 1;
  transition: opacity 0.5s;
}
</style>
