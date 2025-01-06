<script lang="ts" setup>
const sessionStore = useSessionStore()
</script>

<template>
  <UContainer>
    <div v-if="sessionStore.isAdmin()">
      <UButton
        label="Mettre a jour la liste des streamers"
        type="submit"
        variant="solid"
        size="xl"
        color="secondary"
        @click="() => console.log('Mettre a jour la liste des streamers')"
      />
    </div>
  </UContainer>
</template>

<style></style>
