export const ResultCode = {
  Success: 0,
  Error: 1,
  Captcha: 10,
} as const

export const PATH = {
  TodolistsList: '/',
  Login: '/login',
  Error404: '/error404',
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}
