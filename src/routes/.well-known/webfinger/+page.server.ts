import { redirect } from '@sveltejs/kit';

export function load({ url }) {
	redirect(307, `https://fedi.limes.pink/.well-known/webfinger/?${url.searchParams.toString()}`);
}