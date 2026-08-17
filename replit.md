# Copa Raceman Kart 2027 — Inscrição

Página de inscrição mobile-first onde interessados se inscrevem para a diretoria analisar seu ingresso no campeonato de kart.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

- Landing/inscrição em `/` (artifact `artifacts/inscricao`): hero com identidade do campeonato + ficha de inscrição (nome, WhatsApp, e-mail, cidade, ano de nascimento, nível de experiência, mensagem). Todo o conteúdo em PT-BR.
- API: `POST /api/registrations`, `GET /api/registrations`, `GET /api/registrations/stats` (rotas em `artifacts/api-server/src/routes/registrations.ts`; schema em `lib/db/src/schema/registrations.ts`).
- Inscrições entram com status `em_analise`; conteúdo baseado no media kit em `attached_assets/`.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
