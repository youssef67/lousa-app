import {
  type PlaylistTrack,
  type Playlist,
  type ViewerData
} from '~~/types/viewer.type'

export const useViewerStore = defineStore('viewer', () => {
  const viewerData = ref<ViewerData | null>(null)
  const playlistSelected = ref<Playlist | null>(null)
  const playlistTracks = ref<PlaylistTrack[]>([])
  const { newError } = useSpecialError()

  const updateViewerData = async (data: ViewerData) => {
    if(!viewerData.value) { 
      viewerData.value = data
    }
  }

  const updateFavoritesPlaylistsList = async (playlistIdToDelete: string) => {
    const indexPlaylistToDelete = viewerData.value.playlistsFavorites.findIndex(playlist => playlist.id === playlistIdToDelete)
    if (indexPlaylistToDelete === -1) return false
  
    viewerData.value?.playlistsFavorites.splice(indexPlaylistToDelete, 1)
  }

  const updateSpacesStreamersList = async (spaceStreamerId: string) => {
    const indexSpaceStreamerToDelete = viewerData.value.spaceStreamersFavorites.findIndex(spaceStreamer => spaceStreamer.id === spaceStreamerId)
    if (indexSpaceStreamerToDelete === -1) return false
  
    viewerData.value.spaceStreamersFavorites.splice(indexSpaceStreamerToDelete, 1)
  }

  const updatePlaylistSelected = async (playlist: Playlist) => {
    if(!playlistSelected.value) {
      playlistSelected.value = {} as Playlist
    }

    playlistSelected.value = playlist
  }

  const initializePlaylistTracks = async (tracks: PlaylistTrack[]) => {
    playlistTracks.value = tracks
  }

  const addPlaylistTracks = async (track: PlaylistTrack) => {
    playlistTracks.value.push(track)
  }

  return {
    viewerData,
    updateViewerData,
    playlistSelected,
    playlistTracks,
    updateFavoritesPlaylistsList,
    updateSpacesStreamersList,
    updatePlaylistSelected,
    initializePlaylistTracks,
    addPlaylistTracks,
  }
})
