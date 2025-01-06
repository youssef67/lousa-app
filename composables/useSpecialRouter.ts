export const useSpecialRouter = () => {
  const router = useRouter()

  const push2 = (rout: string, push: boolean, queryParams?: Record<string, string>): string => {
    let param = ''
    if (queryParams) {
      const queryString = new URLSearchParams(queryParams).toString()
      param = `?${queryString}`
    }

    const finalRoute = `${rout}${param}`
    if (push) {
      router.push(finalRoute)
    }

    return finalRoute
  }

  const pushHome = (push: boolean = true): string => { 
    return push2('/', push)
  }

  const pushDashboard = (push: boolean = true): string => { 
    return push2('dashboard', push)
  }

  const pushMyAccount = (push: boolean = true): string => { 
    return push2('/me', push)
  }

  const pushEditProfile = (push: boolean = true): string => { 
    return push2('/me/info', push)
  }

  const pushManageStreamer = (push: boolean = true): string => { 
    return push2('/me/streamer', push)
  }

  const pushSetting = (push: boolean = true): string => { 
    return push2('/me/settings', push)
  }

  const pushPlaylist = (push: boolean = true): string => { 
    return push2('/playlist', push)
  }

  const pushStreamers = (push: boolean = true): string => { 
    return push2('/streamers', push)
  }

  const pushAdmin = (push: boolean = true): string => { 
    return push2('/admin/dashboard', push)
  }

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
    pushAdmin
  }
}