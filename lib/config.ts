import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem';

// Define Fluent Testnet chain
export const fluentTestnet = defineChain({
  id: 20994,
  name: 'Fluent Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Fluent',
    symbol: 'FLT',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.fluent.xyz'],
    },
    public: {
      http: ['https://rpc.testnet.fluent.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Fluent Explorer',
      url: 'https://testnet.fluentscan.xyz',
    },
  },
  testnet: true,
});

// Wagmi configuration with RainbowKit
export const config = getDefaultConfig({
  appName: 'Fluent Price Calculator',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Get from https://cloud.walletconnect.com
  chains: [fluentTestnet],
  ssr: true, // For Next.js
});

