import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import path from 'path';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		prerender: {
			default: true
		},
		adapter: adapter({
			pages: 'docs',
			assets: 'docs',
			fallback: undefined
		}),
		paths: {
			// change below to your repo name
			base: dev ? '' : '/svelte-splitpanes'
		},
		vite: {
			resolve: {
				optimizeDeps: {
					include: ['highlight.js', 'highlight.js/lib/core']
				},
				alias: {
					$comp: path.resolve('./src/comp')
				}
			},
			server: {
				// configure vite for HMR with Gitpod
				hmr: process.env.GITPOD_WORKSPACE_URL
					? {
						// removes the protocol and replaces it with the port we're connecting to
						host: process.env.GITPOD_WORKSPACE_URL.replace('https://', '3000-'),
						protocol: 'wss',
						clientPort: 443
					}
					: true
			}			
		}



	}
};

export default config;
