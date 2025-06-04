export interface UserResponse {
  email: string
  password: string
  name: string
  avatar: string
  role: string
  id: number
}

export type UpdateRequest = Omit<UserResponse, "role">

export interface UserBody {
  id?: number
  name: string
  email: string
  password: string
  avatar: string
}

export type UserLogin = {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
}