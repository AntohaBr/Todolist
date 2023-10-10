import React, {FC, memo} from 'react'
import {useSelector} from 'react-redux'
import {selectError} from 'app/app-selectors'
import {useActions} from 'shared/lib/hooks/use-actions'
import {appActions} from 'app/app-slice'
import {Snackbar} from 'shared/ui'
import {Alert} from "shared/ui/error-snack-bar/ui";

export const ErrorSnackBar: FC = memo(() => {
    const error = useSelector(selectError)

    const {setAppError} = useActions(appActions)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setAppError({error: null})
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
