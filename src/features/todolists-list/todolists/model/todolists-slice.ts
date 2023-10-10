import { todolistsApi, TodolistType, UpdateTodolistTitleArgType } from 'features/todolists-list/todolists/api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'common/utils'
import { RequestStatusType } from 'app/app-slice'
import {ResultCodeEnum} from "shared/const";

const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, undefined>('todolists/fetchTodolists', async (_, thunkAPI) => {
  const res = await todolistsApi.getTodolists()
  return { todolists: res.data }
})

const removeTodolist = createAppAsyncThunk<{ id: string }, string>('todolists/removeTodolist', async (id, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(todolistsActions.changeTodolistEntityStatus({ id, entityStatus: 'loading' }))
  const res = await todolistsApi.deleteTodolist(id)
  if (res.data.resultCode === ResultCodeEnum.Success) {
    return { id }
  } else {
    return rejectWithValue({ data: res.data, showGlobalError: true })
  }
})

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>('todolists/addTodolist', async (title, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  const res = await todolistsApi.createTodolist(title)
  if (res.data.resultCode === ResultCodeEnum.Success) {
    return { todolist: res.data.data.item }
  } else {
    return rejectWithValue({ data: res.data, showGlobalError: false })
  }
})

const changeTodolistTitle = createAppAsyncThunk<UpdateTodolistTitleArgType, UpdateTodolistTitleArgType>(
  'todolists/changeTodolistTitle',
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const res = await todolistsApi.updateTodolist(arg)
    if (res.data.resultCode === ResultCodeEnum.Success) {
      return arg
    } else {
      return rejectWithValue({ data: res.data, showGlobalError: false })
    }
  },
)

export const slice = createSlice({
  name: 'todolists',
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeTodolistFilter(state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      state[index].filter = action.payload.filter
    },
    changeTodolistEntityStatus(state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      state[index].entityStatus = action.payload.entityStatus
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.id)
        if (index > -1) {
          state.splice(index, 1)
        }
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.id)
        state[index].title = action.payload.title
      })
  },
})

export const todolistsSlice = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = {
  fetchTodolists,
  removeTodolist,
  addTodolist,
  changeTodolistTitle,
}

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
