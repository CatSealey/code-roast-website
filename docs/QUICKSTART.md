# Quickstart

This guide covers setting up Code-Roast locally, running it, and making a first change.

## Prerequisites

- Node.js 18 or newer
- npm
- Git

## Set up the project

Clone the repository and install the locked dependencies:

```bash
git clone https://github.com/CatSealey/code-roast-website.git
cd code-roast-website
npm ci
```

## Start the development server

```bash
npm run dev
```

Vite serves the app at [http://localhost:3000](http://localhost:3000) and opens it in your browser. The server supports hot reload while you edit files.

The home page is available at `/`; its Brews section includes the post carousels.

## Make a change

- Page composition and routes are in `src/App.tsx`.
- Reusable page sections are in `src/components/`.
- The homepage Brews carousel is in `src/components/Brews.tsx`.
- English interface text is in `src/locales/en/translation.json`.
- Styles are organized under `src/styles/`; `src/main.tsx` imports the main stylesheet and initializes the app.
- Static images and other public assets are in `public/`.

Save a file and check the change in the browser; Vite refreshes the page as needed.

## Run tests and build

Run the test suite once:

```bash
npm test -- --run
```

Create a production build in `dist/`:

```bash
npm run build
```

To serve that build locally, first build it, then run:

```bash
npm run preview
```

Vite's preview server is available at [http://localhost:3001](http://localhost:3001).

## Useful scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm test -- --run` | Run tests once |
| `npm run test:coverage` | Run tests and collect coverage |
| `npm run lint` | Lint files under `src/` |
| `npm run build` | Create the production build |
| `npm run preview` | Preview the production build |

For more detail about the project structure and design decisions, see [ARCHITECTURE.md](./ARCHITECTURE.md).
