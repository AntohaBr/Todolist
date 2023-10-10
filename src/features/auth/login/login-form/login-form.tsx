import {Button, Checkbox, FormControlLabel, FormGroup, TextField} from 'shared/ui/collections-mui'
import React, {FC} from 'react'
import {FormikHelpers, useFormik} from 'formik'
import {LoginParamsType} from 'features/auth/api'
import {BaseResponseType} from 'common/types'
import {useActions} from 'shared/lib/hooks/use-actions'
import {authThunks} from 'features/auth/model/auth-slice'
import {FormValuesType} from 'features/auth/login/login-form/login-form-types'
import s from "features/auth/login/login-form/login-form.module.css";
import {useSelector} from "react-redux";
import {selectCaptchaUrl} from "features/auth/model/auth-selectors";

export const LoginForm: FC = () => {
    const captchaUrl = useSelector(selectCaptchaUrl)

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

            // if (!formik.values.captcha) {
            //     errors.captcha = '11111111111111111111111111111111'
            // } else if (formik.values.captcha !== captchaUrl) {
            //     errors.captcha = 'Invalid'
            // }

            return errors
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: ''
        } as LoginParamsType,
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
                {captchaUrl &&
                    <div className={s.captcha_block}>
                        <img src={captchaUrl} alt="captcha" className={s.captcha_img}/>
                        <input
                            className={s.captcha_input}
                            id='Symbols from image'
                            name='captcha'
                            onChange={formik.handleChange}
                            value={formik.values.captcha}
                        />
                        {/*{formik.touched.captcha && formik.errors.captcha ?*/}
                        {/*    <div style={{color: 'red'}}>{formik.errors.captcha}</div> : null}*/}
                    </div>
                }
                <Button
                    type={'submit'}
                    variant={'contained'}
                    // disabled={!(formik.isValid && formik.dirty)}
                    color={'primary'}
                    style={{marginTop: 30}}
                >
                    Login
                </Button>
            </FormGroup>
        </form>
    )
}
