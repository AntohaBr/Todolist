import { configureStore } from "@reduxjs/toolkit"
import { appReducer } from "app/app-reducer"
import { authSlice } from "features/auth/auth-slice"
import { tasksReducer } from "features/todolists-list/tasks/model/tasks-reducer"
import { todolistsSlice } from "features/todolists-list/todolists/model/todolists-slice"

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsSlice,
    app: appReducer,
    auth: authSlice,
  },
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store
