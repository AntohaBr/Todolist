import React, {FC, memo} from 'react'
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {selectIsLoggedIn} from 'features/auth/auth-selectors'
import s from 'features/auth/login/login.module.css'
import {FormControl} from 'common/collections-mui'
import {PATH} from 'common/enums'
import {LoginForm} from 'features/auth/login/login-form/login-form'
import {LoginInfo} from "features/auth/login/login-info/login-info";
import {Captcha} from "features/auth/login/captcha/captcha";

export const Login: FC = memo(() => {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    if (isLoggedIn) {
        return <Navigate to={PATH.TodolistsList}/>
    }

    return (
        <div className={s.loginContainer}>
            <div className={s.loginForm}>
                <FormControl>
                    <LoginInfo/>
                    <LoginForm/>
                    <Captcha/>
                </FormControl>
            </div>
        </div>
    )
})
