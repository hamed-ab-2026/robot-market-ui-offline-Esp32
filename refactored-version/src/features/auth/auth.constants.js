export const OTP_LENGTH = 4;
export const RESET_COUNTDOWN_SECONDS = 120;
export const SUBMIT_LOCK_MS = 3000;
export const MIN_LOGIN_PASSWORD_LENGTH = 6;
export const MIN_NEW_PASSWORD_LENGTH = 8;
export const IRAN_MOBILE_REGEX = /^09\d{9}$/;

export const APP_MESSAGES = Object.freeze({
    auth: {
        login_success: "ورود با موفقیت انجام شد",
        repass_success: "رمز عبور با موفقیت بازیابی شد",
        login_failed: "نام کاربری یا رمز عبور اشتباه است",
        Too_many_requests: "بیش از حد تلاش کرده‌اید",
        Unauthorized: "نام کاربری و رمز عبور صحیح نمیباشد",
        otp_sent: "کد یکبار مصرف برای شما ارسال شد",
        otp_invalid: "کد اشتباه است",
        otp_incomplete: "کد کامل نیست",
        change_password_required: "برای امنیت بیشتر رمز خود را عوض کنید",
        password_changed: "رمز عبور با موفقیت تغییر یافت",
        password_change_failed: "خطا در تغییر رمز عبور رخ داد",
        password_invalid: "رمز اشتباه است",
    },
    validation: {
        invalid_mobile: "شماره موبایل اشتباه است",
        credentials_required: "نام کاربری و پسورد الزامی است",
        password_too_short: "پسورد حداقل ۶ کاراکتر باید باشد",
        all_fields_required: "همه فیلدها الزامی است",
        new_password_too_short: "رمز جدید حداقل ۸ کاراکتر باید باشد",
        passwords_do_not_match: "رمزها یکسان نیستند",
    },
});
