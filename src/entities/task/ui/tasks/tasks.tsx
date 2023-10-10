import React, {FC} from 'react'
import {TodolistDomainType} from 'features/todolists-list/todolists/model/todolists-slice'
import {TaskStatusesEnum} from "shared/const";
import {TaskType} from "entities/task/index";
import {Task} from "entities/task/ui/task/task";

type Props = {
    todolist: TodolistDomainType
    tasks: TaskType[]
}

export const Tasks: FC<Props> = ({todolist, tasks}) => {
    let tasksForTodolist = tasks

    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatusesEnum.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatusesEnum.Completed)
    }
    return (
        <>
            {tasksForTodolist.map((t) => (
                <Task key={t.id} task={t} todolistId={todolist.id}/>
            ))}
            {!tasksForTodolist.length && <div style={{padding: '10px', color: 'grey'}}>No task</div>}
        </>
    )
}
