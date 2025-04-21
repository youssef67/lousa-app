import type {
  SpaceStreamerProfile,
  GetStreamerProfileResponse,
  StreamerPlaylist
} from '~~/types/streamer.type.js'
import type { PlaylistCardInfo } from '~~/types/playlist.type.js'

export const useStreamerStore = defineStore('streamer', () => {
  const spaceStreamerProfile = ref<SpaceStreamerProfile>()
  const playlistSelected = ref<PlaylistCardInfo | null>(null)
  const streamerPlaylists = ref<StreamerPlaylist[]>([])

  const updateSpaceStreamerProfile = async (data: SpaceStreamerProfile) => {
    if (!spaceStreamerProfile.value) {
      spaceStreamerProfile.value = {} as SpaceStreamerProfile
    }

    spaceStreamerProfile.value = data
  }

  const updateStreamerPlaylists = async (playlists: StreamerPlaylist[]) => {
    streamerPlaylists.value = playlists
  }

  const updateSpaceStreamer = async (data: GetStreamerProfileResponse) => {
    await updateSpaceStreamerProfile(data.spaceStreamerProfile)
    await updateStreamerPlaylists(data.playlists)
    playlistSelected.value = data.playlistSelected
  }

  return {
    spaceStreamerProfile,
    playlistSelected,
    streamerPlaylists,
    updateSpaceStreamerProfile,
    updateSpaceStreamer,
    updateStreamerPlaylists
  }
})
