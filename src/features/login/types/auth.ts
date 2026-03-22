export interface LoginBody {
  email: string
  password: string
}

export interface User {
  id: string
  name: string
  email: string
  authProvider: string
  xp: number
  level: number
  heroCoins: number
  createdAt: string
  updatedAt: string
}

export interface LoginResponse {
  user: User
  token: string
}
