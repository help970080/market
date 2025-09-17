import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lmwxgdezzjcutbtpndka.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxtd3hnZGV6empjdXRidHBuZGthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwNzg4NzMsImV4cCI6MjA3MzY1NDg3M30.7Bkzv2wx1pHHxqcEfMUU0VI6unHkQce6CRTeH6BrqTw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);