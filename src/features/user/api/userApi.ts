import { instance } from "@/common/instance/instance.ts"
import type { LoginResponse, UserBody, UserLogin, UserResponse } from "@/features/user/api/userApi.types.ts"

export const userApi={
  registerUser (body:UserBody){
    return instance.post<UserResponse>("/users",body)
  },
  loginUser(body:UserLogin){
    return instance.post<LoginResponse>("/auth/login",body)
  },
  getUser(accessToken: string) {
    return instance.get("auth/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}` // Исправленный формат
      }
    })
  },
  getCurrentUser() {
    const token = localStorage.getItem('token');
    return instance.get("auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}