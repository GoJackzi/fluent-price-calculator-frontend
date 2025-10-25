'use client';

import { useChainId, useSwitchChain } from 'wagmi';
import { fluentTestnet } from '@/lib/config';

export function NetworkBadge() {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const isCorrectNetwork = chainId === fluentTestnet.id;

  if (isCorrectNetwork) {
    return (
      <div className="inline-flex items-center px-3 py-1.5 rounded-xl bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium border border-green-200 dark:border-green-800">
        <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
        Fluent Testnet
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2">
      <div className="px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-medium border border-red-200 dark:border-red-800">
        <div className="w-2 h-2 rounded-full bg-red-500 mr-2 inline-block" />
        Wrong Network
      </div>
      <button
        onClick={() => switchChain?.({ chainId: fluentTestnet.id })}
        className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md shadow-blue-500/30"
      >
        Switch Network
      </button>
    </div>
  );
}
