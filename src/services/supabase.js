import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://aosgdkngijpvjknaoxro.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvc2dka25naWpwdmprbmFveHJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMjI1MzgsImV4cCI6MjA0MTc5ODUzOH0.097_nsEktHUo4VYzN50d0BdLFab9K7uVsSAd1kPrhJY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
