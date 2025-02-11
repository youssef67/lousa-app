<script lang="ts" setup>

const sessionStore = useSessionStore()

</script>

<template>
  <UContainer> 
    <h1>{{sessionStore.session.user}}</h1>
  </UContainer>
</template>

<style></style>
