<script setup lang="ts">
const sessionStore = useSessionStore()
const { runSignUpAnonymous } = useAuthRepository()
const { handleError } = useSpecialError()
const { sanitizeHtml } = useUiUtils()

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'fr'
  }
})
console.log('Anonymous sign up')

onMounted(async () => {
  if (sessionStore.isSessionOpen()) {
    sessionStore.restoreSession()
  } else {
    try {
      await runSignUpAnonymous()
    } catch (error) {
      handleError(error)
    }
  }
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>

  <UNotifications
    :ui="{
      strategy: 'override',
      position: 'top-0 left-1/2 transform -translate-x-1/2',
      width: 'w-full sm:w-96'
    }"
  >
    <!-- eslint-disable vue/no-v-html -->
    <template #title="{ title }">
      <span class="whitespace-pre-wrap" v-html="sanitizeHtml(title)" />
    </template>

    <template #description="{ description }">
      <span class="whitespace-pre-wrap" v-html="sanitizeHtml(description)" />
    </template>
    <!-- eslint-enable vue/no-v-html -->
  </UNotifications>
</template>

<style>
.lousa-error-text {
  @apply text-red-500 dark:text-red-400;
}

.lousa-error {
  @apply lousa-error-text text-sm;
}

.lousa-title {
  @apply text-5xl font-medium;
}

.lousa-subtitle {
  @apply text-xl font-medium;
}
</style>
