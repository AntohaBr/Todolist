import {GetCaptchaURLResponseType} from "features/auth/login/captcha/api/captcha-api-type";
import {commonApi} from "common/api";

export const securityAPI = {
    getCaptcha() {
        return commonApi.get<GetCaptchaURLResponseType>(`security/get-captcha-url`)
    }
}