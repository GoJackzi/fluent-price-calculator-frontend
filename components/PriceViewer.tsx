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
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        View Token Prices
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Token Symbol
          </label>
          <input
            type="text"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
            placeholder="ETH, BTC, USDC..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={() => refetch()}
          disabled={isLoading}
          className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Loading...' : 'Get Price'}
        </button>

        {price !== undefined && (
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Base Price</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formattedPrice}
            </p>
            {price === 0n && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                Price not set for this token
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

