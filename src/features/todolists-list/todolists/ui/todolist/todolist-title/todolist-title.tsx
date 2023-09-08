import { IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import s from "features/todolists-list/todolists/ui/todolist/todolist.module.css"
import { EditableSpan } from "common/components"
import React, { FC, useCallback } from "react"
import { TodolistDomainType, todolistsThunks } from "features/todolists-list/todolists/model/todolists-slice"
import { useActions } from "common/utils/redux-utils"

type Props = {
  todolist: TodolistDomainType
}

export const TodolistTitle: FC<Props> = ({ todolist }) => {
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks)

  const onRemoveTodolist = () => {
    removeTodolist(todolist.id)
  }

  const onChangeTodolistTitle = useCallback(
    (title: string) => {
      changeTodolistTitle({ id: todolist.id, title})
    },
    [todolist.id]
  )

  return (
    <>
      <IconButton
        size={"small"}
        onClick={onRemoveTodolist}
        disabled={todolist.entityStatus === "loading"}
        style={{ position: "absolute", right: "5px", top: "30px" }}
      >
        <Delete fontSize={"small"} />
      </IconButton>
      <h3 className={s.todolistTitle}>
        <EditableSpan value={todolist.title} onChange={onChangeTodolistTitle} />
      </h3>
    </>
  )
}
