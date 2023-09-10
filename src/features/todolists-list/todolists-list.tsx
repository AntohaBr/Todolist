import React, { FC, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AddItemForm } from 'common/components'
import { Todolist } from 'features/todolists-list/todolists/ui/todolist/todolist'
import { Navigate } from 'react-router-dom'
import { selectIsLoggedIn } from 'features/auth/auth-selectors'
import s from 'features/todolists-list/todolists-list.module.css'
import { selectTasks } from 'features/todolists-list/tasks/model/task.selectors'
import { selectTodolists } from 'features/todolists-list/todolists/model/todolists-selectors'
import { todolistsThunks } from 'features/todolists-list/todolists/model/todolists-slice'
import { useActions } from 'common/hooks'
import { PATH } from 'common/enums'

type Props = {
  demo?: boolean
}

export const TodolistsList: FC<Props> = ({ demo = false }) => {
  const todolists = useSelector(selectTodolists)
  const tasks = useSelector(selectTasks)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { addTodolist, fetchTodolists } = useActions(todolistsThunks)

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return
    }
    fetchTodolists()
  }, [])

  const addTodolistCallback = useCallback((title: string) => {
    return addTodolist(title).unwrap()
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={PATH.Login} />
  }

  return (
    <>
      <div className={s.addTodolistContainer}>
        <AddItemForm addItem={addTodolistCallback} />
      </div>
      <div className={s.todolistsContainer}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id]

          return (
            <div key={tl.id}>
              <div className={s.todolist}>
                <Todolist todolist={tl} tasks={allTodolistTasks} demo={demo} />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
