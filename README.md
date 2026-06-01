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

## Instagram

The Instagram profile is now configured in [`src/data/siteData.js`](./src/data/siteData.js) and will always show a direct profile link in the News and Contact sections.

To turn on the live post carousel:

1. Deploy `supabase/functions/instagram-feed`.
2. Set the Supabase function secrets `INSTAGRAM_USER_ID` and `INSTAGRAM_ACCESS_TOKEN`.
3. Set `VITE_INSTAGRAM_FEED_URL` to the deployed function URL.
4. Set `VITE_ENABLE_INSTAGRAM_FEED=true`.

For GitHub Pages builds, the workflow reads `VITE_INSTAGRAM_FEED_URL` and `VITE_ENABLE_INSTAGRAM_FEED` from GitHub repository variables, plus `VITE_SUPABASE_ANON_KEY` from GitHub secrets.

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
