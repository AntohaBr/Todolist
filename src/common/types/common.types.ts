export type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  data: D
}

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
