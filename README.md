# Suahi — family stories

A responsive landing page built with React, TypeScript, TanStack Router, and Vite. Includes a family-story sample dialog and nine conversation prompts with copy-to-clipboard interaction. No accounts, server storage, or submissions; the page is a marketing concept with an interactive prompt preview.

## Develop

```sh
npm install
npm run dev
```

## Validate and build

```sh
npm run build
```

The build type-checks the project, then produces static output in `dist/`. Hosting metadata is in `.openai/hosting.json`.

- `app/page.tsx`: page sections, sample story, and conversation prompts.
- `app/globals.css`: responsive styling and theme.
- `app/main.tsx`: TanStack route configuration and page metadata.
- `public/images/family-memory.jpg`: original AI-generated illustrative family photograph.

The sample story is fictional and labeled as illustrative. Typography uses Google Fonts with local serif and sans-serif fallbacks. The image is served locally. The unused starter dependency catalog is retained to support future development; this site's build uses Vite and TanStack Router.
