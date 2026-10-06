const TOKEN_KEY = "rm_token";
const USER_KEY = "rm_user";
const PASSWORD_CHANGE_USERNAME_KEY = "username";

export function getAuthToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function saveAuthSession(token, user) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, typeof user === "string" ? user : JSON.stringify(user));
}

export function saveAuthToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function clearAuthSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

export function savePasswordChangeUsername(username) {
    localStorage.setItem(PASSWORD_CHANGE_USERNAME_KEY, username);
}

export function getPasswordChangeUsername() {
    return localStorage.getItem(PASSWORD_CHANGE_USERNAME_KEY);
}

export function clearPasswordChangeUsername() {
    localStorage.removeItem(PASSWORD_CHANGE_USERNAME_KEY);
}
