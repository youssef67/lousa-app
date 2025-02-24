import {
  type ViewerData,
  type Playlist,
  type Viewer
} from '~~/types/viewer.type'

export const useViewerStore = defineStore('viewer', () => {
  const viewer = ref<Viewer>()
  const playlistSelected = ref<Playlist | null>(null)
  const { newError } = useSpecialError()

  const updateViewerData = async (viewerData: Viewer) => {
    if(!viewer.value) { 
      viewer.value = {} as Viewer
    }

    viewer.value = viewerData
  }

  const updateFavoritesPlaylistsList = async (playlistIdToDelete: string) => {
    const indexPlaylistToDelete = viewer.value?.favorites.spaceStreamers.findIndex(playlist => playlist.id === playlistIdToDelete)
    if (indexPlaylistToDelete === -1) return false
  
    viewer.value?.favorites.playlists.splice(indexPlaylistToDelete, 1)

  }

  const updateSpacesStreamersList = async (spaceStreamerId: string) => {
    const indexSpaceStreamerToDelete = viewer.value?.favorites.spaceStreamers.findIndex(spaceStreamer => spaceStreamer.id === spaceStreamerId)
    if (indexSpaceStreamerToDelete === -1) return false
  
    viewer.value?.favorites.spaceStreamers.splice(indexSpaceStreamerToDelete, 1)
  }

  const updatePlaylistSelected = async (playlist: Playlist) => {
    if(!playlistSelected.value) {
      playlistSelected.value = {} as Playlist
    }

    playlistSelected.value = playlist
  }

  return {
    viewer,
    updateViewerData,
    playlistSelected,
    updateFavoritesPlaylistsList,
    updateSpacesStreamersList,
    updatePlaylistSelected
  }
})
