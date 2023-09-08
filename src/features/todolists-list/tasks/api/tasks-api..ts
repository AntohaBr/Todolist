import { commonApi } from "common/api"
import { BaseResponseType } from "common/types"
import { GetTasksResponse, TaskType, UpdateTaskModelType } from "features/todolists-list/tasks/api"

export const tasksApi = {
  getTasks(todolistId: string) {
    return commonApi.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  deleteTask(todolistId: string, taskId: string) {
    return commonApi.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  createTask(todolistId: string, taskTitile: string) {
    return commonApi.post<BaseResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title: taskTitile })
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return commonApi.put<BaseResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}
