import type { UserSession } from './session.type.js'
import { PendingAddResult } from '~/utils/playlist/PlaylistResult.ts.js'
import type { StreamerPlaylist } from './streamer.type.js'

export interface SearchTracksResponse {
  foundTracks: Track[]
}

export interface AddPendingTracksResponse {
  result: PendingAddResult
}

export interface GetPlaylistResponse {
  playlistsTracks: BroadcastTrack[]
  playlistInfo: playlistInfo
  currentTracksVersus: TracksVersus
  currentUser: UserSession
}

export interface GetPlaylistUpdatedForStreamerResponse {
  playlistsTracks: BroadcastTrack[]
  currentTracksVersus: TracksVersus
  playlists: StreamerPlaylist[]
  playlistInfoOfPlaylistSelected: {
    id: string
    playlistName: string
  }
}

export interface LikeTracksResponse {
  result: boolean
}

export interface SetGoldenLikeResponse {
  result: boolean
}

export interface SpecialLikeTracksResponse {
  user: UserSession
}

export interface GetTracksVersusResponse { 
  currentTracksVersus: TracksVersus
}

export interface GetPlaylistSelectedResponse { 
  playlistId: string | null
}

export interface CreatePlaylistResponse {
  playlistCreated: StreamerPlaylist
}

export interface DeletePlaylistResponse {
  result: boolean
}

export interface AddTrackResponse {
  playlistTracksUpdated: BroadcastTrack[]
  userWinner?: UserSession
}

export interface LikeTrackResponse {
  currentTracksVersus: TracksVersus
}

export interface UpdateTracksVersusResponse {
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
  trackScore: number | null
  specialLike: number | null
  listOfUserIdWhoLiked: string[]
}

export interface playlistInfo {
  id: string
  playlistName: string
  spaceStreamerId: string
  spaceStreamerName: string
  spaceStreamerImg: string
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
  isComplete: boolean
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
