import {FormLabel} from "common/collections-mui";
import s from "features/auth/login/login-info/login-info.module.css";
import React from "react";

export const LoginInfo = () => {
    return (
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
    )
}