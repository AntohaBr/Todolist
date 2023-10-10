import {GetCaptchaURLResponseType} from "features/auth/login/login-form/api/login-form-captcha-api-types";
import {commonInstance} from "shared/api";

export const securityAPI = {
    getCaptcha() {
        return commonInstance.get<GetCaptchaURLResponseType>(`security/get-captcha-url`)
    }
}