import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        sveltekit(),
        paraglideVitePlugin({
            project: './project.inlang',
            outdir: './src/lib/paraglide',
            strategy: ['cookie', 'preferredLanguage', 'url', 'baseLocale'],
            urlPatterns: [
                {
                    pattern: '/errors',
                    localized: [
                        ["en", "/errors"],
                        ["it", "/it/errori"]
                    ]
                },
                {
                    pattern: '/spinmii',
                    localized: [
                        ["en", "/spinmii"],
                        ["it", "/it/ruotamii"]
                    ]
                },
                {
                    pattern: '/it/errori',
                    localized: [
                        ["en", "/errors"],
                        ["it", "/it/errori"]
                    ]
                },
                {
                    pattern: '/it/ruotamii',
                    localized: [
                        ["en", "/spinmii"],
                        ["it", "/it/ruotamii"]
                    ]
                },
                {
                    pattern: "/:path(.*)?",
                    localized: [
                        ["it", "/it/:path(.*)?"],
                        ["en", "/:path(.*)?"],
                    ],
                },
            ],
        }),
        paraglideVitePlugin({
            project: './project.inlang',
            outdir: './src/lib/paraglide'
        })
    ]
});
