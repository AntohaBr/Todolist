import React, {useCallback, useEffect} from "react"
import "app/app.css"
import {ErrorSnackBar} from "common/components/error-snack-bar/error-snack-bar"
import {useSelector} from "react-redux"
import {Route, Routes} from "react-router-dom"
import {selectIsInitialized, selectStatus} from "app/app-selectors"
import {AppBar, Button, CircularProgress, Container, LinearProgress, Toolbar, Typography} from "@mui/material"
import {authThunks} from "features/auth/auth-slice"
import {TodolistsList} from "features/todolists-list/todolists-list"
import {Login} from "features/auth/Login"
import {appThunk} from "app/app-slice"
import {selectIsLoggedIn} from "features/auth/auth-selectors"
import {useActions} from "common/hooks"

type PropsType = {
  demo?: boolean
}

export const App = ({demo = false}: PropsType) => {
  const status = useSelector(selectStatus)
  const isInitialized = useSelector(selectIsInitialized)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const {logout} = useActions(authThunks)
  const {initializeApp} = useActions(appThunk)

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
      <div style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="App">
      <ErrorSnackBar />
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
