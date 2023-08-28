import {AppRootStateType} from 'utils/types'

export const selectStatus = (state: AppRootStateType) => state.app
export const selectIsInitialized = (state: AppRootStateType) => state.app
