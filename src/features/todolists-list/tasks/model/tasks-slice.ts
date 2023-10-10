import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'common/utils'
import {
  tasksApi,
  AddTaskArgType,
  RemoveTaskArgType,
  UpdateTaskArgType,
  UpdateTaskModelType,
} from 'features/todolists-list/tasks/api'
import { todolistsThunks } from 'features/todolists-list/todolists/model/todolists-slice'
import { appActions } from 'app/app-slice'
import {ResultCodeEnum} from "shared/const";
import {TaskType} from "entities/task";

const initialState: TasksStateType = {}

const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
  'tasks/fetchTasks',
  async (todolistId, thunkAPI) => {
    const res = await tasksApi.getTasks(todolistId)
    return { tasks: res.data.items, todolistId }
  },
)

const removeTask = createAppAsyncThunk<RemoveTaskArgType, RemoveTaskArgType>('tasks/removeTask', async (arg, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  const res = await tasksApi.deleteTask(arg)
  if (res.data.resultCode === ResultCodeEnum.Success) {
    return arg
  } else {
    return rejectWithValue({ data: res.data, showGlobalError: true })
  }
})

const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgType>('tasks/addTask', async (arg, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  const res = await tasksApi.createTask(arg)
  if (res.data.resultCode === ResultCodeEnum.Success) {
    return { task: res.data.data.item }
  } else {
    return rejectWithValue({ data: res.data, showGlobalError: false })
  }
})

const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>('tasks/updateTask', async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue, getState } = thunkAPI
  const state = getState()
  const task = state.tasks[arg.todolistId].find((t) => t.id === arg.taskId)
  if (!task) {
    dispatch(appActions.setAppError({ error: 'Task not found in the state' }))
    return rejectWithValue(null)
  }

  const apiModel: UpdateTaskModelType = {
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
    title: task.title,
    status: task.status,
    ...arg.domainModel,
  }

  const res = await tasksApi.updateTask(arg, apiModel)
  if (res.data.resultCode === ResultCodeEnum.Success) {
    return arg
  } else {
    return rejectWithValue({ data: res.data, showGlobalError: true })
  }
})

export const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
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
        const tasks = state[action.payload.task.todoListId]
        tasks.unshift(action.payload.task)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel }
        }
      })
  },
})

export const tasksSlice = slice.reducer
export const tasksThunks = {
  fetchTasks,
  removeTask,
  addTask,
  updateTask,
}

export type TasksStateType = Record<string, TaskType[]>
