import { AppRootStateType } from 'common/types'

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn
export const selectCaptcha = (state: AppRootStateType) => state.auth.captcha