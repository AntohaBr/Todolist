import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FieldErrorType, LoginParamsType } from "api/types"
import { appActions } from "../CommonActions/App"
import { authAPI } from "api/auth.api"
import { handleServerAppError, handleServerNetworkError } from "utils"
import {ResultCode} from "common/enums/common.enums";

const { setAppStatus } = appActions

export const login = createAsyncThunk<
  undefined,
  LoginParamsType,
  { rejectValue: { errors: string[]; fieldsErrors?: FieldErrorType[] } }
>("auth/login", async (param, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus({ status: "loading" }))
  try {
    const res = await authAPI.login(param)
    if (res.data.resultCode === ResultCode.Success) {
      thunkAPI.dispatch(setAppStatus({ status: "succeeded" }))
      return
    } else {
      return handleServerAppError(res.data, thunkAPI)
    }
  } catch (error) {
    return handleServerNetworkError(error, thunkAPI)
  }
})

export const logout = createAsyncThunk("auth/logout", async (param, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus({ status: "loading" }))
  try {
    const res = await authAPI.logout()
    if (res.data.resultCode === ResultCode.Success) {
      thunkAPI.dispatch(setAppStatus({ status: "succeeded" }))
      return
    } else {
      return hanwdleServerAppError(res.data, thunkAPI)
    }
  } catch (error) {
    return handleServerNetworkError(error, thunkAPI)
  }
})

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.isLoggedIn = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false
      })
  },
})

export const authReducer = slice.reducer
export const authAction = slice.actions
export const authActions = {
  login,
  logout,
}
