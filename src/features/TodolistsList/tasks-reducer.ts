import { todolistsApi } from "api/todolists.api"
import { createSlice } from "@reduxjs/toolkit"
import { appActions } from "../CommonActions/App"
import { asyncActions as asyncTodolistsActions } from "./todolists-reducer"
import { AppRootStateType, ThunkError } from "common/utils/types"
import { TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType } from "api/types"
import { createAppAsyncThunk } from "common/utils/create.async.thunk"
import { handleServerAppError, handleServerNetworkError } from "common/utils"
import { ResultCode } from "common/enums/common.enums"

const initialState: TasksStateType = {}

const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
  "tasks/fetchTasks",
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      thunkAPI.dispatch(appActions.setAppStatus({ status: "loading" }))
      const res = await todolistsApi.getTasks(todolistId)
      const tasks = res.data.items
      thunkAPI.dispatch(appActions.setAppStatus({ status: "succeeded" }))
      return { tasks, todolistId }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  }
)

const removeTask = createAppAsyncThunk<
  { taskId: string; todolistId: string },
  { taskId: string; todolistId: string },
  ThunkError
>("tasks/removeTask", async (param, thunkAPI) => {
  const res = await todolistsApi.deleteTask(param.todolistId, param.taskId)
  return { taskId: param.taskId, todolistId: param.todolistId }
})

const addTask = createAppAsyncThunk<TaskType, { title: string; todolistId: string }>(
  "tasks/addTask",
  async (param, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus({ status: "loading" }))
    try {
      const res = await todolistsApi.createTask(param.todolistId, param.title)
      if (res.data.resultCode === ResultCode.Success) {
        thunkAPI.dispatch(appActions.setAppStatus({ status: "succeeded" }))
        return res.data.data.item
      } else {
        handleServerAppError(res.data, thunkAPI, false)
        return thunkAPI.rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsErrors })
      }
    } catch (err) {
      return handleServerNetworkError(err, thunkAPI, false)
    }
  }
)

const updateTask = createAppAsyncThunk(
  "tasks/updateTask",
  async (param: { taskId: string; model: UpdateDomainTaskModelType; todolistId: string }, thunkAPI) => {
    const state = thunkAPI.getState() as AppRootStateType

    const task = state.tasks[param.todolistId].find((t) => t.id === param.taskId)
    if (!task) {
      return thunkAPI.rejectWithValue("task not found in the state")
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...param.model,
    }
    const res = await todolistsApi.updateTask(param.todolistId, param.taskId, apiModel)
    try {
      if (res.data.resultCode === ResultCode.Success) {
        return param
      } else {
        return handleServerAppError(res.data, thunkAPI)
      }
    } catch (error) {
      return handleServerNetworkError(error, thunkAPI)
    }
  }
)

export const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncTodolistsActions.addTodolistTC.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(asyncTodolistsActions.removeTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(asyncTodolistsActions.fetchTodolistsTC.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl: any) => {
          state[tl.id] = []
        })
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index > -1) {
          tasks.splice(index, 1)
        }
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state[action.payload.todoListId].unshift(action.payload)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index > -1) {
          tasks[index] = { ...tasks[index], ...action.payload.model }
        }
      })
  },
})

export const tasksReducer = slice.reducer
export const tasksAction = slice.actions
export const tasksThunks = {
  fetchTasks,
  removeTask,
  addTask,
  updateTask,
}

// types
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
export type TasksStateType = {
  [key: string]: TaskType[]
}
