import React from "react"
import {FormikHelpers, useFormik} from "formik"
import {useSelector} from "react-redux"
import {Navigate} from "react-router-dom"
import {selectIsLoggedIn} from "features/auth/auth-selectors"
import s from "./Login.module.css"
import {useActions} from "common/hooks"
import {BaseResponseType} from "common/types"
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField} from "@mui/material"
import {authThunks} from "features/auth/auth-slice"

type FormValuesType = {
  email: string
  password: string
  rememberMe: boolean
}

export const Login = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const {login} = useActions(authThunks)

  const formik = useFormik({
    validate: (values) => {
      if (!values.email) {
        return {
          email: "Email is required",
        }
      }
      if (!values.password) {
        return {
          password: "Password is required",
        }
      }
    },
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: async (values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {
      login(values)
        .unwrap()
        .catch((reason: BaseResponseType) => {
          reason.fieldsErrors?.forEach((fieldError) => {
            formikHelpers.setFieldError(fieldError.field, fieldError.error)
          })
        })
    },
  })

  if (isLoggedIn) {
    return <Navigate to={"/"} />
  }

  return (
    <div className={s.loginContainer}>
      <div className={s.loginForm}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel className={s.loginFormLabel}>
              <p>
                To log in get registered{" "}
                <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>
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
            <FormGroup>
              <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
              {formik.errors.email ? <div style={{color: "red"}}>{formik.errors.email}</div> : null}
              <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps("password")} />
              {formik.errors.password ? <div style={{color: "red"}}>{formik.errors.password}</div> : null}
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe} />}
              />
              <Button type={"submit"} variant={"contained"} color={"primary"} style={{marginTop: 30}}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </div>
    </div>
  )
}
