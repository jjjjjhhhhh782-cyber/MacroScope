# MacroScope

Macroeconomic analytics platform. Five modules: Sanctions Impact, Inflation Forecast, Unemployment Analysis, Quality of Life Index, AI Crisis Explainer.

Live: https://macro-scope-sooty.vercel.app

## Stack

- React + TypeScript (Vite)
- Supabase: Postgres, Auth, Edge Functions
- Recharts for charts, lucide-react for icons
- Deployed on Vercel

## Data

Primary source is the open World Bank API. Responses are cached in Supabase. AI module calls the LLM only through a Supabase Edge Function; the key is stored in Supabase secrets and never reaches the frontend.

## Development

```
npm install
npm run dev
```

Copy `.env.example` to `.env` and fill in your Supabase project values. Never commit `.env`.

## Structure

```
/src
  /landing    public landing page
  /app        main application: dashboard and 5 modules
  /backend    all Supabase logic: client, queries, types
  /shared     shared UI components, styles, design tokens
/supabase     database migrations and Edge Functions
```
