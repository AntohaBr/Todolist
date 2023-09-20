import { TodolistsList } from 'features/todolists-list/todolists-list'
import React, { FC } from 'react'
import { Login } from 'features/auth/login/login'
import { Route, Routes } from 'react-router-dom'
import { Page404 } from 'features/page-404/page-404'
import { Container } from 'common/collections-mui'
import {paths} from "shared/routing";

type Props = {
  demo?: boolean
}

export const PagesRoutes: FC<Props> = ({ demo }) => {
  return (
    <Container fixed>
      <Routes>
        <Route path={paths.home} element={<TodolistsList demo={demo} />} />
        <Route path={paths.login} element={<Login />} />
        <Route path={paths.error404} element={<Page404 />} />
      </Routes>
    </Container>
  )
}
