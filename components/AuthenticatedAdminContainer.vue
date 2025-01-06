<script lang="ts" setup>
  const sessionStore = useSessionStore()
</script>

<template>
  <div>
    <slot v-if="sessionStore.isAdmin()" />
    <div v-if="!sessionStore.isAdmin()">
      <AuthenticatedAdminRequired />
    </div>
  </div>
</template>



<style>

</style>