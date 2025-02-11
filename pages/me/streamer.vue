<script lang="ts" setup>
const sessionStore = useSessionStore()
const { refreshUserSession } = useSessionRepository()

onMounted(async () => {
  await refreshUserSession()
})
</script>

<template>
  <AuthenticatedSpotifyContainer class="wrapper w-full py-6">
    <UContainer class="flex flex-col gap-4">
      <div class="text-5xl font-medium w-full">Paramètres</div>
      <div class="text-3xl font-medium w-full">
        <UIcon name="i-heroicons-user-circle" class="icon-baseline" />
        {{ sessionStore.session?.user.spotifyUser?.displayName ?? '' }}
      </div>
      <p>
        {{ sessionStore.session?.user.spotifyUser?.spotifyId ?? '' }}
      </p>
      <div class="text-3xl font-medium w-full" />
    </UContainer>
  </AuthenticatedSpotifyContainer>
</template>

<style></style>
