export default defineNuxtRouteMiddleware((to, from) => {
    const sessionStore = useSessionStore();

    if (!sessionStore.isSessionAuthenticated()) {
      return navigateTo('/landing');
    }
  });
  