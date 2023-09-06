import React, { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { AddItemForm, AddItemFormSubmitHelperType } from "common/components"
import { Todolist } from "features/todolists-list/todolists/ui/todolist/todolist"
import { Navigate } from "react-router-dom"
import { selectIsLoggedIn } from "features/auth/auth.selectors"
import { todolistsActions } from "./index"
import { useActions, useAppDispatch } from "common/utils/redux-utils"
import s from "features/todolists-list/todolists-list.module.css"
import { selectTasks } from "features/todolists-list/tasks/model/task.selectors"
import { selectTodolists } from "features/todolists-list/todolists/model/todolists-selectors"

type PropsType = {
  demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  const todolists = useSelector(selectTodolists)
  const tasks = useSelector(selectTasks)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const dispatch = useAppDispatch()

  const { fetchTodolistsTC } = useActions(todolistsActions)

  const addTodolistCallback = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
    let thunk = todolistsActions.addTodolistTC(title)
    const resultAction = await dispatch(thunk)

    if (todolistsActions.addTodolistTC.rejected.match(resultAction)) {
      if (resultAction.payload?.errors?.length) {
        const errorMessage = resultAction.payload?.errors[0]
        helper.setError(errorMessage)
      } else {
        helper.setError("Some error occured")
      }
    } else {
      helper.setTitle("")
    }
  }, [])

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return
    }
    fetchTodolistsTC()
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
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
