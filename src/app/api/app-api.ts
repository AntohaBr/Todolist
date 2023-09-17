import { BaseResponseType } from 'common/types'
import { commonApi } from 'common/api'

export const appApi = {
    me() {
        return commonApi.get<BaseResponseType<{ id: number; email: string; login: string }>>('auth/me')
    }
}
