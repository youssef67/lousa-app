import { Transmit } from '@adonisjs/transmit-client'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  // Transmit instance unique
  const transmit = new Transmit({
    baseUrl: `${config.public.siteUrl}/api/v1`,
  })

  // Expose globally
  return {
    provide: {
      transmit,
    },
  }
})