import {createSlice} from "@reduxjs/toolkit"
import {authActions} from "features/auth/auth-slice"
import {authApi} from "features/auth/api/auth-api"
import {createAppAsyncThunk} from "common/utils"
import {ResultCode} from "common/enums";

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
    "app/initializeApp",
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            const res = await authApi.me()
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
            } else {
                return rejectWithValue(null)
            }
        } catch () {

        }

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
            .addCase(appActions.setAppStatus, (state, action) => {
                state.status = action.payload.status
            })
            .addCase(appActions.setAppError, (state, action) => {
                state.error = action.payload.error
            })
    },
})

export const appReducer = slice.reducer
export const appActions = slice.actions
export const appThunk = {initializeApp}

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type AppInitialStateType = ReturnType<typeof slice.getInitialState>
