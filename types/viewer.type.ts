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

export interface GetViewerDataResponse {
  spaceStreamersFavorites: SpaceStreamerData[]
  playlistsFavorites: PlaylistData[]
}

export interface ViewerData {
  spaceStreamersFavorites: SpaceStreamerData[]
  playlistsFavorites: PlaylistData[]
}

export interface SpaceStreamerData {
  id: string,
  spaceName: string,
  spaceStreamerImg: string,
}

export interface PlaylistData {
  id: string,
  playlistName: string,
  spaceStreamerName: string
  spaceStreamerImg: string,
}
