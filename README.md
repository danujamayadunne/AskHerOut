# Ask Her Out – a sweet interactive invite

An elegant, playful single-page Next.js experience to invite someone special on a date. It walks them through a few romantic prompts (date, dinner, movie), shows floating hearts, and can optionally save their answers to a Google Form.

## Features
- Floating heart animation and soft glassmorphism card layout.
- Step-by-step flow with calendar, food, and movie picks.
- Positive and “maybe not now” paths, with a gentle final screen.
- Optional Google Form submission (uses hidden form POST with `entry.12213123` or any field you set).

## Tech
- Next.js 14 (App Router)
- React 18
- Tailwind CSS + shadcn/ui button + react-day-picker calendar

## Quick start
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Environment variables (Google Form)
Add a `.env.local` in the project root if you want to capture answers in Google Forms:
```
NEXT_PUBLIC_GOOGLE_FORM_ACTION="https://docs.google.com/forms/d/e/.../formResponse"
NEXT_PUBLIC_GOOGLE_FORM_ENTRY_FIELD="entry.12213123"
```
- `NEXT_PUBLIC_GOOGLE_FORM_ACTION`: the form “action” URL (open your live form, View Source, search for `form action=`).
- `NEXT_PUBLIC_GOOGLE_FORM_ENTRY_FIELD`: the field name to post to (in source, each input has a name like `entry.12213123`). The app sends a single summary string to this field.
- Deployment note: `NEXT_PUBLIC_` vars must be set in your hosting environment (Vercel dashboard → Project Settings → Environment Variables).

If these vars are empty, the app still works; it just won’t POST to Google Forms.

## Customizing the invite
- Update copy, options, and images in `src/app/page.tsx`.
- Replace or add images under `public/` and point to them in the food/movie option arrays.
- Adjust theme colors or background in `src/app/globals.css`.
- Edit site metadata in `src/app/layout.tsx`.

## Build & production
```bash
npm run build
npm run start   # serves the built app
```

## Deploy
- Vercel: push to a Git repo and import; set env vars if using Google Forms.
- Any Node host: build, then run `npm start` on the server; serve on port 3000 (or set `PORT`).

## How the Google Form submission works
- On final submit, the app assembles a single summary string of the answers.
- It posts a `FormData` payload with that summary to your form action using `fetch` + `mode: "no-cors"`.
- To map multiple fields instead of one summary, add more `payload.append("entry.xxxxxx", value)` lines in `sendToGoogleForm` in `src/app/page.tsx`.
