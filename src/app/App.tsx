import React, {useCallback, useEffect} from 'react'
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography,
    Menu
} from 'collections-mui'
import {TodolistsList} from 'features/TodolistsList'
import {ErrorSnackbar} from 'components'
import {useSelector} from 'react-redux'
import {appActions} from 'features/Application'
import {Route} from 'react-router-dom'
import {authActions, Login, authSelectors} from 'features/Auth'
import {selectIsInitialized, selectStatus} from 'features/Application/selectors'
import {useActions} from 'utils'

type PropsType = {}

export const App = (props: PropsType) => {
    const status = useSelector(selectStatus)
    const isInitialized = useSelector(selectIsInitialized)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)

    const {logout} = useActions(authActions)
    const {initializeApp} = useActions(appActions)
    useEffect(() => {
        if (!isInitialized) {
            initializeApp()
        }
    }, []);

    const logoutHandler = useCallback(() => {
        logout()
    }, [])
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div>
            <ErrorSnackbar/>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>
                        News
                    </Typography>
                    {isLoggedIn && <Button color='inherit' onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Route exact path={'/'} render={() => <TodolistsList demo={false}/>}/>
                <Route path={'/login'} render={() => <Login/>}/>
            </Container>
        </div>
    )
}

