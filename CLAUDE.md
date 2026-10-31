# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A simplified reader for the Drupal.org documentation, built with Next.js 15 (App Router), React 18, TypeScript 4.9, TanStack Query 5, Tailwind 3, and DaisyUI 2. There is no database: all content comes live from the drupal.org API. The README describes it as a work in progress, not production-ready.

## Commands

```bash
npm run dev        # dev server on http://localhost:3000
npm run build      # production build; also runs lint and type-check
npm run start      # serve the production build
npm run lint       # next lint
npx tsc --noEmit   # type-check only
```

There is no test framework, so there is no test command. Verify changes with lint, `tsc`, and the running app.

- Node 18.18+ is required by Next 15; the README's "v14" is out of date.
- `package-lock.json` and `yarn.lock` are both tracked and have been updated together, so a dependency change should update both.
- `API_URL` is optional and overrides the upstream API. No other environment variables are used.
- Lint baseline: one `beforeInteractive` warning in `app/document/page.tsx`.

## Architecture

### Data flow

```
drupal.org api-d7/node.json
  → app/api/document/route.ts          server-side proxy
  → app/services/api.ts                fetchDocuments / fetchDocument
  → app/hooks/useDocument(s).ts        React Query hooks
  → client components
```

- The route forwards only the params in `ALLOWED_PARAMS`. A new query param must be added there, or it is silently dropped.
- The route wraps the upstream response as `{data}` and returns 502 on upstream failure.
- `app/hooks/useFetch.tsx` and `usePageFetch.tsx` are unused legacy hooks. New data fetching goes through `services/api.ts` and React Query.
- React Query `staleTime` is 1 minute by default (`app/providers/query-provider.tsx`) and 5 minutes for `useDocument`.
- `services/api.ts` runs in the browser, so `cache: 'force-cache'` applies to the browser HTTP cache and the `next.revalidate` option has no effect.

### Rendering

- Almost all UI is client-rendered. `app/document/[nid]/page.tsx` is a thin server wrapper that unwraps the Promise `params` and renders `DocumentClient`.
- The root layout holds only the theme and query providers. `Navigation`, `Footer`, and `SearchContext` live in `app/document/layout.tsx`, so `/` has none of them.
- `app/document/loading.tsx` is the Suspense boundary that `useSearchParams()` in `app/document/page.tsx` depends on.

### Document HTML pipeline

`body.value` is remote, untrusted HTML. It reaches the page by one path:

```
filterContent (only when searching; wraps matches in <mark>)
  → prepareHTML
  → dangerouslySetInnerHTML in DocumentClient.tsx
```

`prepareHTML` rewrites relative `img` and `a` URLs to drupal.org, sets `target="_blank"`, wraps `<pre>` in DaisyUI's `mockup-code`, runs DOMPurify, and then assigns `heading-N` IDs to `h2`/`h3` elements without one. Those IDs come after DOMPurify because it strips IDs that clash with `document` properties. Any other markup change must run before DOMPurify, and anything rendered as HTML must pass through `prepareHTML`. It deliberately returns `''` on the server because DOMPurify needs a DOM, so document bodies are never server-rendered.

Parsing `body.value` for any other purpose must use `DOMParser`, never `innerHTML` on a live-document element, because `<img onerror>` handlers run even on a detached element. The table of contents reads its headings from `prepareHTML` output so its links match the rendered IDs.

### Search, categories, pagination

- The Navigation search box sets `SearchContext`. Search is client-side only and never reaches the API: the list filters the titles of the current 10-item page, and the document view highlights matches.
- Categories are hardcoded in `app/components/Facets/categories.tsx`, using drupal.org `og_group_ref_documentation` group IDs. The selected category lives in `/document?category=<id>`. `app/page.tsx` has its own hardcoded list.
- `findCategory` in `app/document/page.tsx` and the parent expansion in `Facets.tsx` only handle three levels of nesting.
- Pagination is zero-indexed. The last page number is parsed from the `last` URL in the API response.

### Conventions

- Types in `app/lib/types/types.d.ts` (`DocItem`, `DocsData`, `Category`) are ambient and need no import. `DocItem` is also the name of a component.
- `@/*` resolves to the repo root, so imports look like `@/app/components/...`.
- `next-themes` sets `data-theme` to `emerald` or `dracula`. DaisyUI semantic classes such as `bg-base-100` follow the theme; hardcoded colors do not.

### Placeholders

These look real but are static: `recentDocs` in `app/page.tsx` (fake IDs), and the Previous/Next cards, "5 min read", and feedback buttons in `DocumentClient.tsx`.
