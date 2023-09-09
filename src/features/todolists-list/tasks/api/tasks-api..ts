import {commonApi} from "common/api"
import {BaseResponseType} from "common/types"
import {
  AddTaskArgType,
  GetTasksResponse,
  RemoveTaskArgType,
  TaskType,
  UpdateTaskArgType,
  UpdateTaskModelType,
} from "features/todolists-list/tasks/api"

export const tasksApi = {
  getTasks(todolistId: string) {
    return commonApi.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  deleteTask(arg: RemoveTaskArgType) {
    return commonApi.delete<BaseResponseType>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`)
  },
  createTask(arg: AddTaskArgType) {
    return commonApi.post<BaseResponseType<{item: TaskType}>>(`todo-lists/${arg.todolistId}/tasks`, {
      title: arg.title,
    })
  },
  updateTask(arg: UpdateTaskArgType, apiModel: UpdateTaskModelType) {
    return commonApi.put<BaseResponseType<TaskType>>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`, apiModel)
  },
}
