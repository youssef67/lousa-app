export interface GetSpaceStreamerDataResponse {
  spaceStreamer: SpaceStreamerMainInfo
  playlists: Playlist[]
}

export interface SpaceStreamerMainInfo {
  id: string
  spaceName: string
  spaceStreamerImg: string
  twitchUserId: string
  twitchUserLogin: string
  isFavoriteSpaceStreamer: boolean
}

export interface Playlist {
  id: string
  playlistName: string
  isFavorite: boolean
}

export interface SetAndGetPlaylistSelectedResponse {
  playlist: Playlist | null
}

export interface GetCheckIfStreamerResponse {
  twitchUser: TwitchUserSession
}

export interface DeleteStreamerProfileResponse {
    result: boolean
  }

export interface TwitchUserSession {
  id: string
  twitchUserLogin: string
  email: string
  spaceStreamerId: string
}
