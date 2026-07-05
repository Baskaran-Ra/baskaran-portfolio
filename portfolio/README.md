# Baskaran R — Portfolio

A single dependency-free site: `index.html`, `style.css`, `script.js`. No build step, no npm install required.

## Run it locally
Just double-click `index.html`, or serve it properly:
```
npx serve .
```

## Add your real files
Drop these into the `assets/` folder (the page already points to them):
- `assets/profile.jpg` — your photo (4:5 ratio looks best, e.g. 800×1000px)
- `assets/Baskaran-Front-end-Developer.pdf` — your résumé (linked from the nav "Résumé" button)

If either file is missing, the layout still works — the photo slot just stays empty and the résumé link 404s until you add the PDF.

## Deploy
Drag the whole folder onto Netlify/Vercel's "deploy" drop zone, or push it to a GitHub repo and enable GitHub Pages — no configuration needed since it's static HTML/CSS/JS.

## Wire up the contact form
The form currently posts to the same Formbold endpoint as your original site
(`https://formbold.com/s/oYRO6`). Swap the `action` URL in `index.html` for
your own Formbold/Getform/Basin endpoint if you'd rather receive submissions
elsewhere.

## Structure
```
portfolio/
├── index.html      All markup + content (edit copy here)
├── style.css       Design tokens + all styling (see :root for the palette)
├── script.js       Scroll spy, reveal animations, code-typing effect, filters, form handling
└── assets/         Your photo + résumé PDF go here
```
