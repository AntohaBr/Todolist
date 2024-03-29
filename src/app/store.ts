import { configureStore } from '@reduxjs/toolkit'
import { appSlice } from 'app/app-slice'
import { authSlice } from 'features/auth/model/auth-slice'
import { tasksSlice } from 'features/todolists-list/tasks/model/tasks-slice'
import { todolistsSlice } from 'features/todolists-list/todolists/model/todolists-slice'

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
