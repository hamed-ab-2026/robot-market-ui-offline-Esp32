import {
    APP_MESSAGES,
    IRAN_MOBILE_REGEX,
    MIN_LOGIN_PASSWORD_LENGTH,
    MIN_NEW_PASSWORD_LENGTH,
} from "./auth.constants.js";

/**
 * Returns the Persian validation message for an invalid login attempt, or an
 * empty string when the credentials are ready to submit.
 */
export function validateLogin(username, password, isOtpLogin) {
    const normalizedUsername = String(username || "").trim();
    const normalizedPassword = String(password || "");

    if (isOtpLogin) {
        return IRAN_MOBILE_REGEX.test(normalizedUsername)
            ? ""
            : APP_MESSAGES.validation.invalid_mobile;
    }

    if (!normalizedUsername || !normalizedPassword) {
        return APP_MESSAGES.validation.credentials_required;
    }

    if (normalizedPassword.length < MIN_LOGIN_PASSWORD_LENGTH) {
        return APP_MESSAGES.validation.password_too_short;
    }

    return "";
}

/**
 * Checks the forced password-change form before the API call. The server still
 * owns final validation; this keeps common mistakes close to the form.
 */
export function validatePasswordChange({oldPassword, newPassword, confirmPassword, username}) {
    if (!oldPassword || !newPassword || !confirmPassword) {
        return APP_MESSAGES.validation.all_fields_required;
    }

    if (!username) {
        return APP_MESSAGES.auth.password_change_failed;
    }

    if (newPassword.length < MIN_NEW_PASSWORD_LENGTH) {
        return APP_MESSAGES.validation.new_password_too_short;
    }

    if (newPassword !== confirmPassword) {
        return APP_MESSAGES.validation.passwords_do_not_match;
    }

    return "";
}
