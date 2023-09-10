import React, { FC, forwardRef, memo } from 'react'
import { useSelector } from 'react-redux'
import { selectError } from 'app/app-selectors'
import { useActions } from 'common/hooks'
import { appActions } from 'app/app-slice'
import { MuiAlert, Snackbar, AlertProps } from 'common/collections-mui'

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const ErrorSnackBar: FC = memo(() => {
  const error = useSelector(selectError)

  const { setAppError } = useActions(appActions)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setAppError({ error: null })
  }

  const isOpen = error !== null

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  )
})
