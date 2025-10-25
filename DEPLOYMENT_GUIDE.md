# Deployment Guide

## ✅ Build Complete!

Your frontend is ready to deploy. The code has been committed to Git locally.

## 🚀 Step 1: Create GitHub Repository

### Option A: Using GitHub Web Interface (Recommended)

1. Go to https://github.com/new
2. Fill in the details:
   - **Owner**: GoJackzi
   - **Repository name**: `fluent-price-calculator-frontend`
   - **Description**: "Fluent Price Calculator - Blended execution dApp on Fluent Network"
   - **Visibility**: Public
   - **Initialize**: Do NOT initialize with README, .gitignore, or license (we already have these)
3. Click "Create repository"
4. You'll see a page with setup instructions - copy the commands under "...or push an existing repository from the command line"

### Option B: Using GitHub CLI

```bash
# Install GitHub CLI first
# Visit: https://cli.github.com/

# Then run:
cd G:\fluent-price-calculator-frontend
gh auth login
gh repo create fluent-price-calculator-frontend --public --source=. --remote=origin --push
```

## 📤 Step 2: Push to GitHub

After creating the repository on GitHub, run these commands:

```bash
cd G:\fluent-price-calculator-frontend

# Add the remote (replace YOUR_USERNAME with GoJackzi)
git remote add origin https://github.com/GoJackzi/fluent-price-calculator-frontend.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🌐 Step 3: Deploy to Vercel

### Option A: Via Vercel Dashboard (Easiest)

1. Visit https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository:
   - Click "Import Git Repository"
   - Find "fluent-price-calculator-frontend"
   - Click "Import"
4. Configure the project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)
5. Click "Deploy"
6. Wait for deployment to complete (~2-3 minutes)
7. Your app will be live at: `https://your-app-name.vercel.app`

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (run from project directory)
cd G:\fluent-price-calculator-frontend
vercel

# For production deployment
vercel --prod
```

## 🎉 Post-Deployment

Once deployed, you'll receive a URL like:
- `https://fluent-price-calculator-frontend.vercel.app`

### Update the URLs

1. Test your dApp at the Vercel URL
2. Optionally, add a custom domain in Vercel settings
3. Share the link:
   - Add it to your GitHub repo description
   - Tweet about it!
   - Share on Discord/Telegram

## 🔧 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes to your code
# Then:
git add .
git commit -m "Your commit message"
git push origin main

# Vercel will automatically deploy the changes
```

## 📱 Testing Your Deployment

After deployment, test these features:

1. ✅ **Wallet Connection**: Connect MetaMask
2. ✅ **Network Switch**: Switch to Fluent Testnet
3. ✅ **View Prices**: Query ETH price (should be 2000)
4. ✅ **Calculate**: Test discount calculation
5. ✅ **Admin Panel**: Check if your wallet sees admin functions

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Run `npm run build` locally first

### Wallet Connection Issues
- Make sure you're on Fluent Testnet
- Check that MetaMask is unlocked
- Try refreshing the page

### Contract Interaction Fails
- Verify contract addresses in `lib/contracts.ts`
- Check you're on the correct network (Chain ID: 20994)
- Ensure you have testnet FLT tokens

## 📚 Additional Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Fluent Network**: https://docs.fluent.xyz
- **RainbowKit**: https://rainbowkit.com/docs

## 🎯 Next Steps

1. ✅ Create GitHub repository
2. ✅ Push code to GitHub
3. ✅ Deploy to Vercel
4. 🔜 Test the deployed app
5. 🔜 Share your dApp with the community!

---

**Need help?** Check the README.md for more details or visit the Fluent Discord.

