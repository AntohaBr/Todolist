import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {useSelector} from 'react-redux'
import {appActions} from 'features/CommonActions/App'
import {useActions} from 'utils'
import {selectError} from 'app/selectors'

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant='filled' {...props} />
}

export const ErrorSnackbar = () => {
    const error = useSelector(selectError)
    const {setAppError} = useActions(appActions)

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setAppError({error: null})
    }

    const isOpen = error !== null

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error'>
                {error}
            </Alert>
        </Snackbar>
    )
}
