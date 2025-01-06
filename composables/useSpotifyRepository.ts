export const useSpotifyRepository = () => {
  const sessionStore = useSessionStore()

  // const { newError } = useSpecialError()
  const { createPlaylist, getAllPlaylists } = useSpotifyApi()

  const runCreatePlaylist = async (playlistName: string) => {
    const response = await createPlaylist(playlistName)
    // sessionStore.updatePlaylists(response.playlist)
    return response
  }

  const runGetAllPlaylists = async () => {
    const response = await getAllPlaylists()
    return response
  }

  return {
    runCreatePlaylist,
    runGetAllPlaylists
  }
}
