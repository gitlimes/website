import { redirect } from '@sveltejs/kit';

export function load({ params }) {
	redirect(307, `https://fedi.limes.pink/.well-known/webfinger/${params.path}`);
}