import { BaseResponseType } from 'common/types'
import { commonInstance } from 'shared/api'
import { LoginParamsType } from 'features/auth/api'

export const authApi = {
  login(data: LoginParamsType) {
    return commonInstance.post<BaseResponseType<{ userId?: number }>>('auth/login', data)
  },
  logout() {
    return commonInstance.delete<BaseResponseType<{ userId?: number }>>('auth/login')
  }
}
