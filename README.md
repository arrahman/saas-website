# Knowex AI — marketing website

*The Knowledge Exchange Company* · [knowex.ai](https://knowex.ai)

Single-page marketing site for Knowex AI: AI chat agents, voice agents and a shared knowledge base, sold on subscription.

Built with **Vite + React + TypeScript + Tailwind CSS**.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

## Project structure

```
src/
  data/content.ts      ← all copy, pricing, FAQs, contact details (edit here)
  components/          ← one component per section
    Navbar, Hero, Integrations, Products, HowItWorks,
    Solutions, Pricing, FAQ, Contact, Footer, Logo
  index.css            ← Tailwind layers + shared button/field styles
tailwind.config.js     ← color, font and width tokens
```

## Before launch

- Replace sample prices and limits in `src/data/content.ts`.
- Replace `[YOUR OFFICE ADDRESS]`, emails and the widget snippet values.
- Copy `.env.example` to `.env` and set `VITE_CONTACT_ENDPOINT` so the contact form sends real submissions.
- Link the Privacy and Terms pages in `Footer.tsx` and `Contact.tsx`.

## Deploy

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and publishes the site. Enable it once under **Settings → Pages → Source: GitHub Actions**.

Every push to `main` then publishes the site to `https://<user>.github.io/<repo>/`.

Also works as-is on Vercel or Netlify (build command `npm run build`, output `dist`).
