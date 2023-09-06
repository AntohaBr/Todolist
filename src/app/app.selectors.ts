import { AppRootStateType } from "app/store"

export const selectStatus = (state: AppRootStateType) => state.app
export const selectIsInitialized = (state: AppRootStateType) => state.app
export const selectError = (state: AppRootStateType) => state.app
