# Fluent Price Calculator

Token price calculator dApp running on Fluent Network. Uses Rust for calculations and Solidity for state - showing off Fluent's blended execution.

## What it does

- View token prices
- Calculate markups and discounts  
- Check if prices are in range
- Admin panel for setting prices (if authorized)

## Live Contracts

**Rust Contract**: [`0x4447d...15D4`](https://testnet.fluentscan.xyz/address/0x4447dde77D30004E130896Cc875f279D902315D4)  
**Solidity Contract**: [`0xF942E...85bd`](https://testnet.fluentscan.xyz/address/0xF942E2Aa33e3BbB7D4936444e92433dFa9EA85bd)

Running on Fluent Testnet (Chain ID: 20994)

## Built with

Next.js 14, TypeScript, RainbowKit, Wagmi, Tailwind

## Running locally

```bash
git clone https://github.com/GoJackzi/fluent-price-calculator-frontend.git
cd fluent-price-calculator-frontend
npm install
npm run dev
```

Open http://localhost:3000

## How to use

1. Connect your wallet
2. Switch to Fluent Testnet if prompted  
3. View prices or do calculations
4. Admins can set prices in the Admin tab

## Fluent Testnet

Add to MetaMask:
- Chain ID: `20994`
- RPC: `https://rpc.testnet.fluent.xyz`
- Explorer: `https://testnet.fluentscan.xyz`

## Deploy

Push to GitHub → Import in Vercel → Deploy

---

Built for [Fluent Network](https://fluent.xyz)
