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

export interface GetPlaylistTracksResponse {
  playlistsTracks: BroadcastTrack[]
  playlistInfo: playlistInfo
  currentTracksVersus: TracksVersus
}

export interface PlaylistStreamer {
  id: string
  playlistName: string
  nbTracks: number
}

export interface PlaylistViewer {
  id: string
  playlistName: string
  isFavorite: boolean
}

export interface playlistInfo {
  id: string
  playlistName: string
  spaceStreamerId: string
  spaceStreamerName: string
  spaceStreamerImg: string
}

export interface CreatePlaylistResponse {
  playlist: PlaylistStreamer
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
  cleanVersus: TracksVersus
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
  user: {
    id: string
    userName: string | null
  }
}
