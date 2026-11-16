# EZY DEV.

The studio site is the first application in a deliberately simple monorepo path. At this stage it lives at the repository root as a single Next.js App Router app. Keep the concept portfolio inside this app while its products are being built; split a product into `apps/<product>` once it needs an independent runtime, deployment, or dependency set. Shared packages would be premature until there is code to share.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Production commands are `npm run build` and `npm run start`; linting uses `npm run lint`.

## Contact form status

The form validates required fields in the browser and prepares an email in the visitor’s configured email app. It does not send, store, or transmit form data. Replace this flow with a server-side endpoint (and server-only email provider credentials) before describing enquiries as submitted on the site.

## Current scope

The initial page includes studio positioning, concept work cards, services, process, and a contact form. Concept work is explicitly labelled. The other studio pages and independent demo products are planned follow-on phases, not yet implemented.
