<script lang="ts" setup>
const props = defineProps({
  isStreamerAuthentication: {
    type: Boolean,
    required: true
  }
})

const sessionStore = useSessionStore()
</script>

<template>
  <div>
    <slot v-if="sessionStore.isTwitchUserAuthenticated()" />
    <div v-if="!sessionStore.isTwitchUserAuthenticated()">
      <div v-if="props.isStreamerAuthentication">
        <AuthenticatedRequiredTwitchStreamer />
      </div>
      <div v-else>
        <AuthenticatedRequiredTwitchViewer />
        </div>
    </div>
  </div>
</template>

<style></style>
