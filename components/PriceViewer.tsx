'use client';

import { useState } from 'react';
import { useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { TOKEN_PRICE_MANAGER_ADDRESS, TOKEN_PRICE_MANAGER_ABI } from '@/lib/contracts';

export function PriceViewer() {
  const [tokenSymbol, setTokenSymbol] = useState('ETH');

  const { data: price, isLoading, refetch } = useReadContract({
    address: TOKEN_PRICE_MANAGER_ADDRESS,
    abi: TOKEN_PRICE_MANAGER_ABI,
    functionName: 'getBasePrice',
    args: [tokenSymbol],
  });

  const formattedPrice = price ? formatUnits(price as bigint, 18) : '0';

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-800/50">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        View Token Prices
      </h3>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Token Symbol
          </label>
          <input
            type="text"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
            placeholder="ETH, BTC, USDC..."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <button
          onClick={() => refetch()}
          disabled={isLoading}
          className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </span>
          ) : (
            'Get Price'
          )}
        </button>

        {price !== undefined && (
          <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Base Price</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              {formattedPrice}
            </p>
            {price === 0n && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Price not set for this token
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
