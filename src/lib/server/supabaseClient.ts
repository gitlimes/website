import { createClient } from "@supabase/supabase-js";

import { SUPABASE_URL, SUPABASE_SERVICE_KEY } from '$env/static/private';

const supabaseUrl = SUPABASE_URL || "";
const supabaseServerKey = SUPABASE_SERVICE_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseServerKey);