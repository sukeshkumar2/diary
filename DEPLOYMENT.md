# Deployment Guide for Diary Application

This guide explains how to deploy your **React Frontend** to Vercel and **FastAPI Backend** to Render for free.

## Prerequisites
- A GitHub account.
- Push your project code to a GitHub repository.

---

## 1. Backend Deployment (Render)
Render offers a free tier for Web Services and PostgreSQL.

### Step A: Configuration
1.  Ensure you have a `requirements.txt` in your `backend/` folder (Already done).
2.  Add a `Procfile` (or configure start command) to tell Render how to run the app.
    - Command: `uvicorn backend.main:app --host 0.0.0.0 --port 10000`

### Step B: Deploy
1.  Log in to [Render.com](https://render.com).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository.
4.  Settings:
    - **Root Directory**: `.`
    - **Environment**: `Python 3`
    - **Build Command**: `pip install -r backend/requirements.txt`
    - **Start Command**: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
5.  **Environment Variables**:
    - Add `PYTHON_VERSION`: `3.9.0` (or similar)
    - Add `SECRET_KEY`: (Generate a random string)
6.  Click **Create Web Service**.

> [!WARNING]
> **Database Persistence**: Since we are using SQLite (`diary.db`), your data will be **lost** every time the free server restarts (which happens often).
> **Solution**: Use Render's free **PostgreSQL** database. You would need to update `database.py` to use `postgresql://...` instead of `sqlite://...`.

---

## 2. Frontend Deployment (Vercel)
Vercel is optimal for React/Vite apps.

### Step A: Configuration
1.  We will add a `vercel.json` to handle routing for the single-page app (SPA).

### Step B: Deploy
1.  Log in to [Vercel.com](https://vercel.com).
2.  Click **Add New** -> **Project**.
3.  Import your GitHub repository.
4.  Settings:
    - **Framework Preset**: Vite
    - **Root Directory**: `frontend`
    - **Build Command**: `npm run build`
    - **Output Directory**: `dist`
5.  **Environment Variables**:
    - `VITE_API_URL`: The URL of your deployed Backend (e.g., `https://your-diary-app.onrender.com`).
    - *Note*: You need to update your `api.js` to use `import.meta.env.VITE_API_URL` instead of `localhost:8000`.
6.  Click **Deploy**.

---

## 3. Connecting Them
1.  Once Backend is deployed, copy its URL.
2.  Go to Vercel Project Settings -> Environment Variables.
3.  Add `VITE_API_URL` = `https://<your-backend>.onrender.com`.
4.  Redeploy Frontend.
5.  Go to Render Dashboard -> Environment Variables.
6.  Update CORS origins in `main.py` if restricted (currently set to `*` so it will work anywhere).

Your app is now live!
