import type {
  UpdateStreamersListResponse,
  AddStreamerResponse,
} from '~/types/twitch.type.js'

export const useTwitchApi = () => {
  const { proceedApiError } = useSpecialError()
  const sessionStore = useSessionStore()
  const { fetch } = useSpecialApi()

  const updateStreamersList =
    async (): Promise<UpdateStreamersListResponse> => {
      try {
        const response = await fetch('/api/v1/twitch/update/list/streamers', {
          method: FetchMethod.GET,
          headers: sessionStore.defaultHeaders(),
          cache: 'no-cache'
        })
        return response as UpdateStreamersListResponse
      } catch (error) {
        await proceedApiError(error)
      }
    }

  const addStreamer = async (
    nameStreamer: string
  ): Promise<AddStreamerResponse> => {
    try {
      const response = await fetch('/api/v1/twitch/streamer', {
        method: FetchMethod.POST,
        body: { nameStreamer },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })
      return response as AddStreamerResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  return {
    updateStreamersList,
    addStreamer,
  }
}
