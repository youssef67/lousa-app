<script setup lang="ts">
const sessionStore = useSessionStore()

onMounted(() => {
})
</script>

<template>
  <div>
    <AppHeader />
    <UserAuthentication />
    <UMain
      :class="sessionStore.session ? 'transition-show' : 'transition-hide'"
    >
      <slot />
    </UMain>
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
