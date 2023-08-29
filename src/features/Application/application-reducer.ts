import {authAPI} from 'api/todolists-api'
import {authActions} from '../Auth'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {appActions} from '../CommonActions/App'

const initializeApp = createAsyncThunk('application/initializeApp', async (param, {dispatch}) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
    } else {

    }
})

export const asyncActions = {
    initializeApp
}

const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as string | null,
        isInitialized: false
    } as AppInitialStateType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.isInitialized = true
            })
            .addCase(appActions.setAppStatus, (state, action) => {
                state.status = action.payload.status
            })
            .addCase(appActions.setAppError, (state, action) => {
                state.error = action.payload.error
            })
    }
})


export const appReducer = slice.reducer
export const appAction = slice.actions

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppInitialStateType = ReturnType<typeof slice.getInitialState>
