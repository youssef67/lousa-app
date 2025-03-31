<script lang="ts" setup>
defineOptions({
  inheritAttrs: false
})

const colorMode = useColorMode()
const appConfig = useAppConfig()
const { $ui } = useNuxtApp()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <UButton
      :icon="isDark ? appConfig.ui.icons.light : appConfig.ui.icons.dark"
      v-bind="{
        ...($ui?.button?.secondary as any),
        ...$attrs
      }"
      :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
      @click="isDark = !isDark"
    />

    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>

<style></style>
