<script lang="ts" setup>
const { pushStreamers } = useSpecialRouter()
</script>

<template>
  <UContainer>
    <AuthenticatedAdminContainer>
      <div>staff dashboard</div>
      <UButton
        label="liste des streamers"
        type="submit"
        variant="solid"
        size="xl"
        color="secondary"
        @click="() => pushStreamers()"
      />
    </AuthenticatedAdminContainer>
  </UContainer>
</template>

<style></style>
