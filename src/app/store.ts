import { configureStore } from "@reduxjs/toolkit"
import { appSlice } from "app/app-slice"
import { authSlice } from "features/auth/auth-slice"
import { tasksReducer } from "features/todolists-list/tasks/model/tasks-reducer"
import { todolistsSlice } from "features/todolists-list/todolists/model/todolists-slice"

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsSlice,
    app: appSlice,
    auth: authSlice,
  },
})

// @ts-ignore
window.store = store
