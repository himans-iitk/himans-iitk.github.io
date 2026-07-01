# Himanshu Mishra — Personal Website

Minimal-academic, single-page static site. No build step, no dependencies.

## Preview locally
Open `index.html` directly in a browser, or serve it:
```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Fill in your content
Search the project for `[[` — every placeholder is wrapped in double brackets.
Replace each one with your real info. The main ones:

- `[[EMAIL]]`, `[[CV_PDF_LINK]]`, `[[SCHOLAR_LINK]]`, `[[LINKEDIN_LINK]]`, `[[GITHUB_LINK]]`, `[[TWITTER_LINK]]`, `[[CALENDLY_LINK]]`
- `[[INTERNSHIP_TERM]]`, `[[LOCATION_PREF]]`, `[[ADVISOR]]`
- Add your headshot as `headshot.jpg` (square image) and replace `[[headshot.jpg]]` with `headshot.jpg`
- Duplicate a `.pub` block in `index.html` for each publication
- Duplicate a `.timeline-item` for each role/degree

## Deploy (free)
- **GitHub Pages:** push to a repo, enable Pages on the `main` branch.
- **Netlify / Vercel:** drag-and-drop the folder, or connect the repo.

## Customize the look
All colors/fonts live at the top of `styles.css` under `:root`.
Change `--accent` (currently a muted maroon) to make it yours.
