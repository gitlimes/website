import { redirect } from '@sveltejs/kit';

export function load({ url }) {
	redirect(307, `https://pds.limes.pink/.well-known/atproto-did/?${url.searchParams.toString()}`);
}