import {createAction} from "@reduxjs/toolkit"
import {RequestStatusType} from "app/app-slice"

export const clearTasksAndTodolists = createAction("common/clear-tasks-todolists")
const setAppStatus = createAction<{status: RequestStatusType}>("common/set-app-status")
const setAppError = createAction<{error: string | null}>("common/set-app-error")
