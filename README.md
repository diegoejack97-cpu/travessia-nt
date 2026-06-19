# TRAVESSIA NT

App web gamificado para leitura do Novo Testamento em irmandade.

## Stack

- Vite
- React
- JavaScript
- Supabase
- CSS puro
- Mobile-first

## Ambiente

Copie `.env.example` para `.env` e preencha:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Produto

O MVP usa uma jornada visual inspirada em jogos 2D de aventura para acompanhar leituras, progresso, selos, mural e ranking. A integração com Supabase será feita por RPCs e views em etapas futuras.

## Deploy na Vercel

1. Importe o repositório na Vercel.
2. Framework: Vite.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Configure as variáveis:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Nenhum segredo real deve ser commitado. Use apenas chave pública/anon ou publishable no frontend.
