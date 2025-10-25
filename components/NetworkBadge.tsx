'use client';

import { useChainId, useSwitchChain } from 'wagmi';
import { fluentTestnet } from '@/lib/config';

export function NetworkBadge() {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const isCorrectNetwork = chainId === fluentTestnet.id;

  if (isCorrectNetwork) {
    return (
      <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium">
        <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
        Fluent Testnet
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2">
      <div className="px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-sm font-medium">
        <div className="w-2 h-2 rounded-full bg-red-500 mr-2 inline-block" />
        Wrong Network
      </div>
      <button
        onClick={() => switchChain?.({ chainId: fluentTestnet.id })}
        className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        Switch to Fluent Testnet
      </button>
    </div>
  );
}

