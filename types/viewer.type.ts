import type { UserSession } from './session.type'
import type { SpaceStreamerProfile } from './streamer.type'
import type { PlaylistViewer } from './playlist.type'

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

export interface CompleteProfileResponse {
  result: UserSession
}

export interface CheckUserNameAvailabilityResponse {
  result: boolean
}

export interface GetFavoritesResponse {
  spaceStreamersFavorites: SpaceStreamerFavorite[]
  playlistsFavorites: PlaylistFavorite[]
}

export interface GetStreamerProfileResponse {
  spaceStreamerProfile: SpaceStreamerProfile
  playlists: PlaylistViewer[]
  isFavoriteStreamer: boolean
}

export interface StatsResponse {
  tracksVersus: {
    completed: number
    votingInProgress: number
    onHold: number
    won: number
  }
  tracks: {
    top: number
    ranked: number
  }
}


export interface SpaceStreamerFavorite {
  id: string
  spaceName: string
  spaceStreamerImg: string
  nbPlaylists: number
}

export interface PlaylistFavorite {
  id: string
  playlistName: string
  spaceStreamerName: string
  spaceStreamerImg: string
  nbTracks: number
  isSelected: boolean
  nbFollowers: number
}
