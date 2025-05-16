import { instance } from "@/common/instance/instance.ts"
import type { UserBody, UserResponse } from "@/features/user/api/userApi.types.ts"

export const userApi={
  registerUser (body:UserBody){
    return instance.post<UserResponse>("/users",{body})
  }
}