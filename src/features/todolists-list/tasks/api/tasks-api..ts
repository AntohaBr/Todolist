import {commonInstance} from 'shared/api'
import {BaseResponseType} from 'common/types'
import {
    AddTaskArgType,
    GetTasksResponse,
    RemoveTaskArgType,
    UpdateTaskArgType,
    UpdateTaskModelType,
} from 'features/todolists-list/tasks/api'
import {TaskType} from "entities/task";

export const tasksApi = {
    getTasks(todolistId: string) {
        return commonInstance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(arg: RemoveTaskArgType) {
        return commonInstance.delete<BaseResponseType>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`)
    },
    createTask(arg: AddTaskArgType) {
        return commonInstance.post<BaseResponseType<{ item: TaskType }>>(`todo-lists/${arg.todolistId}/tasks`, {
            title: arg.title,
        })
    },
    updateTask(arg: UpdateTaskArgType, apiModel: UpdateTaskModelType) {
        return commonInstance.put<BaseResponseType<TaskType>>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`, apiModel)
    },
}
