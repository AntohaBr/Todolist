import {AppRootStateType} from 'utils'

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn
