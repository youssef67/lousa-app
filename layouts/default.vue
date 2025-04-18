<script setup lang="ts">
const sessionStore = useSessionStore()
const { pushSpaceViewer } = useSpecialRouter()
const route = useRoute()

const shouldShowButton = computed(() => {
  return !['/landing', '/', '/viewer/space'].includes(route.path)
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
