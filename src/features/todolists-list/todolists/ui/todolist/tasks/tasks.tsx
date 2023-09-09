import {Task} from "features/todolists-list/todolists/ui/todolist/tasks/task/task"
import React, {FC} from "react"
import {TaskStatuses} from "common/enums"
import {TaskType} from "features/todolists-list/tasks/api"
import {TodolistDomainType} from "features/todolists-list/todolists/model/todolists-slice"

type Props = {
  todolist: TodolistDomainType
  tasks: TaskType[]
}

export const Tasks: FC<Props> = ({todolist, tasks}) => {
  let tasksForTodolist = tasks

  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New)
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed)
  }
  return (
    <>
      {tasksForTodolist.map((t) => (
        <Task key={t.id} task={t} todolistId={todolist.id} />
      ))}
      {!tasksForTodolist.length && <div style={{padding: "10px", color: "grey"}}>No task</div>}
    </>
  )
}
