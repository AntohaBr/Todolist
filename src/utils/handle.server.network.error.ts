import axios from "axios"
import { appActions } from "features/CommonActions/App"
import { AppDispatch } from "app/store"

export const handleServerNetworkError = (error: unknown, dispatch: AppDispatch): void => {
  let errorMessage = "Some error occurre"

  if (axios.isAxiosError(error)) {
    errorMessage = error.response?.data?.message || error?.message || errorMessage
  } else if (error instanceof Error) {
    errorMessage = `Native error: ${error.message}`
  } else {
    errorMessage = JSON.stringify(error)
  }

  dispatch(appActions.setAppError({ error: errorMessage }))
  dispatch(appActions.setAppStatus({ status: "failed" }))
}
