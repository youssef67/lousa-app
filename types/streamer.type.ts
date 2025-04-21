import type { BroadcastTrack, PlaylistCardInfo } from './playlist.type.js'
import type { TwitchUserSession } from './twitch.type.js'

export interface GetStreamerProfileResponse {
  spaceStreamerProfile: SpaceStreamerProfile
  playlists: StreamerPlaylist []
  playlistsTracks: BroadcastTrack[] | null
  playlistInfoOfPlaylistSelected: PlaylistInfo | null
}

export interface StreamerPlaylist {
  id: string
  playlistName: string
  nbTracks: number
  isSelected: boolean
  nbFollowers: number
}

export interface PlaylistInfo {
  id: string
  playlistName: string
}

export interface GetCheckIfStreamerResponse {
  twitchUser: TwitchUserSession
}

export interface DeleteStreamerProfileResponse {
  result: boolean
}

export interface SpaceStreamerProfile {
  id: string
  spaceName: string
  spaceStreamerImg: string
  twitchUserId: string
  twitchUserLogin: string
}

export interface SetAndGetPlaylistSelectedResponse {
  playlistSelected: PlaylistCardInfo
}

export interface AddStreamerResponse {
  result: boolean
}

export interface UpdateStreamersListResponse {
  dateLastUpdate: string
}

export interface GetSpaceStreamerInfoResponse { 
  id: string
}
