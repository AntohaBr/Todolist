import { TodolistsList } from 'features/todolists-list/todolists-list'
import React, { FC } from 'react'
import { Login } from 'features/auth/login/login'
import { Route, Routes } from 'react-router-dom'
import { Page404 } from 'features/page-404/page-404'
import { Container } from 'shared/ui/collections-mui'
import {router} from "shared/const";

type Props = {
  demo?: boolean
}

export const PagesRoutes: FC<Props> = ({ demo }) => {
  return (
    <Container fixed>
      <Routes>
        <Route path={router.home} element={<TodolistsList demo={demo} />} />
        <Route path={router.login} element={<Login />} />
        <Route path={router.error404} element={<Page404 />} />
      </Routes>
    </Container>
  )
}
