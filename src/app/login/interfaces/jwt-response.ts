export interface JwtResponse {
  token: string
  refreshToken: string
  type: string
  id: number
  login: string
  roles: string[]
}
