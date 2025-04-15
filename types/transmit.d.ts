// types/transmit.d.ts
import type { Transmit } from '@adonisjs/transmit-client'

export interface NuxtApp {
  $transmit: Transmit
}

declare module '#app' {
  interface NuxtApp extends NuxtApp {}
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $transmit: Transmit
  }
}
