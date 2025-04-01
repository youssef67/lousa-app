import type { PlaylistCardInfo } from './playlist.type.js'
import type { TwitchUserSession } from './twitch.type.js'

export interface GetStreamerProfileResponse {
  spaceStreamerProfile: SpaceStreamerProfile
  playlists: PlaylistCardInfo[]
  playlistSelected: PlaylistCardInfo
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
