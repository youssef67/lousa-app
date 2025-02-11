import type { Auth, Session } from '~~/types/session.type'

export const useTwitchRepository = () => {
  const sessionStore = useSessionStore()
  const logger = useSpecialLogger()

  const { newError } = useSpecialError()
  const { updateStreamersList, addStreamer } = useTwitchApi()

  const runUpdateStreamersList = async () => {
    const response = await updateStreamersList()

    try {
      if (response.dateLastUpdate) {
        const date = response.dateLastUpdate

        const formattedDate = new Date(date).toLocaleString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })

        await sessionStore.updateSessionAdmin({
          dateStreamsLastUpdate: formattedDate
        })

        return true
      } else {
        throw newError('ERROR_INVALID_DATA', 'TRGS-1')
      }
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  const runAddStreamer = async (nameStreamer: string) => {
    const response = await addStreamer(nameStreamer)

    try {
      if (response.result) {
        return true
      } else {
        return false
      }
    } catch (error) {
      logger.e('Error logging out', error)
    }
  }

  return {
    runUpdateStreamersList,
    runAddStreamer,
  }
}
