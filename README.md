# SAMA 2026

React/Vite website for the `SAMA 2026` Brighton film festival programme.

## Stack

- React 18
- Vite 5
- GitHub Pages deployment via GitHub Actions

## Local development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Content structure

Festival content currently lives in [`src/data/siteData.js`](./src/data/siteData.js).

This includes:

- festival-level metadata
- programme entries
- venue data
- news/social items

That structure is intended to absorb incoming venue details and film metadata without rewriting the UI.

## GitHub Pages

The site is configured for deployment to GitHub Pages from the `main` branch through GitHub Actions.

After each push to `main`, GitHub Actions builds the app and deploys the contents of `dist/`.

Expected Pages URL:

`https://robkoeling.github.io/sama-2026/`
