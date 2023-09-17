import { AppRootStateType } from 'common/types'

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn
export const selectCaptchaUrl = (state: AppRootStateType) => state.auth.captchaUrl