import { configureStore } from "@reduxjs/toolkit"
import { appReducer } from "features/Application/application-reducer"
import { authReducer } from "features/Auth/auth.reducer"
import {tasksReducer} from "features/TodolistsList/tasks-reducer";
import {todolistsReducer} from "features/TodolistsList/todolists-reducer";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
  },
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store
