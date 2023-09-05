import { LoginParamsType } from "./types"
import { instance } from "api/instance"
import { BaseResponseType } from "common/types/common.types"

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<BaseResponseType<{ userId?: number }>>("auth/login", data)
  },
  logout() {
    return instance.delete<BaseResponseType<{ userId?: number }>>("auth/login")
  },
  me() {
    return instance.get<BaseResponseType<{ id: number; email: string; login: string }>>("auth/me")
  },
}
