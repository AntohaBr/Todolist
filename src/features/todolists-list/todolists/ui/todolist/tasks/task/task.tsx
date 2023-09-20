import React, { ChangeEvent, FC, memo, useCallback } from 'react'
import { EditableSpan } from 'shared/ui'
import s from 'features/todolists-list/todolists/ui/todolist/tasks/task/task.module.css'
import { Delete, Checkbox, IconButton } from 'common/collections-mui'
import { TaskType } from 'features/todolists-list/tasks/api'
import { tasksThunks } from 'features/todolists-list/tasks/model/tasks-slice'
import { useActions } from 'common/hooks'
import {TaskStatusesEnum} from "shared/config";

type Props = {
  task: TaskType
  todolistId: string
}

export const Task: FC<Props> = memo(({ task, todolistId }) => {
  const taskId = task.id
  const { updateTask, removeTask } = useActions(tasksThunks)

  const onRemoveTask = useCallback(() => removeTask({ taskId, todolistId }), [taskId, todolistId])

  const onChangeTaskStatus = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked
      const status = newIsDoneValue ? TaskStatusesEnum.Completed : TaskStatusesEnum.New
      updateTask({ taskId, domainModel: { status }, todolistId })
    },
    [taskId, todolistId],
  )

  const onChangeTaskTitle = useCallback(
    (newValue: string) => {
      updateTask({
        taskId,
        domainModel: { title: newValue },
        todolistId,
      })
    },
    [taskId, todolistId],
  )

  return (
    <div key={taskId} className={`${task.status === TaskStatusesEnum.Completed ? s.isDone : ''} ${s.taskContainer}`}>
      <div>
        <Checkbox
          checked={task.status === TaskStatusesEnum.Completed}
          color="primary"
          onChange={onChangeTaskStatus}
          style={{ padding: '10px 5px 0px 0px' }}
        />
      </div>
      <p className={s.editableSpan}>
        <EditableSpan value={task.title} onChange={onChangeTaskTitle} />
      </p>
      <IconButton size={'small'} onClick={onRemoveTask} style={{ position: 'absolute', top: '8px', right: '2px' }}>
        <Delete fontSize={'small'} />
      </IconButton>
    </div>
  )
})
