import { createSlice } from "@reduxjs/toolkit"
import { authApi } from "features/auth/api"
import { createAppAsyncThunk, thunkTryCatch } from "common/utils"
import { ResultCode } from "common/enums"
import { appActions } from "common/actions"

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  "app/initializeApp",
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.me()
      if (res.data.resultCode === ResultCode.Success) {
        return { isLoggedIn: true }
      } else {
        return rejectWithValue(null)
      }
    }).finally(() => {
      dispatch(appActions.setAppInitialized({ isInitialized: true }))
    })
  }
)

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isInitialized = true
      })
      .addCase(setAppStatus, (state, action) => {
        state.status = action.payload.status
      })
      .addCase(appActions.setAppError, (state, action) => {
        state.error = action.payload.error
      })
  },
})

export const appSlice = slice.reducer
// export const appActions = slice.actions
export const appThunk = { initializeApp }

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type AppInitialStateType = ReturnType<typeof slice.getInitialState>
