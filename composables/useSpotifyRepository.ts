export const useSpotifyRepository = () => {
  const sessionStore = useSessionStore()

  // const { newError } = useSpecialError()
  const { createPlaylist, getAllPlaylists, deletePlaylist } = useSpotifyApi()

  const runCreatePlaylist = async (playlistName: string) => {
    const response = await createPlaylist(playlistName)
    // sessionStore.updatePlaylists(response.playlist)
    return response
  }

  const runGetAllPlaylists = async () => {
    const response = await getAllPlaylists()
    return response
  }

  const runDeletePlaylists = async (id: string) => {
    const response = await deletePlaylist(id)
    return response
  }

  return {
    runCreatePlaylist,
    runGetAllPlaylists,
    runDeletePlaylists
  }
}
