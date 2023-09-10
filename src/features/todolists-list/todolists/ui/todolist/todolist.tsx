import React, { FC, memo, useCallback, useEffect } from 'react'
import { AddItemForm } from 'common/components'
import { TodolistDomainType } from 'features/todolists-list/todolists/model/todolists-slice'
import { TaskType } from 'features/todolists-list/tasks/api'
import { FilterTasksButtons } from 'features/todolists-list/todolists/ui/todolist/filter-tasks-buttons/filter-tasks-buttons'
import { Tasks } from 'features/todolists-list/todolists/ui/todolist/tasks/tasks'
import { TodolistTitle } from 'features/todolists-list/todolists/ui/todolist/todolist-title/todolist-title'
import { tasksThunks } from 'features/todolists-list/tasks/model/tasks-slice'
import { useActions } from 'common/hooks'
import { Paper } from 'common/collections-mui'

type Props = {
  todolist: TodolistDomainType
  tasks: TaskType[]
  demo?: boolean
}

export const Todolist: FC<Props> = memo(({ todolist, tasks, demo = false }) => {
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
      return addTask({ title, todolistId }).unwrap()
    },
    [todolistId],
  )

  return (
    <Paper style={{ padding: '10px', position: 'relative' }}>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'} />
      <div>
        <Tasks todolist={todolist} tasks={tasks} />
      </div>
      <div style={{ paddingTop: '10px' }}>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </Paper>
  )
})
