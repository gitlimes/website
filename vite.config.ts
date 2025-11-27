import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['url', 'localStorage', 'preferredLanguage', 'baseLocale'],
			urlPatterns: [
				{
					pattern: '/errors',
					localized: [
						['it', '/it/errori'],
						['en', '/errors']
					]
				},
				{
					pattern: '/spinmii',
					localized: [
						['it', '/it/ruotamii'],
						['en', '/spinmii']
					]
				},
				{
					pattern: '/:path(.*)?',
					localized: [
						['it', '/it/:path(.*)?'],
						['en', '/:path(.*)?']
					]
				}
			]
		})
	]
});
