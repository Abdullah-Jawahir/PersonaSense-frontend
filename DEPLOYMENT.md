# Deployment Guide for PersonaSense

This guide will help you deploy your PersonaSense frontend to Netlify while connecting it to your Railway backend.

## 🚀 Quick Deployment Steps

### 1. Build Your Frontend
```bash
npm run build
```

### 2. Deploy to Netlify

#### Option A: Drag & Drop (Quick)
1. Go to [netlify.com](https://netlify.com) and sign in
2. Drag and drop your `dist` folder to the Netlify dashboard
3. Your site will be deployed instantly

#### Option B: Connect GitHub Repository (Recommended)
1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "New site from Git"
3. Connect your GitHub repository
4. Set build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click "Deploy site"

### 3. Configure Environment Variables

After deployment, configure the API endpoint:

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add a new variable:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://web-production-1231.up.railway.app`
4. Click **Save**
5. Go to **Deploys** and trigger a new deploy

### 4. Verify Deployment

1. Visit your Netlify site URL
2. Take the personality quiz
3. Verify that the results are coming from your Railway backend

## 🔧 Environment Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_API_BASE_URL` | `https://web-production-1231.up.railway.app` | Your Railway backend URL |

## 🐛 Troubleshooting

### API Calls Not Working
- Verify the environment variable is set correctly
- Check that your Railway backend is running
- Open browser dev tools and check the Network tab for errors

### Build Errors
- Make sure all dependencies are installed: `npm install`
- Check that the build command works locally: `npm run build`

### CORS Issues
- Your Railway backend should handle CORS properly
- If you see CORS errors, check your backend configuration

## 🔄 Updating Your Deployment

### Automatic Updates (GitHub Integration)
If you connected your GitHub repository:
1. Push changes to your main branch
2. Netlify will automatically rebuild and deploy

### Manual Updates
1. Make your changes locally
2. Run `npm run build`
3. Drag the new `dist` folder to Netlify

## 📱 Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Follow the DNS configuration instructions
4. Wait for DNS propagation (can take up to 24 hours)

## 🔒 Security Notes

- Environment variables in Netlify are encrypted
- The `VITE_` prefix makes variables available to the client-side code
- Never commit sensitive API keys to your repository

## 📞 Support

If you encounter issues:
1. Check the Netlify deployment logs
2. Verify your Railway backend is accessible
3. Test the API endpoint directly: `https://web-production-1231.up.railway.app`

---

Your PersonaSense app should now be live and connected to your Railway backend! 🎉 