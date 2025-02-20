<script lang="ts" setup>
const sessionStore = useSessionStore()
const { refreshUserSession } = useSessionRepository()

onMounted(() => {
  refreshUserSession()
})
</script>

<template>
  <div>
    <slot v-if="sessionStore.isTwitchUserAuthenticated()" />
    <div v-if="!sessionStore.isTwitchUserAuthenticated()">
      <AuthenticatedRequiredTwitchStreamer />
    </div>
  </div>
</template>

<style></style>
