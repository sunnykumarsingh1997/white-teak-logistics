# Deployment Guide for White Teak LLC Internal Logistics Generator

This guide will help you deploy the application to Netlify.

## Prerequisites

1.  **GitHub Account**: Ensure you have a GitHub account.
2.  **Netlify Account**: Sign up at [netlify.com](https://www.netlify.com/).

## Step 1: Push to GitHub

1.  Create a new repository on GitHub (e.g., `white-teak-logistics`).
2.  Do **not** initialize with README, .gitignore, or License.
3.  Run the following commands in your terminal (replace `YOUR_USERNAME` and `YOUR_REPO_NAME`):

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Netlify

1.  Log in to your Netlify dashboard.
2.  Click **"Add new site"** > **"Import from an existing project"**.
3.  Select **GitHub**.
4.  Authorize Netlify to access your GitHub repositories.
5.  Select the `white-teak-logistics` repository you just created.
6.  **Build Settings**:
    *   **Base directory**: (leave empty)
    *   **Build command**: `npm run build`
    *   **Publish directory**: `dist`
7.  Click **"Deploy"**.

## Step 3: Environment Variables (Optional)

If you decide to use a real Gemini API key in the future:

1.  Go to **Site Settings** > **Environment variables**.
2.  Add a new variable:
    *   Key: `VITE_GEMINI_API_KEY`
    *   Value: `your_actual_api_key`
3.  Trigger a new deploy.

## Verification

Once deployed, Netlify will provide a URL (e.g., `https://white-teak-logistics.netlify.app`). Open this URL to verify the application is running correctly.
