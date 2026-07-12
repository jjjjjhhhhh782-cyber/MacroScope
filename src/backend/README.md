# Backend

All Supabase logic lives here.

- `supabaseClient.ts` — the single Supabase client instance. Import it from here, never create a second client.
- `types.ts` — TypeScript types mirroring the database tables.

Database schema is defined in `/supabase/migrations`. The frontend uses only the anon key; row level security policies in the database control what each user can read and write.
