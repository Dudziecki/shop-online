import { instance } from "@/common/instance/instance.ts"
import type {
  LoginResponse,
  UpdateRequest,
  UserBody,
  UserLogin,
  UserResponse
} from "@/features/user/api/userApi.types.ts"

export const userApi = {
  registerUser(body: UserBody) {
    return instance.post<UserResponse>("/users", body)
  },
  loginUser(body: UserLogin) {
    return instance.post<LoginResponse>("/auth/login", body, {
      headers: {
        "Content-Type": "application/json"
      }
    })
  },
  getUser(accessToken: string) {
    return instance.get<UserResponse>("auth/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  updateUser(body: UpdateRequest) {
    return instance.put<UserResponse>(`users/${body.id}`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  },
  getCurrentUser() {
    const token = localStorage.getItem('token')
    return instance.get<UserResponse>("auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}