import { array } from 'zod'
import {
  type ViewerData,
  type PlaylistData
} from '~~/types/viewer.type'

export const useViewerStore = defineStore('viewer', () => {
  const viewer = ref<ViewerData>()
  const playlistSelected = ref<PlaylistData | null>(null)
  const { newError } = useSpecialError()

  const updateViewerData = async (viewerData: ViewerData) => {
    if(!viewer.value) { 
      viewer.value = {} as ViewerData
    }

    viewer.value = viewerData
  }

  const updateFavoritesPlaylistsList = async (playlistIdToDelete: string) => {
    const indexPlaylistToDelete = viewer.value?.playlistsFavorites.findIndex(playlist => playlist.id === playlistIdToDelete)
    if (indexPlaylistToDelete === -1) return false
  
    viewer.value?.playlistsFavorites.splice(indexPlaylistToDelete, 1)

  }

  const updateSpacesStreamersList = async (spaceStreamerId: string) => {
    const indexSpaceStreamerToDelete = viewer.value?.spaceStreamersFavorites.findIndex(spaceStreamer => spaceStreamer.id === spaceStreamerId)
    if (indexSpaceStreamerToDelete === -1) return false
  
    viewer.value?.spaceStreamersFavorites.splice(indexSpaceStreamerToDelete, 1)
  }

  return {
    viewer,
    updateViewerData,
    playlistSelected,
    updateFavoritesPlaylistsList,
    updateSpacesStreamersList
  }
})
