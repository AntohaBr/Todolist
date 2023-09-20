import { TodolistType, UpdateTodolistTitleArgType } from 'features/todolists-list/todolists/api'
import { commonApi } from 'shared/api'
import { BaseResponseType } from 'common/types'

export const todolistsApi = {
  getTodolists() {
    return commonApi.get<TodolistType[]>('todo-lists')
  },
  createTodolist(title: string) {
    return commonApi.post<BaseResponseType<{ item: TodolistType }>>('todo-lists', { title: title })
  },
  deleteTodolist(id: string) {
    return commonApi.delete<BaseResponseType>(`todo-lists/${id}`)
  },
  updateTodolist(arg: UpdateTodolistTitleArgType) {
    return commonApi.put<BaseResponseType>(`todo-lists/${arg.id}`, { title: arg.title })
  },
}
