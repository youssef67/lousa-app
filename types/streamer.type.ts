import { type PlaylistStreamer } from './playlist.type.js'
import { type TwitchUserSession } from './twitch.type.js'

export interface GetStreamerProfileResponse {
  spaceStreamerProfile: SpaceStreamerProfile
  playlists: PlaylistStreamer[]
  playlistSelected: PlaylistStreamer
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
  playlistSelected: PlaylistStreamer
}

export interface AddStreamerResponse {
  result: boolean
}

export interface UpdateStreamersListResponse {
  dateLastUpdate: string
}

