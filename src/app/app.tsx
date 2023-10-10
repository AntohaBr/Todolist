import React, { FC, useEffect } from 'react'
import 'app/app.css'
import { ErrorSnackBar } from 'shared/ui'
import { useSelector } from 'react-redux'
import { selectIsInitialized } from 'app/app-selectors'
import { appThunk } from 'app/app-slice'
import { useActions } from 'shared/lib/hooks/use-actions'
import { PagesRoutes } from 'app/routes'
import { Header } from 'app/header'
import { CircularProgress } from 'shared/ui/collections-mui'

type Props = {
  demo?: boolean
}

export const App: FC<Props> = ({ demo }) => {
  const isInitialized = useSelector(selectIsInitialized)

  const { initializeApp } = useActions(appThunk)

  useEffect(() => {
    if (!demo) {
      initializeApp()
    }
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="App">
      <ErrorSnackBar />
      <Header />
      <PagesRoutes />
    </div>
  )
}
