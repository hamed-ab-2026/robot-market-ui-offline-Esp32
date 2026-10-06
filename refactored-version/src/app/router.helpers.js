/**
 * Resolves the current hash to a renderable route. The dev route is hidden in
 * production and should behave like a missing page when manually typed.
 */
export function resolveRoute(hash, {developMode = false} = {}) {
    const route = hash || "#/";

    if (route === "#/dev" && !developMode) {
        return {route, status: "not-found"};
    }

    return {route, status: "ok"};
}

/**
 * Runs the matched route handler. Handlers stay in app.js for now because each
 * render function still depends on shared page state during this incremental refactor.
 */
export async function runRouteHandler(route, handlers) {
    const handler = handlers[route];

    if (!handler) {
        handlers.notFound?.();
        return;
    }

    await handler();
}
