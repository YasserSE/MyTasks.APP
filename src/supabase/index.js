import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ovzusbqrsxvgsaluulph.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92enVzYnFyc3h2Z3NhbHV1bHBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEyMjk3MjcsImV4cCI6MTk5NjgwNTcyN30.mn30v5UIMolxbsZBMp3DD1wUPXBawJf9eQ7zP9YABBw'
export default createClient(supabaseUrl, supabaseKey)