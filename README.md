# Fluent Price Calculator - Frontend

A production-ready Next.js dApp showcasing **Blended Execution** on Fluent Network. This application demonstrates seamless interaction between Rust (WASM) and Solidity contracts for efficient token price management.

## 🎯 Features

### For All Users
- 📊 **View Token Prices** - Query base prices for any token
- 🧮 **Price Calculations** - Calculate markups, discounts, purchase costs, and averages
- ✅ **Range Checking** - Verify if prices fall within acceptable ranges
- 🔗 **Direct Explorer Links** - View contracts on Fluent Explorer

### For Authorized Users
- 💰 **Set Token Prices** - Manage pricing for multiple tokens
- 🔐 **Manage Permissions** - Authorize or revoke price setter access
- 📝 **Admin Panel** - Full administrative control

## 🚀 Deployed Contracts

| Contract | Type | Address |
|----------|------|---------|
| **PriceCalculator** | Rust/WASM | [`0x4447dde77D30004E130896Cc875f279D902315D4`](https://testnet.fluentscan.xyz/address/0x4447dde77D30004E130896Cc875f279D902315D4) |
| **TokenPriceManager** | Solidity | [`0xF942E2Aa33e3BbB7D4936444e92433dFa9EA85bd`](https://testnet.fluentscan.xyz/address/0xF942E2Aa33e3BbB7D4936444e92433dFa9EA85bd) |

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Wallet Connection**: RainbowKit + Wagmi
- **Styling**: Tailwind CSS
- **Blockchain**: Fluent Testnet
- **Deployment**: Vercel

## 📦 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MetaMask or compatible Web3 wallet

### Installation

```bash
# Clone the repository
git clone https://github.com/GoJackzi/fluent-price-calculator-frontend.git
cd fluent-price-calculator-frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Network Configuration

### Fluent Testnet
- **Chain ID**: 20994
- **RPC URL**: https://rpc.testnet.fluent.xyz
- **Explorer**: https://testnet.fluentscan.xyz
- **Currency**: FLT

### Adding to MetaMask
1. Open MetaMask
2. Click network dropdown → "Add Network"
3. Enter the details above
4. Save and switch to Fluent Testnet

## 🔧 Configuration

The app uses hardcoded contract addresses for Fluent Testnet. If you need to modify them, edit:

```typescript
// lib/contracts.ts
export const PRICE_CALCULATOR_ADDRESS = "0x..."; // Your Rust contract
export const TOKEN_PRICE_MANAGER_ADDRESS = "0x..."; // Your Solidity contract
```

## 📱 Usage

### 1. Connect Wallet
Click "Connect Wallet" and select your preferred wallet provider.

### 2. Switch to Fluent Testnet
If you're on the wrong network, click "Switch to Fluent Testnet" button.

### 3. View Prices
Navigate to "View Prices" tab and enter a token symbol (e.g., ETH, BTC).

### 4. Calculate Prices
Use the "Calculate" tab to:
- Add markup percentages
- Calculate purchase costs
- Apply discounts
- Get average prices
- Check price ranges

### 5. Admin Functions (Authorized Only)
If your wallet is authorized:
- Set token prices
- Grant or revoke permissions for other addresses

## 🚀 Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard
1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

Your app will be live at `https://your-app-name.vercel.app`

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│     Next.js Frontend (This App)     │
│  ┌─────────────────────────────┐   │
│  │   RainbowKit + Wagmi        │   │
│  │   (Wallet Connection)       │   │
│  └──────────┬──────────────────┘   │
└─────────────┼──────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│   TokenPriceManager (Solidity)      │
│   • State Management                │
│   • Access Control                  │
│   • Events                          │
└──────────────┬──────────────────────┘
               │ Cross-VM Call
               ▼
┌─────────────────────────────────────┐
│   PriceCalculator (Rust/WASM)       │
│   • Pure Calculations               │
│   • Efficient Math                  │
└─────────────────────────────────────┘
```

## 📝 Scripts

```bash
# Development
npm run dev          # Start dev server at localhost:3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🤝 Contributing

This is a demo project for Fluent Network. Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📄 License

MIT License - see the LICENSE file for details

## 🔗 Links

- **Fluent Documentation**: https://docs.fluent.xyz/
- **Fluent Explorer**: https://testnet.fluentscan.xyz
- **GitHub**: https://github.com/GoJackzi
- **Smart Contracts**: [View Deployment Details](../fluent-price-calculator/DEPLOYMENT.md)

## ⚠️ Disclaimer

This is a testnet application. Do not use real funds. Testnet tokens have no monetary value.

## 🙏 Acknowledgments

Built with:
- [Fluent Network](https://fluent.xyz) - Blended Execution Platform
- [RainbowKit](https://rainbowkit.com) - Wallet Connection UI
- [Wagmi](https://wagmi.sh) - React Hooks for Ethereum
- [Next.js](https://nextjs.org) - React Framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-First CSS

---

**Made with ❤️ on Fluent Network**
