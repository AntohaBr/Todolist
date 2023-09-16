import {Button, Checkbox, FormControlLabel, FormGroup, TextField} from 'common/collections-mui'
import React, {FC} from 'react'
import {FormikHelpers, useFormik} from 'formik'
import {LoginParamsType} from 'features/auth/api'
import {BaseResponseType} from 'common/types'
import {useActions} from 'common/hooks'
import {authThunks} from 'features/auth/auth-slice'
import {FormValuesType} from 'features/auth/login/login-form/login-form-types'

export const LoginForm: FC = () => {
    const {login} = useActions(authThunks)

    const formik = useFormik({
        validate: (values) => {
            const errors: FormValuesType = {}
            if (!values.email) {
                errors.email = 'Email is required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 3) {
                errors.password = 'Must be 3 characters or more'
            }

            return errors
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
            login(values)
                .unwrap()
                .catch((reason: BaseResponseType) => {
                    reason.fieldsErrors?.forEach((fieldError) => {
                        formikHelpers.setFieldError(fieldError.field, fieldError.error)
                    })
                })
        },
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <FormGroup>
                <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email ?
                    <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps('password')} />
                {formik.touched.password && formik.errors.password ?
                    <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                <FormControlLabel
                    label={'Remember me'}
                    control={<Checkbox {...formik.getFieldProps('rememberMe')} checked={formik.values.rememberMe}/>}
                />
                <Button
                    type={'submit'}
                    variant={'contained'}
                    disabled={!(formik.isValid && formik.dirty)}
                    color={'primary'}
                    style={{marginTop: 30}}
                >
                    Login
                </Button>
            </FormGroup>
        </form>
    )
}
