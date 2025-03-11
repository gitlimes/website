import type { PageServerLoad } from './$types';

// key-value store to cache requests
import Keyv from 'keyv';
const keyv = new Keyv<number>({ ttl: 1000 * 60 * 30 });

export const load: PageServerLoad = async () => {
	const stuffStats = {
		dcbadge: await keyv.get('dcbadge'),
		msgithub: await keyv.get('msgithub')
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
			const response = await fetch(`https://api.github.com/repos/gitlimes/discord-md-badge`);

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

	return stuffStats;
};
