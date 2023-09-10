import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatchType, AppRootStateType, BaseResponseType } from 'common/types'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType
  dispatch: AppDispatchType
  rejectValue: null | RejectValueType
}>()

export type RejectValueType = {
  data: BaseResponseType
  showGlobalError: boolean
}
