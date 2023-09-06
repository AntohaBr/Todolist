import React, { ChangeEvent, useCallback } from "react"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import { useActions } from "common/utils/redux-utils"
import s from "features/todolists-list/todolists/ui/todolist/task/task.module.css"
import { Checkbox, IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { TaskStatuses } from "common/enums"
import { TaskType } from "features/todolists-list/tasks/api/tasks.api.types"

type TaskPropsType = {
  task: TaskType
  todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {
  const { updateTask, removeTask } = useActions(tasksActions)

  const onClickHandler = useCallback(
    () => removeTask({ taskId: props.task.id, todolistId: props.todolistId }),
    [props.task.id, props.todolistId]
  )

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      updateTask({
        taskId: props.task.id,
        model: { status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New },
        todolistId: props.todolistId,
      })
    },
    [props.task.id, props.todolistId]
  )

  const onTitleChangeHandler = useCallback(
    (newValue: string) => {
      updateTask({
        taskId: props.task.id,
        model: { title: newValue },
        todolistId: props.todolistId,
      })
    },
    [props.task.id, props.todolistId]
  )

  return (
    <div
      key={props.task.id}
      className={`${props.task.status === TaskStatuses.Completed ? "is-done" : ""} ${s.taskContainer}`}
    >
      <div>
        <Checkbox
          checked={props.task.status === TaskStatuses.Completed}
          color="primary"
          onChange={onChangeHandler}
          style={{ padding: "10px 5px 0px 0px" }}
        />
      </div>
      <p className={s.editableSpan}>
        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
      </p>
      <IconButton size={"small"} onClick={onClickHandler} style={{ position: "absolute", top: "8px", right: "2px" }}>
        <Delete fontSize={"small"} />
      </IconButton>
    </div>
  )
})
