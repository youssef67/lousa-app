import type { UserSession } from './session.type.js'

export interface SearchTracksResponse {
  foundTracks: Track[]
}

export interface AddTracksResponse {
  playlistTracksUpdated: PlaylistTrack[]
}

export interface RefreshVersusResponse {
  result: boolean
}

export interface AddPendingTracksResponse {
  result: true
}

export interface LikeTracksResponse {
  result: true
}

export interface SpecialLikeTracksResponse {
  user: UserSession
  scoreAndLikes: ScoreAndLikes
}

export interface GetPlaylistTracksResponse {
  playlistsTracks: BroadcastTrack[]
  playlistInfo: playlistInfo
  currentTracksVersus: TracksVersus
  scoreAndLikes: ScoreAndLikes
  user: UserSession
}

export interface PlaylistCardInfo {
  id: string
  playlistName: string
  nbTracks: number
  nbFollowers?: number
}

export interface PlaylistViewer {
  id: string
  playlistName: string
  isFavorite: boolean
}

export interface ScoreAndLikes {
  firstTrackScore: number
  firstTrackAlreadyLiked?: boolean
  specialLikeFirstTrack: number
  secondTrackScore: number
  secondTrackAlreadyLiked?: boolean
  specialLikeSecondTrack: number
  nbLikesFirstTrack: number
  nbLikesSecondTrack: number
}

export interface playlistInfo {
  id: string
  playlistName: string
  spaceStreamerId: string
  spaceStreamerName: string
  spaceStreamerImg: string
}

export interface CreatePlaylistResponse {
  playlist: PlaylistCardInfo
}

export interface DeletePlaylistResponse {
  result: boolean
}

export interface Track {
  trackId?: string
  spotifyTrackId?: string
  trackName: string
  artistName: string
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
  score: number
  user: UserSession
}

export interface AddTrackResponse {
  playlistTracksUpdated: BroadcastTrack[]
  nextTracksVersus: TracksVersus
  scoreAndLikes: ScoreAndLikes
}

export interface LikeTrackResponse {
  scoreAndLikes: ScoreAndLikes
  user?: UserSession
}

export interface BroadcastTrack {
  playlistTrackId: string
  trackId: string
  spotifyTrackId: string
  trackName: string
  artistName: string
  album: string
  cover: string
  url: string
  vote: number
  score: number
  specialScore: number
  position: number
  user: {
    id: string
    userName: string | null
  }
}

export interface TracksVersus {
  id: string
  closingDate: string
  firstTrackScore: number
  secondTrackScore: number
  firstTrack: VersusTrack
  secondTrack: VersusTrack
}

export interface VersusTrack {
  trackId: string
  spotifyTrackId: string
  trackName: string
  artistName: string
  album: string
  cover: string
  url: string
  nbLikes: number
  isLikedByUser: boolean
  user: {
    id: string
    userName: string | null
  }
}
