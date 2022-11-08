import {authAPI, StatusCode} from "../api/todolists-api";
import {Dispatch} from "redux";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState: InitialStateType = {
    isInitialized: false,
    status: 'idle',
    error: null
}

//reducer
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZE':
            return {...state, isInitialized: action.isInitialized}
        default:
            return {...state}
    }
}


export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setinitializeAC = (isInitialized: boolean) => ({type: 'APP/SET-INITIALIZE',isInitialized} as const)


//thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then((res) => {
            if (res.data.resultCode === StatusCode.Ok) {
                const action = setIsLoggedInAC(true)
                dispatch(action)
                dispatch(setinitializeAC(true))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        })
}


//types
export type etinitializeACtype = ReturnType<typeof setinitializeAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | etinitializeACtype
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    isInitialized: boolean
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
}