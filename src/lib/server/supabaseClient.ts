import { createClient } from '@supabase/supabase-js';

import { SUPABASE_URL, SUPABASE_SERVICE_KEY } from '$env/static/private';

const supabaseUrl = SUPABASE_URL || '';
const supabaseServerKey = SUPABASE_SERVICE_KEY || '';

export let supabase;

if (process.env.NODE_ENV?.toString().includes('dev')) {
	supabase = undefined;
} else {
	supabase = createClient(supabaseUrl, supabaseServerKey);
}
