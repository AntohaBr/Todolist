import { BaseResponseType } from 'common/types'
import { commonInstance } from 'shared/api'

export const appApi = {
    me() {
        return commonInstance.get<BaseResponseType<{ id: number; email: string; login: string }>>('auth/me')
    }
}
