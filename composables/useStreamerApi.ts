import type {
  GetSpaceStreamerDataResponse,
  SetAndGetPlaylistSelectedResponse,
  GetCheckIfStreamerResponse,
  DeleteStreamerProfileResponse
} from '~/types/streamer.type'

export const useStreamerApi = () => {
  const { proceedApiError } = useSpecialError()
  const sessionStore = useSessionStore()
  const { fetch } = useSpecialApi()

  

  const getSpaceStreamerData = async (
    twitchUserId: string | null,
    spaceStreamerId: string | null
  ): Promise<GetSpaceStreamerDataResponse> => {
    try {
      // Création de l'objet en filtrant les valeurs null
      const body = Object.fromEntries(
        Object.entries({ twitchUserId, spaceStreamerId }).filter(
          ([_, v]) => v !== null
        )
      )

      const response = await fetch('/api/v1/session/streamer/space', {
        method: FetchMethod.POST,
        body: JSON.stringify(body), // Convertir en JSON
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })

      return response as GetSpaceStreamerDataResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const setAndGetPlaylistSelected = async (
    playlistId: string
  ): Promise<SetAndGetPlaylistSelectedResponse> => {
    try {
      const response = await fetch('/api/v1/session/playlist/selected', {
        method: FetchMethod.POST,
        body: { playlistId },
        headers: sessionStore.defaultHeaders(),
        cache: 'no-cache'
      })

      return response as SetAndGetPlaylistSelectedResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }
  const checkIfStreamer = async (): Promise<GetCheckIfStreamerResponse> => {
    try {
      const response = await fetch(
        '/api/v1/session/validate/streamer/profile',
        {
          method: FetchMethod.GET,
          headers: sessionStore.defaultHeaders(),
          cache: 'no-cache'
        }
      )
      return response as GetCheckIfStreamerResponse
    } catch (error) {
      await proceedApiError(error)
    }
  }

  const deleteStreamerProfile =
    async (): Promise<DeleteStreamerProfileResponse> => {
      try {
        const response = await fetch(
          '/api/v1/session/streamer/profile/delete',
          {
            method: FetchMethod.POST,
            body: {},
            headers: sessionStore.defaultHeaders(),
            cache: 'no-cache'
          }
        )
        return response as DeleteStreamerProfileResponse
      } catch (error) {
        await proceedApiError(error)
      }
    }

  return {
    getSpaceStreamerData,
    setAndGetPlaylistSelected,
    checkIfStreamer,
    deleteStreamerProfile
  }
}
