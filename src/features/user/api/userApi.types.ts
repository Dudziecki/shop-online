export interface UserResponse {
  email: string
  password: string
  name: string
  avatar: string
  role: string
  id: number
}

export interface UserBody {
  name: string
  email: string
  password: string
  avatar: string

}