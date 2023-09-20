import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'common/utils'
import {appApi} from "app/api/";
import {ResultCodeEnum} from "shared/config";

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>('app/initializeApp', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  const res = await appApi.me()
  if (res.data.resultCode === ResultCodeEnum.Success) {
    return { isLoggedIn: true }
  } else {
    return rejectWithValue({ data: res.data, showGlobalError: false })
  }
})

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isInitialized = true
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading'
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          const { payload, error } = action
          if (payload) {
            if (payload.showGlobalError) {
              state.error = payload.data.messages.length ? payload.data.messages[0] : 'Some error occurred'
            }
          } else {
            state.error = error.message ? error.message : 'Some error occurred'
          }
          state.status = 'failed'
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.status = 'succeeded'
        },
      )
  },
})

export const appSlice = slice.reducer
export const appActions = slice.actions
export const appThunk = { initializeApp }

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppInitialStateType = ReturnType<typeof slice.getInitialState>
