declare module '#app' {
  interface NuxtApp {
    $useSpecialLogger: () => ReturnType<
      typeof import('../composables/useSpecialLogger').default
    >
    $useSpecialStorage: () => ReturnType<
      typeof import('../composables/useSpecialStorage').default
    >
    $useAuthenticationStore: () => ReturnType<
      typeof import('../stores/authentication.store').default
    >
    $useSessionStore: () => ReturnType<
      typeof import('../stores/session.store').default
    >
    $useSpecialError: () => ReturnType<
      typeof import('../composables/useSpecialError').default
    >
    $useDeviceUtils: () => ReturnType<
      typeof import('../composables/useDeviceUtils').default
    >
  }
}
