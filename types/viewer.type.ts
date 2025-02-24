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
  playlistSelected: Playlist | null
}

export interface GetViewerDataResponse {
  data: Viewer
}

export interface Viewer {
  favorites : {
    spaceStreamers: SpaceStreamer[]
    playlists: Playlist[]
  }
  viewerData: ViewerData
}

export interface SpaceStreamer {
  id: string,
  spaceName: string,
  spaceStreamerImg: string,
}

export interface Playlist {
  id: string,
  playlistName: string,
  spaceStreamerName: string
  spaceStreamerImg: string,
}


export interface SetAndGetPlaylistSelectedResponse {
  data: Playlist | null
}

export interface Playlist {
  id: string
  playlistName: string
  isFavorite: boolean
}
