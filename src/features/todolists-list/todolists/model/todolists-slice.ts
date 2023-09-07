import { todolistsApi } from "features/todolists-list/todolists/api/todolists-api"
import { RequestStatusType } from "../Application"
import { appActions } from "features/CommonActions/App"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { handleServerAppError, handleServerNetworkError } from "common/utils"
import { TodolistType } from "features/todolists-list/todolists/api/todolists-api-types"
import { ThunkError } from "common/utils/types"
import { ResultCode } from "common/enums/common.enums"

const { setAppStatus } = appActions

const fetchTodolists = createAsyncThunk<{ todolists: TodolistType[] }, undefined, ThunkError>(
  "todolists/fetchTodolists",
  async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({ status: "loading" }))
    try {
      const res = await todolistsApi.getTodolists()
      thunkAPI.dispatch(setAppStatus({ status: "succeeded" }))
      return { todolists: res.data }
    } catch (error) {
      return handleServerNetworkError(error, thunkAPI)
    }
  }
)

const removeTodolist = createAsyncThunk<{ id: string }, string, ThunkError>(
  "todolists/removeTodolist",
  async (todolistId, { dispatch }) => {
    dispatch(setAppStatus({ status: "loading" }))
    dispatch(changeTodolistEntityStatus({ id: todolistId, status: "loading" }))
    await todolistsApi.deleteTodolist(todolistId)
    dispatch(setAppStatus({ status: "succeeded" }))
    return { id: todolistId }
  }
)

const addTodolist = createAsyncThunk<{ todolist: TodolistType }, string, ThunkError>(
  "todolists/addTodolist",
  async (title, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({ status: "loading" }))
    try {
      const res = await todolistsApi.createTodolist(title)
      if (res.data.resultCode === ResultCode.Success) {
        thunkAPI.dispatch(setAppStatus({ status: "succeeded" }))
        return { todolist: res.data.data.item }
      } else {
        return handleServerAppError(res.data, thunkAPI, false)
      }
    } catch (error) {
      return handleServerNetworkError(error, thunkAPI, false)
    }
  }
)

const changeTodolistTitle = createAsyncThunk(
  "todolists/changeTodolistTitle",
  async (param: { id: string; title: string }, thunkAPI) => {
    try {
      const res = await todolistsApi.updateTodolist(param.id, param.title)
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setAppStatus({ status: "succeeded" }))
        return { id: param.id, title: param.title }
      } else {
        return handleServerAppError(res.data, thunkAPI)
      }
    } catch (error) {
      return handleServerNetworkError(error, thunkAPI, false)
    }
  }
)

export const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeTodolistFilter(state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      state[index].filter = action.payload.filter
    },
    changeTodolistEntityStatus(state, action: PayloadAction<{ id: string; status: RequestStatusType }>) {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      state[index].entityStatus = action.payload.status
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.id)
        if (index > -1) {
          state.splice(index, 1)
        }
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.id)
        state[index].title = action.payload.title
      })
  },
})

export const todolistsSlice = slice.reducer
export const todolistsThunks = {
  fetchTodolists,
  removeTodolist,
  addTodolist,
  changeTodolistTitle,
}

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
