import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yedncuuchererysnnrvy.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllZG5jdXVjaGVyZXJ5c25ucnZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMjMxMDIsImV4cCI6MjA2NDc5OTEwMn0.1WyoxdXOHfKczzPm3inVB-913ki-fxiXQHM1qYz9Nqg';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
