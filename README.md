<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# GlowGut Pro

GlowGut is a camera-based wellness app. Tongue images are sent to Agnes AI for analysis through a Netlify Function. GlowGut does not persist the images.

## Deploy on Netlify

**Prerequisites:**  Node.js


1. Connect this repository to Netlify with Git-based builds. The included `netlify.toml` configures the build and serverless function directory.
2. Set `AGNES_API_KEY` in the Netlify site's environment variables. Never put this key in browser code or commit it to the repository.
3. Trigger a deploy. The Agnes analysis endpoint is provided by `netlify/functions/analyze-tongue.mjs`.

