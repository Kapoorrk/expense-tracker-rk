# Render Deployment Guide

## Quick Deployment Steps

### Backend Deployment (Render)

1. **Push your project to GitHub**
   - Create a GitHub repository
   - Push this project to GitHub

2. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

3. **Deploy Backend with Database**
   - Click "New +" → "Blueprint"
   - Connect to your GitHub repository
   - Render will auto-detect the `render.yaml` file
   - Review and confirm deployment settings
   - Click "Create"
   - Wait for build and deployment to complete

4. **Get Your Backend URL**
   - Once deployed, Render will provide a URL like: `https://expense-tracker-backend-xxxx.onrender.com`
   - Your API endpoints will be available at this URL

### Frontend Deployment

#### Option 1: Deploy Separate Frontend to Cloudflare Pages

1. **Build the Frontend**

   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Push `/frontend/build` to GitHub** or use Cloudflare Pages directly

3. **Configure at Cloudflare Pages**
   - Connect your GitHub repository
   - Set build command: `cd frontend && npm run build`
   - Set publish directory: `frontend/build`
   - Add environment variable: `REACT_APP_API_URL=https://your-render-backend-url.onrender.com`

4. **Get Your Frontend URL**
   - Your frontend will be available at: `https://your-project-name.pages.dev`

#### Option 2: Serve Frontend from Backend (Static Files)

The backend can serve the React frontend. Build frontend and copy to backend's static files:

```bash
cd frontend
npm run build
cp -r build ../backend/src/main/resources/static
```

Then deploy as single service - frontend will be available at same URL as backend.

## Environment Variables

Backend automatically gets these from Render's PostgreSQL:

- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_NAME` - Database name
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password

## API Endpoints

After deployment, access your API at: `https://your-backend-url.onrender.com/expenses`

Example:

- GET: `https://expense-tracker-backend-xxxx.onrender.com/expenses`
- POST: `https://expense-tracker-backend-xxxx.onrender.com/expenses`

## Testing Your Deployment

1. Test backend:

   ```bash
   curl https://your-backend-url.onrender.com/expenses
   ```

2. Test from frontend by updating `API_URL` in components to your Render backend URL

## Troubleshooting

- **Build fails**: Check pom.xml and ensure Java 17 is compatible
- **Database connection fails**: Verify environment variables are set in Render dashboard
- **CORS errors**: Frontend URL should match CORS_ORIGIN in render.yaml

## Your Render Links

Once deployed, you'll have:

- **Backend API**: https://expense-tracker-backend-[your-id].onrender.com
- **Frontend**: https://expense-tracker-frontend-[your-id].pages.dev (or same URL if using Option 2)
