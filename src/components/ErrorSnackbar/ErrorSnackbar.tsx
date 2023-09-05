import React from "react"
import { useSelector } from "react-redux"
import { appActions } from "features/CommonActions/App"
import { useActions } from "utils/redux-utils"
import { AlertProps, Snackbar } from "@mui/material"
import { selectError } from "features/Application/app.selectors"

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export const ErrorSnackbar = () => {
  const error = useSelector(selectError)

  const { setAppError } = useActions(appActions)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
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
}
