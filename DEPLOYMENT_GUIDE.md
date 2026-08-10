# Deployment Guide

Congratulations! Your URL Shortener code is fully refactored and ready for production. Follow these steps to put your application live on the actual internet!

## 1. Setup Database (MongoDB Atlas)
Since your database currently runs on your computer, you'll need an internet-hosted database.
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and register for a free account.
2. Build a new cluster (the free M0 sandbox is perfect).
3. Create a Database User and save the **username** and **password**.
4. In "Network Access," allow access from anywhere (`0.0.0.0/0`).
5. Click "Connect", then "Connect your application", and copy the **Connection String** (it starts with `mongodb+srv://...`). Swap `<password>` with the password you just created. Keep this handy!

## 2. Deploy Backend (Render)
Render makes deploying Node/Express backends incredibly simple.
1. Create a free account on [Render](https://render.com/).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub account and select your `URL_SHORTNER` repository.
4. Fill in the deployment details:
   - **Root Directory**: `BACKEND`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node app.js`
5. Scroll down to **Environment Variables** and add two variables:
   - `MONGO_URI`: (Paste the connection string from MongoDB Atlas)
   - `FRONTEND_URL`: (Leave this blank for now, or put your Vercel URL later to restrict access)
6. Click **Create Web Service**. Render will now build and deploy your API! Once it's live, copy the final URL (e.g., `https://url-shortner-api.onrender.com`).

## 3. Deploy Frontend (Vercel)
Vercel turns deploying React/Vite apps into a one-click process.
1. Create a free account on [Vercel](https://vercel.com/) and log in with GitHub.
2. Click **Add New Project** and import your `URL_SHORTNER` repository.
3. In the project setup:
   - Expand the **Root Directory** setting and select `FRONTEND`.
   - The Framework Preset should automatically be set to **Vite**.
4. Expand the **Environment Variables** section and add:
   - **Name**: `VITE_API_URL`
   - **Value**: (Paste your copied Render URL here, e.g., `https://url-shortner-api.onrender.com`)
5. Click **Deploy**! Wait a couple of minutes, and you will get a live URL for your production-ready URL shortener!

### Final Touch
Once your Vercel frontend is deployed, you should log back into your **Render** backend Settings, go to **Environment Variables**, and set `FRONTEND_URL` to your Vercel URL. This ensures your Backend will only accept direct requests from your own live frontend domain!

Enjoy your live app! 🎉
