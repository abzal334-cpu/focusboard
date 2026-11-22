# AI Usage

## Tools used

- **Claude (Anthropic)**

## Representative prompts (paraphrased)

1. "Check my project and find out why the dashboard is not showing the correct content in the browser."
2. "Help me upload the project to GitHub and deploy it on Vercel."

## My contribution

- Set up the React + Vite project and installed `lucide-react`.
- Planned the folder structure (`components/`, `data/`, `hooks/`) following the reference guide.
- Wrote the first version of `App.jsx`: task state stored with a `useLocalStorage` hook, delete with a confirmation, and an edit handler.
- Created the GitHub repository and the Vercel deployment.

## AI-assisted parts

- Finding why the page was blank: the imported component, data and hook files were still empty, and `index.css` was the default Vite stylesheet.
- Completing the components (task form, filters, statistics, Focus Notes carousel, dialogs), the responsive CSS and the accessibility details.
- Drafting `README.md`.

## Suggestions checked or corrected

- A small error component was defined inside `TaskForm`, which re-creates it on every render. It was replaced with a plain helper function.
- At 390px the status tabs were cut off. The mobile layout was changed to a 2×2 grid.
- Lucide icon names were checked against the installed package version, because some icons were renamed in newer releases.

## Verification

- Automated browser checks on the final code: CRUD, validation, search, filters, the carousel, localStorage persistence, and layouts at 1440px, 768px and 390px.
- The deployed site was checked at https://focusboard-kappa.vercel.app.
