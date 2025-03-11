import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const dataparams = cookies.get('dataparams');

	return {
		dataparams
	};
};
