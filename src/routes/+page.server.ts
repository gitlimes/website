import type { PageServerLoad } from './$types';

import { supabase } from '$lib/server/supabaseClient';

// key-value store to cache requests
import Keyv from 'keyv';
const keyv = new Keyv<number>({ ttl: 1000 * 60 * 30 });

export const load: PageServerLoad = async ({ url }) => {
	const stuffStats = {
		dcbadge: await keyv.get('dcbadge'),
		msgithub: await keyv.get('msgithub'),
		ite: -1
	};

	if (!stuffStats.msgithub) {
		try {
			const response = await fetch(`https://microsoftgithub.com/api/stats`);

			if (!response.ok) {
				throw new Error('Network error');
			}
			const data = await response.json();

			await keyv.set('msgithub', data.rickrolled.kusers); // cache for 30 minutes
			stuffStats.msgithub = data.rickrolled.kusers;
		} catch (error) {
			console.error('Error while fetching microsoftgithub stats:', error);
		}
	}

	if (!stuffStats.dcbadge) {
		try {
			const response = await fetch(`https://api.github.com/repos/gitlimes/dcbadge`);

			if (!response.ok) {
				throw new Error('Network error');
			}

			const data = await response.json();

			await keyv.set('dcbadge', data.stargazers_count); // cache for 30 minutes
			stuffStats.dcbadge = data.stargazers_count;
		} catch (error) {
			console.error('Error while fetching dcbadge stats:', error);
		}
	}

	if (url.searchParams.get('from') === 'italiantrainexperience.com') {
		try {
			await supabase.rpc('increment_page_view', {
				page_slug: 'ite-redirect'
			});
		} catch (e) {
			console.log('[ increment_page_view ]: Supabase dead, or no config provided.', e);
		}

		try {
			const iteStats = await supabase
				.from('pages')
				.select('view_count')
				.filter('slug', 'eq', 'ite-redirect');

			const iteViewCount = iteStats?.data?.[0]?.['view_count'];

			stuffStats.ite = iteViewCount;
		} catch (e) {
			console.log('[ get viewcount ]: Supabase dead, or no config provided.', e);
		}
	}

	return stuffStats;
};
