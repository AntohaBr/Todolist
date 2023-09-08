import React, { useCallback, useEffect } from "react"
import "./App.css"
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar"
import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import { selectIsInitialized, selectStatus } from "app/app-selectors"
import { useActions } from "common/utils/redux-utils"
import { AppBar, Button, CircularProgress, Container, LinearProgress, Toolbar, Typography } from "@mui/material"
import { authActions } from "features/auth/auth-slice"
import { TodolistsList } from "features/todolists-list/todolists-list"
import { Login } from "features/auth/Login"
import { appActions } from "app/app-reducer"
import { selectIsLoggedIn } from "features/auth/auth-selectors"

type PropsType = {
  demo?: boolean
}

export const App = ({ demo = false }: PropsType) => {
  const status = useSelector(selectStatus)
  const isInitialized = useSelector(selectIsInitialized)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { logout } = useActions(authActions)
  const { initializeApp } = useActions(appActions)

  useEffect(() => {
    if (!demo) {
      initializeApp()
    }
  }, [])

  const logoutHandler = useCallback(() => {
    logout()
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar className="toolbar">
          <Typography variant="h6">Todolist</Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandler}>
              Log out
            </Button>
          )}
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path={"/"} element={<TodolistsList demo={demo} />} />
          <Route path={"/login"} element={<Login />} />
        </Routes>
      </Container>
    </div>
  )
}
