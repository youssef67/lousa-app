import type { UserSession } from './session.type'

export interface AddFavoritePlaylistResponse {
  result: boolean
}

export interface DeleteFavoritePlaylistResponse {
  result: boolean
}

export interface AddFavoriteStreamerResponse {
  result: boolean
}

export interface DeleteFavoriteStreamerResponse {
  result: boolean
}

export interface DeleteFavoriteStreamerResponse {
  result: boolean
}

export interface ViewerData {
  spaceStreamersFavorites: SpaceStreamer[]
  playlistsFavorites: Playlist[]
  isPlaylistSelected: Playlist | null
}

export interface GetViewerDataResponse {
  data: ViewerData
}

export interface SpaceStreamer {
  id: string
  spaceName: string
  spaceStreamerImg: string
  nbPlaylists: number
}

export interface Playlist {
  id: string
  playlistName: string
  spaceStreamerName: string
  spaceStreamerImg: string
  nbTracks: number
}

export interface SetAndGetPlaylistSelectedResponse {
  data: Playlist | null
}

export interface Playlist {
  id: string
  playlistName: string
  isFavorite: boolean
}

export interface Track {
  id: string
  name: string
  artists: string
  album: string
  cover: string
  url: string
}

export interface PlaylistTrack {
  id: string
  spotifyTrackId: string
  trackId: string
  trackName: string
  artistName: string
  album: string
  cover: string
  url: string
  position: number
  votes: number
  user: UserSession
}

export interface SearchTracksResponse {
  foundTracks: Track[]
}

export interface AddTracksResponse {
  newPlaylistTrack: PlaylistTrack
}

export interface CompleteProfileResponse {
  result: UserSession
}

export interface CheckUserNameAvailabilityResponse {
  result: boolean
}

export interface GetPlaylistTracksResponse {
  playlistsTracks: PlaylistTrack[]
  playlistSelected: Playlist
}
