import { appActions } from "features/CommonActions/App"
import { BaseResponseType } from "common/types/common-types"

export const handleServerAppError = <D>(data: BaseResponseType<D>, thunkAPI: ThunkAPIType, showError = true) => {
  if (showError) {
    thunkAPI.dispatch(
      appActions.setAppError({
        error: data.messages.length ? data.messages[0] : "Some error occurred",
      })
    )
  }
  thunkAPI.dispatch(appActions.setAppStatus({ status: "failed" }))
  return thunkAPI.rejectWithValue({
    errors: data.messages,
    fieldsErrors: data.fieldsErrors,
  })
}

type ThunkAPIType = {
  dispatch: (action: any) => any
  rejectWithValue: Function
}
