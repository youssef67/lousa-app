<script lang="ts" setup>
  const sessionStore = useSessionStore()
</script>

<template>
  <div>
    <slot v-if="sessionStore.isSpotifyUserAuthenticated()" />
    <div v-if="!sessionStore.isSpotifyUserAuthenticated()">
      <AuthenticatedRequiredSpotify />
    </div>
  </div>
</template>



<style>

</style>