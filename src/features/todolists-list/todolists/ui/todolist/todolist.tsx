import React, { FC, memo, useCallback, useEffect } from "react"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { TodolistDomainType } from "features/todolists-list/todolists/model/todolists-slice"
import { useActions } from "common/utils/redux-utils"
import { Paper } from "@mui/material"
import { TaskType } from "features/todolists-list/tasks/api/tasks-api.types"
import { FilterTasksButtons } from "features/todolists-list/todolists/ui/todolist/filter-tasks-buttons/filter-tasks-buttons"
import { Tasks } from "features/todolists-list/todolists/ui/todolist/tasks/tasks"
import { TodolistTitle } from "features/todolists-list/todolists/ui/todolist/todolist-title/todolist-title"
import { tasksThunks } from "features/todolists-list/tasks/model/tasks-reducer"

type PropsType = {
  todolist: TodolistDomainType
  tasks: TaskType[]
  demo?: boolean
}

export const Todolist: FC<PropsType> = memo(({ todolist, tasks, demo = false }) => {
  const todolistId = todolist.id
  const { fetchTasks, addTask } = useActions(tasksThunks)

  useEffect(() => {
    if (demo) {
      return
    }
    fetchTasks(todolistId)
  }, [])

  const addTaskCallback = useCallback(
    (title: string) => {
      addTask({ title, todolistId })
    },
    [todolistId]
  )

  return (
    <Paper style={{ padding: "10px", position: "relative" }}>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"} />
      <div>
        <Tasks todolist={todolist} tasks={tasks} />
      </div>
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </Paper>
  )
})
