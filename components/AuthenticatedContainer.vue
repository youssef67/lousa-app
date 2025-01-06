<script lang="ts" setup>
  const sessionStore = useSessionStore()
</script>

<template>
  <div>
    <slot v-if="sessionStore.isSessionAuthenticated()" />
    <div v-if="!sessionStore.isSessionAuthenticated()">
      <AuthenticatedRequired />
    </div>
  </div>
</template>



<style>

</style>