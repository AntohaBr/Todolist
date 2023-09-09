import {AppRootStateType} from "common/types"

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn
