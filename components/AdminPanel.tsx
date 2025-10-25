'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { TOKEN_PRICE_MANAGER_ADDRESS, TOKEN_PRICE_MANAGER_ABI } from '@/lib/contracts';

export function AdminPanel() {
  const { address } = useAccount();
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenPrice, setTokenPrice] = useState('');
  const [authAddress, setAuthAddress] = useState('');
  const [isAuthorizing, setIsAuthorizing] = useState(true);

  // Check if connected wallet is authorized
  const { data: isAuthorized, isLoading: checkingAuth } = useReadContract({
    address: TOKEN_PRICE_MANAGER_ADDRESS,
    abi: TOKEN_PRICE_MANAGER_ABI,
    functionName: 'authorizedPriceSetters',
    args: address ? [address] : undefined,
  });

  const { writeContract, data: hash, isPending, isSuccess } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  // Don't show admin panel if not authorized
  if (checkingAuth) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="ml-3 text-gray-600 dark:text-gray-300">Checking authorization...</p>
        </div>
      </div>
    );
  }

  if (!address) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Connect your wallet to access admin functions
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Not Authorized
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Your wallet ({address?.slice(0, 6)}...{address?.slice(-4)}) is not authorized to manage prices.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Please contact an admin to grant you access.
          </p>
        </div>
      </div>
    );
  }

  const handleSetPrice = async () => {
    if (!tokenSymbol || !tokenPrice) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const priceInWei = parseUnits(tokenPrice, 18);
      await writeContract({
        address: TOKEN_PRICE_MANAGER_ADDRESS,
        abi: TOKEN_PRICE_MANAGER_ABI,
        functionName: 'setTokenPrice',
        args: [tokenSymbol, priceInWei],
      });
      
      // Clear form on success
      setTokenSymbol('');
      setTokenPrice('');
    } catch (error: any) {
      console.error('Set price error:', error);
      alert(error.message || 'Failed to set price');
    }
  };

  const handleSetAuthorization = async () => {
    if (!authAddress) {
      alert('Please enter an address');
      return;
    }

    try {
      await writeContract({
        address: TOKEN_PRICE_MANAGER_ADDRESS,
        abi: TOKEN_PRICE_MANAGER_ABI,
        functionName: 'setAuthorization',
        args: [authAddress as `0x${string}`, isAuthorizing],
      });
      
      // Clear form on success
      setAuthAddress('');
    } catch (error: any) {
      console.error('Set authorization error:', error);
      alert(error.message || 'Failed to set authorization');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mr-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Admin Panel
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage token prices and authorizations
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Set Token Price Section */}
        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
            Set Token Price
          </h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Token Symbol
              </label>
              <input
                type="text"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
                placeholder="ETH, BTC, USDC..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price
              </label>
              <input
                type="number"
                value={tokenPrice}
                onChange={(e) => setTokenPrice(e.target.value)}
                placeholder="2000"
                step="0.000000000000000001"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <button
              onClick={handleSetPrice}
              disabled={isPending || isConfirming}
              className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isPending || isConfirming ? 'Setting Price...' : 'Set Price'}
            </button>
          </div>
        </div>

        {/* Authorization Management Section */}
        <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
            Manage Authorization
          </h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Wallet Address
              </label>
              <input
                type="text"
                value={authAddress}
                onChange={(e) => setAuthAddress(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  checked={isAuthorizing}
                  onChange={() => setIsAuthorizing(true)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Authorize</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  checked={!isAuthorizing}
                  onChange={() => setIsAuthorizing(false)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Revoke</span>
              </label>
            </div>
            <button
              onClick={handleSetAuthorization}
              disabled={isPending || isConfirming}
              className="w-full px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isPending || isConfirming ? 'Processing...' : isAuthorizing ? 'Authorize' : 'Revoke'}
            </button>
          </div>
        </div>

        {/* Transaction Status */}
        {hash && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
              {isConfirming ? '⏳ Waiting for confirmation...' : '✅ Transaction confirmed!'}
            </p>
            <a
              href={`https://testnet.fluentscan.xyz/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-green-600 dark:text-green-400 hover:underline break-all"
            >
              View on Explorer →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

