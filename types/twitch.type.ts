export interface UpdateStreamersListResponse {
  dateLastUpdate: string
}

export interface AddStreamerResponse {
  result: boolean
}

export interface TwitchUserSession {
  id: string
  twitchUserLogin: string
  email: string
  spaceStreamerId: string
}
