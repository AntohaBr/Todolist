import { store } from "app/store"

export type BaseResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  data: D
  fieldsErrors: FieldErrorType[]
}
export type FieldErrorType = {
  error: string
  field: string
}
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch
// export type ThunkError = { rejectValue: { errors: string[]; fieldsErrors?: FieldErrorType[] } }
