import type { UserSession } from './session.type.js'

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

export interface CreatePlaylistResponse {
  playlist: PlaylistStreamer
}

export interface DeletePlaylistResponse {
  result: boolean
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