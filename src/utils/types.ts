import {store} from 'app/store'
import {FieldErrorType} from 'api/types'

export type RootReducerType = typeof store.getState
export type AppRootStateType = ReturnType<RootReducerType>
export type AppDispatchType = typeof store.dispatch
export type ThunkError = { rejectValue: { errors: string[], fieldsErrors?: FieldErrorType[] } }
