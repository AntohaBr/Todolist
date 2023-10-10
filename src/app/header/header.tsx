import React, { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from 'features/auth/model/auth-selectors'
import { useActions } from 'shared/lib/hooks/use-actions'
import { authThunks } from 'features/auth/model/auth-slice'
import { selectStatus } from 'app/app-selectors'
import { AppBar, Button, LinearProgress, Toolbar, Typography } from 'shared/ui/collections-mui'

export const Header: FC = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const status = useSelector(selectStatus)

  const { logout } = useActions(authThunks)

  const logoutHandler = useCallback(() => {
    logout()
  }, [])

  return (
    <>
      <AppBar position="static">
        <Toolbar className="toolbar">
          <Typography variant="h6">Todolist</Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandler}>
              Log out
            </Button>
          )}
        </Toolbar>
        {status === 'loading' && <LinearProgress />}
      </AppBar>
    </>
  )
}
