export enum StorageKey {
  SESSION = 'session',
  AUTH = 'auth'
}

export const useSpecialStorage = () => {
  const logger = useSpecialLogger()

  const saveData = (key: StorageKey, value: any) => {
    const dataJson = JSON.stringify(value)
    localStorage.setItem(key, dataJson)
  }

  const getData = (key: StorageKey): any | undefined => {
    const data = localStorage.getItem(key)
    if (data) {
      try {
        return JSON.parse(data)
      } catch (error) {
        logger.e('Error parsing data', error)
      }
    } else {
      return undefined
    }
  }

  const deleteData = (key: StorageKey) => {
    localStorage.removeItem(key)
  }

  const clearAllData = () => {
    localStorage.clear()
  }

  return {
    saveData,
    getData,
    deleteData,
    clearAllData
  }
}
