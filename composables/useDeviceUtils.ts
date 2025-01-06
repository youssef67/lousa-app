import type { DeviceInput } from "~/types/session.type"

export const useDeviceUtils = () => {
  const { isAndroid, isMacOS, isIos, isWindows } = useDevice()

  const generateDevice = (): DeviceInput => { 
    const locale =  navigator.language || 'en-US'
    const language = navigator.language.split('-')[0] || 'en'
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
    const model = resolveModel()
    const os = resolveOS()
    const osVersion = resolveVersion()
    const appVersion = '1.0.0'
    const pushToken = ''
  
    return {
      locale,
      language,
      timezone,
      model,
      os,
      osVersion,
      appVersion,
      pushToken
    }
  }
  
  const resolveOS = (): string => {
    let result = 'unknown'
    if (isAndroid) {
      result = 'android'
    } else if (isIos) {
      result = 'ios'
    } else if (isWindows) {
      result = 'windows'
    } else if (isMacOS) {
      result = 'mac'
    }
  
    return result
  }

  const resolveModel = (): string => {
    const result = 'browser'
    return result
  }

  const resolveVersion = (): string => {
    const userAgent = navigator.userAgent
    return userAgent
  }

  return {
    generateDevice
  }
}




