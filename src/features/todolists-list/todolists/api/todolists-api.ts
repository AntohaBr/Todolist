import { TodolistType, UpdateTodolistTitleArgType } from 'features/todolists-list/todolists/api'
import { commonInstance } from 'shared/api'
import { BaseResponseType } from 'common/types'

export const todolistsApi = {
  getTodolists() {
    return commonInstance.get<TodolistType[]>('todo-lists')
  },
  createTodolist(title: string) {
    return commonInstance.post<BaseResponseType<{ item: TodolistType }>>('todo-lists', { title: title })
  },
  deleteTodolist(id: string) {
    return commonInstance.delete<BaseResponseType>(`todo-lists/${id}`)
  },
  updateTodolist(arg: UpdateTodolistTitleArgType) {
    return commonInstance.put<BaseResponseType>(`todo-lists/${arg.id}`, { title: arg.title })
  },
}
