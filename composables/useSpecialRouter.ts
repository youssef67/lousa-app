import { useRouter } from 'vue-router'

export const useSpecialRouter = () => {
  const router = useRouter()

  /**
   * Fonction pour rediriger vers une route
   * @param rout Chemin de la route (ex: '/space')
   * @param push Indique si on effectue réellement la navigation
   * @param queryParams Paramètres de requête (ex: { username: 'slyders_hs' })
   * @param params Paramètres dynamiques (ex: { username: 'slyders_hs' } pour '/space/:username')
   * @returns string La route finale
   */
  const push2 = (rout: string, push: boolean, queryParams?: Record<string, string>, params?: Record<string, string>): string => {
    let finalRoute = rout

    // Remplacement des paramètres dynamiques
    if (params) {
      Object.keys(params).forEach((key) => {
        finalRoute = finalRoute.replace(`:${key}`, params[key])
      })
    }

    // Ajout des query params s'il y en a
    if (queryParams) {
      const queryString = new URLSearchParams(queryParams).toString()
      finalRoute = `${finalRoute}?${queryString}`
    }

    // Effectuer la navigation si `push` est activé
    if (push) {
      router.push(finalRoute)
    }

    return finalRoute
  }

  // Définition des routes
  const pushHome = (push: boolean = true): string => push2('/', push)
  const pushDashboard = (push: boolean = true): string => push2('/dashboard', push)
  const pushMyAccount = (push: boolean = true): string => push2('/me', push)
  const pushEditProfile = (push: boolean = true): string => push2('/me/info', push)
  const pushManageStreamer = (push: boolean = true): string => push2('/me/streamer', push)
  const pushSetting = (push: boolean = true): string => push2('/me/settings', push)
  const pushPlaylist = (push: boolean = true): string => push2('/playlist', push)
  const pushStreamers = (push: boolean = true): string => push2('/streamersList', push)
  const pushAdmin = (push: boolean = true): string => push2('/admin/dashboard', push)
  const pushAuthorization = (push: boolean = true): string => push2('/authorization', push)
  const pushCreateSpaceStreamer = (push: boolean = true): string => push2('/streamer/create', push)
  const pushSpaceViewer = (push: boolean = true): string => push2('/viewer/space', push)
  const pushSpaceStreamer = (push: boolean = true): string => push2('/streamer/space', push)


  // Redirection vers `/space/:username`
  const pushSpaceStreamerForViewer = (streamer: string, push: boolean = true): string => push2('/viewer/streamer/space', push, { streamer })

  // const pushSpaceViewer = (id: string, push: boolean = true): string => push2('/viewer/:id', push, undefined, { id })


  return {
    push2,
    pushMyAccount,
    pushEditProfile,
    pushManageStreamer,
    pushSetting,
    pushHome,
    pushPlaylist,
    pushDashboard,
    pushStreamers,
    pushAdmin,
    pushAuthorization,
    pushSpaceStreamer,
    pushSpaceViewer,
    pushCreateSpaceStreamer,
    pushSpaceStreamerForViewer
  }
}
