import { TodolistsList } from 'features/todolists-list/todolists-list'
import React, { FC } from 'react'
import { Login } from 'features/auth/login/login'
import { PATH } from 'common/enums'
import { Route, Routes } from 'react-router-dom'
import { Page404 } from 'features/page-404/page-404'
import { Container } from 'common/collections-mui'

type Props = {
  demo?: boolean
}

export const PagesRoutes: FC<Props> = ({ demo }) => {
  return (
    <Container fixed>
      <Routes>
        <Route path={PATH.TodolistsList} element={<TodolistsList demo={demo} />} />
        <Route path={PATH.Login} element={<Login />} />
        <Route path={PATH.Error404} element={<Page404 />} />
      </Routes>
    </Container>
  )
}
