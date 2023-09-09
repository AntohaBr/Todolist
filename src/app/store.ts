import { configureStore } from "@reduxjs/toolkit"
import { appSlice } from "app/app-slice"
import { authSlice } from "features/auth/auth-slice"
import { tasksSlice } from "features/todolists-list/tasks/model/tasks-reducer"
import { todolistsSlice } from "features/todolists-list/todolists/model/todolists-slice"

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    todolists: todolistsSlice,
    app: appSlice,
    auth: authSlice,
  },
})

// @ts-ignore
window.store = store
