/**
 * Sends JSON-friendly browser requests and returns JSON, Blob, text, or a
 * success object for empty responses. UI layers pass callbacks for auth and
 * error presentation so this helper stays independent from the DOM.
 */
export async function requestWithAuth(url, {method = "GET", data = null, token = "", onUnauthorized, onForbidden, onError} = {}) {
    const normalizedMethod = String(method || "GET").toUpperCase();
    const headers = {};

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    if (data) {
        headers["Content-Type"] = "application/json";
    }

    try {
        const response = await fetch(url, {
            method: normalizedMethod,
            headers,
            body: data ? JSON.stringify(data) : undefined,
        });

        if (response.status === 401) {
            onUnauthorized?.(response);
            return {};
        }

        if (response.status === 403) {
            const message = await readErrorMessage(response, "شما اجازه انجام این عملیات را ندارید.");
            onForbidden?.(message, response);
            return {};
        }

        if (response.status >= 500 && response.status < 600) {
            const error = new Error("خطای سرور. لطفاً کمی بعد دوباره تلاش کنید.");
            error.isServerError = true;
            error.statusCode = response.status;
            throw error;
        }

        if (!response.ok) {
            throw new Error(`API_ERROR_${response.status}`);
        }

        return parseResponseBody(response);
    } catch (error) {
        onError?.(error);
        return {};
    }
}

/**
 * Sends a login-page request. Auth screens intentionally do not attach the
 * bearer token because they create or recover the session.
 */
export async function requestPublic(endpoint, options = {}) {
    const config = {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        ...options,
    };

    if (config.body && typeof config.body !== "string") {
        config.body = JSON.stringify(config.body);
    }

    const response = await fetch(endpoint, config);

    if (!response.ok) {
        throw new Error(`API_ERROR_${response.status}`);
    }

    return parseResponseBody(response);
}

async function parseResponseBody(response) {
    if (response.status === 204) return {success: true};

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
        return response.json();
    }

    if (contentType.toLowerCase().includes("text/csv")) {
        return response.blob();
    }

    return response.text();
}

async function readErrorMessage(response, fallbackMessage) {
    try {
        const errorBody = await response.json();
        return errorBody?.message || fallbackMessage;
    } catch {
        return fallbackMessage;
    }
}
