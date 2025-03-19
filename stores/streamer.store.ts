import { type SpaceStreamerProfile, type GetStreamerProfileResponse } from '~~/types/streamer.type.js'
import { type PlaylistStreamer } from '~~/types/playlist.type.js'

export const useStreamerStore = defineStore('streamer', () => {
  const spaceStreamerProfile = ref<SpaceStreamerProfile>()
  const playlistSelected = ref<PlaylistStreamer | null>(null)
  const streamerPlaylists = ref<PlaylistStreamer[]>([])

  const updateSpaceStreamerProfile = async (data: SpaceStreamerProfile) => {
    if (!spaceStreamerProfile.value) {
      spaceStreamerProfile.value = {} as SpaceStreamerProfile
    }

    spaceStreamerProfile.value = data
  }

  const updateStreamerPlaylists = async (playlists: PlaylistStreamer[]) => {
    streamerPlaylists.value = playlists
  }

  const updateSpaceStreamer = async (data: GetStreamerProfileResponse) => { 
    await updateSpaceStreamerProfile(data.spaceStreamerProfile)
    await updateStreamerPlaylists(data.playlists)
    playlistSelected.value = data.playlistSelected
  }

  const addPlaylistsToList = (playlist: PlaylistStreamer) => {
    if (playlist !== undefined) {
      streamerPlaylists.value.push(playlist)
    }
  }

  const deletePlaylistsToList = (playlistIdToDelete: string) => {
    const indexPlaylistToDelete = streamerPlaylists.value.findIndex(
      playlist => playlist.id === playlistIdToDelete
    )

    if (indexPlaylistToDelete === -1) return false

    streamerPlaylists.value.splice(indexPlaylistToDelete, 1)
    return false
  }

  return {
    spaceStreamerProfile,
    playlistSelected,
    streamerPlaylists,
    updateSpaceStreamerProfile,
    addPlaylistsToList,
    deletePlaylistsToList,
    updateSpaceStreamer
  }
})
