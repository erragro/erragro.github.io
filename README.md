# erragro.github.io portfolio

Multi-page static site. No build step, no dependencies.

```
index.html      hero + animated pipeline + cricket-engine visual + section cards
projects.html   flip cards, one per project (tap for the hard part)
work.html       timeline + expandable achievement cards
profile.html    flip skill cards + education timeline
style.css       shared design system
site.js         reveal-on-scroll, flip toggle, accordion, hero parallax
.nojekyll       serve files as-is
```

Internal links are relative, so it works as a user site or a project site.
Respects prefers-reduced-motion (all animation disabled).

## Deploy to GitHub Pages

User site (serves at https://erragro.github.io):

1. Create a repo named exactly `erragro.github.io`.
2. From this folder:
   ```
   git init && git add -A && git commit -m "portfolio"
   git branch -M main
   git remote add origin git@github.com:erragro/erragro.github.io.git
   git push -u origin main
   ```
3. Repo settings, Pages, Source: Deploy from a branch, main, / (root).

Project site instead: name the repo `portfolio`, same steps, serves at
https://erragro.github.io/portfolio
