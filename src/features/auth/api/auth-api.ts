import { BaseResponseType } from 'common/types'
import { commonApi } from 'common/api'
import { LoginParamsType } from 'features/auth/api'

export const authApi = {
  login(data: LoginParamsType) {
    return commonApi.post<BaseResponseType<{ userId?: number }>>('auth/login', data)
  },
  logout() {
    return commonApi.delete<BaseResponseType<{ userId?: number }>>('auth/login')
  }
}
