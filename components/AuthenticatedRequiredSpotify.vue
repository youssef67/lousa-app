<script lang="ts" setup>
const { runLoginSpotifyStreamer } = useAuthRepository()
const { pushMyAccount } = useSpecialRouter()
const { showSuccess } = useSpecialToast()

const links: any = [
  {
    label: 'Se connecter',
    color: 'secondary',
    click: async () => {
    
      const response = await runLoginSpotifyStreamer()

      if (response) {
        // TODO: 1
        showSuccess('Connexion a spotify réussi')
        pushMyAccount()
      }
    }
  }
]
</script>

<template>
  <ULandingHero
    title="Authentification requise"
    description="Vous devez être authentifié a spotifypour accéder à cette page"
    :links="links"
    :ui="{
      title:
        'text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl',
      description:
        'mt-6 text-base/7 text-gray-500 dark:text-gray-400 text-center'
    }"
  />
</template>
