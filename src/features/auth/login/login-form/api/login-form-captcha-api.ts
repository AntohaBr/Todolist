import {GetCaptchaURLResponseType} from "features/auth/login/login-form/api/login-form-captcha-api-types";
import {commonApi} from "shared/api";

export const securityAPI = {
    getCaptcha() {
        return commonApi.get<GetCaptchaURLResponseType>(`security/get-captcha-url`)
    }
}