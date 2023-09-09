import React, {ChangeEvent, FC, memo, useCallback} from "react"
import {EditableSpan} from "common/components/editable-span/editable-span"
import s from "features/todolists-list/todolists/ui/todolist/tasks/task/task.module.css"
import {Checkbox, IconButton} from "@mui/material"
import {Delete} from "@mui/icons-material"
import {TaskStatuses} from "common/enums"
import {TaskType} from "features/todolists-list/tasks/api/tasks-api.types"
import {tasksThunks} from "features/todolists-list/tasks/model/tasks-slice"
import {useActions} from "common/hooks"

type Props = {
  task: TaskType
  todolistId: string
}

export const Task: FC<Props> = memo(({task, todolistId}) => {
  const taskId = task.id
  const {updateTask, removeTask} = useActions(tasksThunks)

  const onRemoveTask = useCallback(() => removeTask({taskId, todolistId}), [taskId, todolistId])

  const onChangeTaskStatus = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked
      const status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
      updateTask({taskId, domainModel: {status}, todolistId})
    },
    [taskId, todolistId]
  )

  const onChangeTaskTitle = useCallback(
    (newValue: string) => {
      updateTask({
        taskId,
        domainModel: {title: newValue},
        todolistId,
      })
    },
    [taskId, todolistId]
  )

  return (
    <div key={taskId} className={`${task.status === TaskStatuses.Completed ? s.isDone : ""} ${s.taskContainer}`}>
      <div>
        <Checkbox
          checked={task.status === TaskStatuses.Completed}
          color="primary"
          onChange={onChangeTaskStatus}
          style={{padding: "10px 5px 0px 0px"}}
        />
      </div>
      <p className={s.editableSpan}>
        <EditableSpan value={task.title} onChange={onChangeTaskTitle} />
      </p>
      <IconButton size={"small"} onClick={onRemoveTask} style={{position: "absolute", top: "8px", right: "2px"}}>
        <Delete fontSize={"small"} />
      </IconButton>
    </div>
  )
})
