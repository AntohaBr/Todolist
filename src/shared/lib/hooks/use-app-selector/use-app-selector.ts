import {AppRootStateType} from 'common/types'
import {TypedUseSelectorHook, useSelector} from 'react-redux'

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
