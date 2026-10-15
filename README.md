# Portfolio · Matthias Nowakowski

Personal portfolio of a research-based product engineer: music notation tools, digital scores for opera production and side projects around live coding and audio.

**Live:** https://mnowakow.github.io/portfolio/

## Stack

React 19, TypeScript, Vite, Tailwind CSS 4 with Material Tailwind, Iconoir icons.

## Development

```sh
npm ci
npm run dev      # local dev server
npm run lint
npm run build    # type check + production build into dist/
```

## Structure

- `src/Home.tsx` – landing page: intro, use cases, biography, publications, side projects
- `src/*Project.tsx` – one case study page per project, built from the blocks in `src/ProjectPage.tsx`
- `src/Publications.tsx` – publication list data
- `src/App.tsx` – hash based routing (`#vibe`, `#dob`, …), page titles, lazy loading of project pages

Images live in `src/assets` as WebP. New screenshots should be converted before committing, e.g. `cwebp -q 82 -resize 1600 0 in.png -o out.webp`.

## Deployment

Every push to `main` builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`.
