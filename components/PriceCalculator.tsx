'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { formatUnits, parseUnits } from 'viem';
import { TOKEN_PRICE_MANAGER_ADDRESS, TOKEN_PRICE_MANAGER_ABI } from '@/lib/contracts';

type CalculatorTab = 'markup' | 'cost' | 'discount' | 'average' | 'range';

export function PriceCalculator() {
  const [activeTab, setActiveTab] = useState<CalculatorTab>('markup');
  
  // Markup calculation
  const [markupToken, setMarkupToken] = useState('ETH');
  const [markupPercent, setMarkupPercent] = useState('10');
  const [markupResult, setMarkupResult] = useState<string>('');
  
  // Cost calculation
  const [costToken, setCostToken] = useState('ETH');
  const [quantity, setQuantity] = useState('5');
  const [costResult, setCostResult] = useState<string>('');
  
  // Discount calculation
  const [discountToken, setDiscountToken] = useState('ETH');
  const [discountPercent, setDiscountPercent] = useState('20');
  const [discountResult, setDiscountResult] = useState<string>('');
  
  // Average calculation
  const [avgToken1, setAvgToken1] = useState('ETH');
  const [avgToken2, setAvgToken2] = useState('BTC');
  const [avgToken3, setAvgToken3] = useState('USDC');
  const [avgResult, setAvgResult] = useState<string>('');
  
  // Range check
  const [rangeToken, setRangeToken] = useState('ETH');
  const [minPrice, setMinPrice] = useState('1500');
  const [maxPrice, setMaxPrice] = useState('2500');
  const [rangeResult, setRangeResult] = useState<boolean | null>(null);

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const calculateMarkup = async () => {
    try {
      const tx = await writeContract({
        address: TOKEN_PRICE_MANAGER_ADDRESS,
        abi: TOKEN_PRICE_MANAGER_ABI,
        functionName: 'getTokenPriceWithMarkup',
        args: [markupToken, BigInt(markupPercent)],
      });
    } catch (error: any) {
      console.error('Markup calculation error:', error);
      alert(error.message || 'Failed to calculate markup');
    }
  };

  const calculateCost = async () => {
    try {
      const tx = await writeContract({
        address: TOKEN_PRICE_MANAGER_ADDRESS,
        abi: TOKEN_PRICE_MANAGER_ABI,
        functionName: 'calculatePurchaseCost',
        args: [costToken, BigInt(quantity)],
      });
    } catch (error: any) {
      console.error('Cost calculation error:', error);
      alert(error.message || 'Failed to calculate cost');
    }
  };

  const calculateDiscount = async () => {
    try {
      const tx = await writeContract({
        address: TOKEN_PRICE_MANAGER_ADDRESS,
        abi: TOKEN_PRICE_MANAGER_ABI,
        functionName: 'getDiscountedPrice',
        args: [discountToken, BigInt(discountPercent)],
      });
    } catch (error: any) {
      console.error('Discount calculation error:', error);
      alert(error.message || 'Failed to calculate discount');
    }
  };

  const calculateAverage = async () => {
    try {
      const tx = await writeContract({
        address: TOKEN_PRICE_MANAGER_ADDRESS,
        abi: TOKEN_PRICE_MANAGER_ABI,
        functionName: 'getAverageTokenPrice',
        args: [avgToken1, avgToken2, avgToken3],
      });
    } catch (error: any) {
      console.error('Average calculation error:', error);
      alert(error.message || 'Failed to calculate average');
    }
  };

  const checkRange = async () => {
    try {
      const tx = await writeContract({
        address: TOKEN_PRICE_MANAGER_ADDRESS,
        abi: TOKEN_PRICE_MANAGER_ABI,
        functionName: 'isPriceInAcceptableRange',
        args: [rangeToken, parseUnits(minPrice, 18), parseUnits(maxPrice, 18)],
      });
    } catch (error: any) {
      console.error('Range check error:', error);
      alert(error.message || 'Failed to check range');
    }
  };

  const tabs = [
    { id: 'markup' as const, label: 'Price with Markup' },
    { id: 'cost' as const, label: 'Purchase Cost' },
    { id: 'discount' as const, label: 'Discounted Price' },
    { id: 'average' as const, label: 'Average Price' },
    { id: 'range' as const, label: 'Price Range' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Price Calculations
      </h3>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'markup' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Token Symbol
              </label>
              <input
                type="text"
                value={markupToken}
                onChange={(e) => setMarkupToken(e.target.value.toUpperCase())}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Markup Percentage (%)
              </label>
              <input
                type="number"
                value={markupPercent}
                onChange={(e) => setMarkupPercent(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <button
              onClick={calculateMarkup}
              disabled={isPending || isConfirming}
              className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isPending || isConfirming ? 'Calculating...' : 'Calculate Markup'}
            </button>
          </div>
        )}

        {activeTab === 'cost' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Token Symbol
              </label>
              <input
                type="text"
                value={costToken}
                onChange={(e) => setCostToken(e.target.value.toUpperCase())}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <button
              onClick={calculateCost}
              disabled={isPending || isConfirming}
              className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isPending || isConfirming ? 'Calculating...' : 'Calculate Cost'}
            </button>
          </div>
        )}

        {activeTab === 'discount' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Token Symbol
              </label>
              <input
                type="text"
                value={discountToken}
                onChange={(e) => setDiscountToken(e.target.value.toUpperCase())}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Discount Percentage (%)
              </label>
              <input
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <button
              onClick={calculateDiscount}
              disabled={isPending || isConfirming}
              className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isPending || isConfirming ? 'Calculating...' : 'Calculate Discount'}
            </button>
          </div>
        )}

        {activeTab === 'average' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Token 1 Symbol
              </label>
              <input
                type="text"
                value={avgToken1}
                onChange={(e) => setAvgToken1(e.target.value.toUpperCase())}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Token 2 Symbol
              </label>
              <input
                type="text"
                value={avgToken2}
                onChange={(e) => setAvgToken2(e.target.value.toUpperCase())}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Token 3 Symbol
              </label>
              <input
                type="text"
                value={avgToken3}
                onChange={(e) => setAvgToken3(e.target.value.toUpperCase())}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <button
              onClick={calculateAverage}
              disabled={isPending || isConfirming}
              className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isPending || isConfirming ? 'Calculating...' : 'Calculate Average'}
            </button>
          </div>
        )}

        {activeTab === 'range' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Token Symbol
              </label>
              <input
                type="text"
                value={rangeToken}
                onChange={(e) => setRangeToken(e.target.value.toUpperCase())}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Minimum Price
              </label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Maximum Price
              </label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <button
              onClick={checkRange}
              disabled={isPending || isConfirming}
              className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isPending || isConfirming ? 'Checking...' : 'Check Range'}
            </button>
          </div>
        )}

        {/* Transaction status */}
        {hash && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              {isConfirming ? 'Waiting for confirmation...' : 'Transaction confirmed!'}
            </p>
            <a
              href={`https://testnet.fluentscan.xyz/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline break-all"
            >
              View on Explorer
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

