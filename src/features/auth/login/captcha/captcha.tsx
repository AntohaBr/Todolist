import React, {FC} from 'react'
import s from './captcha.module.css'
import {useSelector} from "react-redux";
import {selectCaptcha} from "features/auth/auth-selectors";

export const Captcha: FC = () => {
    const captcha = useSelector(selectCaptcha)

    return (
        <>
            {captcha &&
                <div className={s.captcha_block}>
                    <img src={captcha} alt="captcha" className={s.captcha_img}/>
                    <input
                        className={s.captcha_input}
                        id='Symbols from image'
                        name='captcha'
                        // onChange={formik.handleChange}
                        // value={formik.values.captcha}
                    />
                </div>
            }
        </>
    )
}