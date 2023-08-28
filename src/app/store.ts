import {appReducer} from 'features/Application'
import {tasksReducer, todolistsReducer} from 'features/TodolistsList'
import {configureStore} from '@reduxjs/toolkit'
import {authReducer} from 'features/Auth'

export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        todolists: todolistsReducer,
        tasks: tasksReducer
    }
})

// @ts-ignore
window.store = store
