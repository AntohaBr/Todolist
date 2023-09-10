import React, { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectIsLoggedIn } from 'features/auth/auth-selectors'
import s from 'features/auth/login/login.module.css'
import { FormControl, FormLabel } from 'common/collections-mui'
import { PATH } from 'common/enums'
import { LoginForm } from 'features/auth/login/login-form/login-form'

export const Login: FC = memo(() => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  if (isLoggedIn) {
    return <Navigate to={PATH.TodolistsList} />
  }

  return (
    <div className={s.loginContainer}>
      <div className={s.loginForm}>
        <FormControl>
          <FormLabel className={s.loginFormLabel}>
            <p>
              To log in get registered{' '}
              <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                <b>here</b>
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email: free@samuraijs.com</b>
            </p>
            <p>
              <b>Password: free</b>
            </p>
          </FormLabel>
          <LoginForm />
        </FormControl>
      </div>
    </div>
  )
})
