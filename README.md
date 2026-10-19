# LearnLingo 🌍

Find a language teacher who matches your goals, level, and learning style.

> **Status: first development milestone.** Routing, navigation, and the home
> page foundation are implemented. A five-color palette switcher saves the selected
color scheme in localStorage and restores it on reload. Teachers and Favorites are placeholder pages.

## Technology stack

React · TypeScript · Vite · React Router · CSS Modules · modern-normalize · ESLint

## Run locally

```bash
npm ci
npm run dev
```

Open the local address printed in the terminal.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Check code with ESLint |
| `npm run build` | Check TypeScript and create the production build |
| `npm run preview` | Preview the production build locally |

## Project structure

```text
public/                  Images, favicon, and SVG sprite
src/
├── components/
│   ├── App/             Application routes and shared layout
│   ├── Navigation/      Main navigation
│   ├── PageIntro/       Shared introductory layout for starter pages
│   ├── PaletteSwitcher/ Five accessible palette controls
│   └── PlatformStats/   Company statistics with a themed dashed border
├── pages/
│   ├── WelcomePage/     Home page foundation
│   ├── TutorsPage/      Teacher directory placeholder
│   ├── SavedPage/       Favorites placeholder
│   └── NotFoundPage/    Unknown-route fallback
├── data/               Palette options and saved preference helpers
├── index.css            Reset, design variables, and shared container
└── main.tsx             React entry point and router
```

## Routes

| URL | Page |
| --- | --- |
| `/` | Home |
| `/teachers` | Teachers |
| `/favorites` | Favorites |
| Any other path | Page not found |

Favorites is not protected yet. Firebase Authentication and user-specific
access will be added in the next milestone.

## Design and requirements

[LearnLingo design in Figma](https://www.figma.com/file/dewf5jVviSTuWMMyU3d8Mc/)

The implementation follows the LearnLingo educational specification. The full
application will include:

- Firebase Authentication: registration, login, session restoration, and logout.
- Teacher profiles stored in Firebase Realtime Database.
- Four cards per page with further database requests on Load more.
- Filtering by language, student proficiency level, and hourly rate.
- Persistent favorites and a private Favorites page.
- Expanded teacher information and student reviews.
- Registration, login, and trial lesson forms using React Hook Form and Yup.
- Modal dismissal through the close button, backdrop, and Escape key.
- Responsive mobile, tablet, and desktop layouts.

Images, the favicon, SVG icons, and initial CSS values come from the supplied
reference project. Components and styles are organized using the conventions
of the author's earlier React projects. Five palette options update the hero illustration, the language highlight,
buttons, hover colors, navigation accents, and the dashed statistics border.
Hero images use matching 1× and 2× WebP files through `srcSet`, following the
image-density conventions used in the author's earlier projects.
Shared CSS variables will also be used for selected filters and favorite states
when those features are implemented. Full visual comparison with Figma is pending.

## Next milestones

1. Implement the remaining interface and Firebase integration.
2. Verify all required interactions, finish documentation, and deploy.

## Deployment

Deployment is pending. `vercel.json` includes a single-page application rewrite
so direct visits to client-side routes can be served on Vercel.
