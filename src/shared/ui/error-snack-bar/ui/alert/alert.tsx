import React, {forwardRef} from 'react'
import {MuiAlert, AlertProps} from 'shared/ui/collections-mui'

export const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

