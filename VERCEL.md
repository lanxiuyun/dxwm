# Vercel Deployment

This project can be deployed to Vercel as a standard Vite app.

## Recommended settings

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## Why no extra config is needed

- The app is a client-side React app built with Vite.
- There is no React Router setup in `src`, so no SPA rewrite config is required right now.
- Static assets in `public/` such as `Menu_Main.mp3` will be copied into the build output automatically.

## Deploy steps

1. Push this project to GitHub.
2. Import the repo into Vercel.
3. Confirm the detected framework is `Vite`.
4. Keep the default build command as `npm run build`.
5. Keep the output directory as `dist`.
6. Deploy.

## After deploy

1. Open the Vercel domain and test audio playback.
2. If you want a custom domain later, bind it in the Vercel project settings.
3. If you later add real front-end routes, then consider adding a Vercel rewrite for `index.html`.
