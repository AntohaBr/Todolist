import axios, {AxiosError} from 'axios'
import {ResponseType} from 'api/types'
import {appActions} from 'features/CommonActions/App'

type ThunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}

// export const handleAsyncServerAppError = <D>(data: ResponseType<D>,
//                                              thunkAPI: ThunkAPIType,
//                                              showError = true) => {
//     if (showError) {
//         thunkAPI.dispatch(appActions.setAppError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
//     }
//     thunkAPI.dispatch(appActions.setAppStatus({status: 'failed'}))
//     return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
// }

// export const handleAsyncServerNetworkError = (error: AxiosError,
//                                               thunkAPI: ThunkAPIType,
//                                               showError = true) => {
//     if (showError) {
//         thunkAPI.dispatch(appActions.setAppError({error: error.message ? error.message : 'Some error occurred'}))
//     }
//     thunkAPI.dispatch(appActions.setAppStatus({status: 'failed'}))
//
//     return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
// }

export const handleServerNetworkError = (error: unknown, dispatch: AppDispatch): void => {
    let errorMessage = 'Some error occurred'

    if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error?.message || errorMessage
    } else if (error instanceof Error) {
        errorMessage = `Native error: ${error.message}`
    } else {
        errorMessage = JSON.stringify(error)
    }

    dispatch(appActions.setAppError({error: errorMessage}))
    dispatch(appActions.setAppStatus({status: 'failed'}))
}