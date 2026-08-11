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
                target: "http://192.168.1.118",
                changeOrigin: true,
            },
        },
    },
    build: {
        minify: true,
        cssMinify: true,
        sourcemap: false,
        rolldownOptions: {
            input: {
                login: resolve(__dirname, "index.html"),
                app: resolve(__dirname, "app.html"),
            },
            output: {
                entryFileNames: "assets/[name]-[hash].js",
                chunkFileNames: "assets/[name]-[hash].js",
                assetFileNames: "assets/[name]-[hash][extname]",
            },
        },
    },
});
