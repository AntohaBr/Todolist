import {TaskPrioritiesEnum, TaskStatusesEnum} from "shared/config";


export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
}
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
export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatusesEnum
  priority: TaskPrioritiesEnum
  startDate: string
  deadline: string
}
export type AddTaskArgType = {
  title: string
  todolistId: string
}
export type RemoveTaskArgType = {
  taskId: string
  todolistId: string
}
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatusesEnum
  priority?: TaskPrioritiesEnum
  startDate?: string
  deadline?: string
}
export type UpdateTaskArgType = {
  taskId: string
  domainModel: UpdateDomainTaskModelType
  todolistId: string
}
