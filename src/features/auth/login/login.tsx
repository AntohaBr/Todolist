import React, {FC, memo} from 'react'
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {selectIsLoggedIn} from 'features/auth/model/auth-selectors'
import s from 'features/auth/login/login.module.css'
import {FormControl} from 'common/collections-mui'
import {LoginForm} from 'features/auth/login/login-form/login-form'
import {LoginInfo} from "features/auth/login/login-info/login-info"
import {paths} from "shared/routing";

export const Login: FC = memo(() => {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    if (isLoggedIn) {
        return <Navigate to={paths.home}/>
    }

    return (
        <div className={s.loginContainer}>
            <div className={s.loginForm}>
                <FormControl>
                    <LoginInfo/>
                    <LoginForm/>
                </FormControl>
            </div>
        </div>
    )
})
