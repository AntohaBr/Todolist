import {TaskPrioritiesEnum, TaskStatusesEnum} from "shared/const";

export type TaskType = {
    description: string
    title: string
    status: TaskStatusesEnum
    priority: TaskPrioritiesEnum
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}