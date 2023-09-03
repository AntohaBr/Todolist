import {createAsyncThunk} from '@reduxjs/toolkit'
import {AppDispatchType, AppRootStateType} from 'utils/types'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType
    dispatch: AppDispatchType
    rejectValue: null
}>()