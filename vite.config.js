import {defineConfig} from "vite";
import {resolve} from "node:path";

function minifyInlineCss(html) {
    return html.replace(/<style>([\s\S]*?)<\/style>/gi, (_, css) => {
        const minified = css
            .replace(/\/\*[\s\S]*?\*\//g, "")
            .replace(/\s+/g, " ")
            .replace(/\s*([{}:;,>])\s*/g, "$1")
            .trim();

        return `<style>${minified}</style>`;
    });
}

const minifyHtmlPlugin = {
    name: "minify-html-and-inline-css",
    apply: "build",
    enforce: "post",
    transformIndexHtml: {
        order: "post",
        handler(html) {
            return minifyInlineCss(html)
                .replace(/<!--(?!\[if)[\s\S]*?-->/g, "")
                .replace(/>\s+</g, "><")
                .trim();
        },
    },
};

export default defineConfig({
    plugins: [minifyHtmlPlugin],
    server: {
        host: "0.0.0.0",
        port: 5173,
        proxy: {
            "/api": {
                target: "http://192.168.1.180",
                changeOrigin: true,
            },
            "/ws": {
                target: "ws://192.168.1.180",
                ws: true
            }
        },
    },
    build: {
        modulePreload: {
            polyfill: false,
        },
        minify: true,
        cssMinify: true,
        sourcemap: false,
        rolldownOptions: {
            input: {
                login: resolve(__dirname, "index.html"),
                app: resolve(__dirname, "app.html"),
            },
            output: {
                entryFileNames: "assets/[name].js",
                chunkFileNames: "assets/c-[name].js",
                assetFileNames: (assetInfo) => {
                    const name = assetInfo.names?.[0] || assetInfo.name || "asset";
                    const extension = name.split(".").pop()?.toLowerCase();

                    if (extension === "woff2") return "assets/font.woff2";
                    if (extension === "ico") return "assets/favicon.ico";
                    if (extension === "png") return "assets/logo.png";

                    return "assets/[name][extname]";
                },
            },
        },
    },
});
