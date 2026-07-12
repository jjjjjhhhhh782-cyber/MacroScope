# Backend

All Supabase and external data logic lives here.

- `supabaseClient.ts` — the single Supabase client instance. Import it from here, never create a second client.
- `auth.ts` — sign up, sign in, sign out and friendly error mapping.
- `types.ts` — TypeScript types mirroring the database tables.
- `worldbank.ts` — raw World Bank API access. Do not import from modules directly.
- `indicators.ts` — cached indicator access. The only data entry point for modules: fresh cache from Supabase, otherwise World Bank API with cache upsert, stale cache as a fallback when the API is down.
- `constants.ts` — indicator codes and the shared country list.

Database schema is defined in `/supabase/migrations`. The frontend uses only the anon key; row level security policies in the database control what each user can read and write.
