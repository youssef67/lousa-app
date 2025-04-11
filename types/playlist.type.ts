import type { UserSession } from './session.type.js'

export interface SearchTracksResponse {
  foundTracks: Track[]
}

// export interface AddTracksResponse {
//   playlistTracksUpdated: PlaylistTrack[]
// }

export interface RefreshVersusResponse {
  result: boolean
}

export interface AddPendingTracksResponse {
  result: true
}

export interface AddTracksResponse {
  playlistsTracks: BroadcastTrack[]
  currentTracksVersus: TracksVersus
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
}

export interface GetTracksVersusResponse { 
  currentTracksVersus: TracksVersus
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
  trackScore: number
  alreadyLiked?: boolean
  specialLike: number
  nbLikes: number
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
  playlistTracksUpdated?: BroadcastTrack[]
}

export interface LikeTrackResponse {
  currentTracksVersus: TracksVersus
}

export interface UpdateTracksVersusResponse {
  currentTracksVersus: TracksVersus
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
  id: string | null
  closingDate: string | null
  firstTrack: VersusTrack | null
  secondTrack: VersusTrack | null
}

export interface VersusTrack {
  trackId: string
  spotifyTrackId: string
  trackName: string
  artistName: string
  album: string
  cover: string
  url: string
  scoreAndLikes: ScoreAndLikes | null
  user: {
    id: string
    userName: string | null
    amountVirtualCurrency: number
  }
}
