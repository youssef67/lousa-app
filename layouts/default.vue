<script setup lang="ts">
const sessionStore = useSessionStore()
const route = useRoute()

// Optionnel : cacher le bouton sur certaines pages
const shouldShowButton = computed(() => {
  return !['/connexion', '/admin'].includes(route.path)
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
        to="/battles"
      >
        Découvrir les Battles
      </UButton>
    </div>
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
