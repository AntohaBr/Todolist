import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {authApi, LoginParamsType} from 'features/auth/api'
import {createAppAsyncThunk} from 'common/utils'
import {ResultCode} from 'common/enums'
import {clearTasksAndTodolists} from 'common/actions'
import {securityAPI} from "features/auth/login/captcha/api/captcha-api";

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>('auth/login', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    const res = await authApi.login(arg)
    if (res.data.resultCode === ResultCode.Success) {
        return {isLoggedIn: true}
    } else {
        dispatch(getCaptcha())
        const isShowAppError = !res.data.fieldsErrors.length
        return rejectWithValue({data: res.data, showGlobalError: isShowAppError})
    }
})

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>('auth/logout', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    const res = await authApi.logout()
    if (res.data.resultCode === ResultCode.Success) {
        dispatch(clearTasksAndTodolists())
        return {isLoggedIn: false}
    } else {
        return rejectWithValue({data: res.data, showGlobalError: false})
    }
})

const getCaptcha = createAppAsyncThunk<{ url: string | null }, undefined>('auth/getCaptcha', async (_, thunkAPI) => {
    const res = await securityAPI.getCaptcha()
    return {url: res.data.url}
})

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        captcha: null as string | null
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(getCaptcha.fulfilled, (state, action) => {
                state.captcha = action.payload.url
            })
    },
})

export const authSlice = slice.reducer
export const authThunks = {
    login,
    logout,
    getCaptcha
}
