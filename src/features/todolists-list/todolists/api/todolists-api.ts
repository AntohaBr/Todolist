import { TodolistType } from "features/todolists-list/todolists/api"
import { commonApi } from "common/api"
import { BaseResponseType } from "common/types"

export const todolistsApi = {
  getTodolists() {
    return commonApi.get<TodolistType[]>("todo-lists")
  },
  createTodolist(title: string) {
    return commonApi.post<BaseResponseType<{ item: TodolistType }>>("todo-lists", { title: title })
  },
  deleteTodolist(id: string) {
    return commonApi.delete<BaseResponseType>(`todo-lists/${id}`)
  },
  updateTodolist(id: string, title: string) {
    return commonApi.put<BaseResponseType>(`todo-lists/${id}`, { title: title })
  },
}
