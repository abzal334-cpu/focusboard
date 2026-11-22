# AI Usage

## Tools used

- **Claude (Anthropic)**, used in a chat session with access to my project folder.

## Representative prompts

1. "I was not able to display the correct content in the browser. Can you check and let me know what needs to be changed to get the expected output."
2. "Now try accessing my project and find what is the issue."
3. "There is no Figma. I only got the reference material and the assignment link. Also, I want you to update the code accordingly."
4. "Clean up yourself and give me a final version to be uploaded to GitHub."

## What was AI-assisted

- **Debugging:** Claude found why the page was blank. `TaskList.jsx`, `sampleTasks.js` and `useLocalStorage.js` were empty files, so their default imports failed. It also found that `index.css` was still the default Vite stylesheet.
- **Code:** the components, the `useLocalStorage` hook, the sample data, `App.jsx` state logic and the responsive CSS were written with Claude's help.
- **Documentation:** first drafts of `README.md` and this file.
- **Clean-up:** removing unused Vite template files (`App.css`, demo assets) and taking the screenshots in `screenshots/`.

## Suggestions checked, corrected or rejected

- The first version of the task form defined a small `ErrorText` component *inside* `TaskForm`. That creates a new component on every render, which is a React anti-pattern. It was changed to a plain `renderError()` helper function.
- On a 390px screenshot the status tabs were cut off and had to be scrolled sideways. The mobile CSS was corrected so the tabs sit in a 2×2 grid.
- The Lucide icon names were checked against the installed `lucide-react` package before use. Newer versions renamed some icons, for example `CheckCircle2` → `CircleCheck`.

## Review and verification

- Most of the implementation was AI-generated. It was then reviewed and tested against the assignment requirements before submission.
- 37 automated browser checks were run on the final code: 6 sample tasks load; create, edit and delete work, including the delete confirmation; blank or spaces-only titles are rejected; status changes update the statistics; search is case-insensitive; status tabs and the priority filter work together; the carousel moves forward and back, wraps around, and its dots work; data survives a page refresh; corrupted storage falls back to the sample data; and there's no horizontal scrolling at 768px and 390px.
- After deployment, the live Vercel site (https://focusboard-kappa.vercel.app) was checked: the dashboard, statistics, carousel and create-task form all load and respond.
- The state management approach (a single `tasks` array in `App.jsx`, values derived with `useMemo`, and `localStorage` sync through `useLocalStorage`) is explained in `README.md`.
