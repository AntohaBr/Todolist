import { TodolistDomainType, slice } from "features/todolists-list/todolists/model/todolists-slice"
import { slice as tasksSlice, TasksStateType } from "features/todolists-list/tasks/model/tasks-reducer"
import { todolistsActions } from "./"
import { TodolistType } from "features/todolists-list/todolists/api/todolists-api-types"

const todolistsReducer = slice.reducer
const tasksReducer = tasksSlice.reducer

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodolistDomainType> = []

  let todolist: TodolistType = {
    title: "new todolist",
    id: "any id",
    addedDate: "",
    order: 0,
  }

  const action = todolistsActions.addTodolistTC.fulfilled({ todolist }, "requestId", todolist.title)

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
