import s from 'features/todolists-list/todolists/ui/todolist/todolist.module.css'
import { EditableSpan } from 'shared/ui'
import React, { FC, useCallback } from 'react'
import { TodolistDomainType, todolistsThunks } from 'features/todolists-list/todolists/model/todolists-slice'
import { useActions } from 'common/hooks'
import { Delete, IconButton } from 'common/collections-mui'

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
      changeTodolistTitle({ id: todolist.id, title })
    },
    [todolist.id],
  )

  return (
    <>
      <IconButton
        size={'small'}
        onClick={onRemoveTodolist}
        disabled={todolist.entityStatus === 'loading'}
        style={{ position: 'absolute', right: '5px', top: '30px' }}
      >
        <Delete fontSize={'small'} />
      </IconButton>
      <h3 className={s.todolistTitle}>
        <EditableSpan value={todolist.title} onChange={onChangeTodolistTitle} />
      </h3>
    </>
  )
}
