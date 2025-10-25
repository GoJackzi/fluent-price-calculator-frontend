'use client';

import { PRICE_CALCULATOR_ADDRESS, TOKEN_PRICE_MANAGER_ADDRESS } from '@/lib/contracts';

export function ContractInfo() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-blue-200 dark:border-gray-600">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl mr-4">
            R
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Rust WASM Contract
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">PriceCalculator</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Contract Address</p>
          <a
            href={`https://testnet.fluentscan.xyz/address/${PRICE_CALCULATOR_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono text-blue-600 dark:text-blue-400 hover:underline break-all"
          >
            {PRICE_CALCULATOR_ADDRESS}
          </a>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-purple-200 dark:border-gray-600">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-xl mr-4">
            S
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Solidity Contract
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">TokenPriceManager</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Contract Address</p>
          <a
            href={`https://testnet.fluentscan.xyz/address/${TOKEN_PRICE_MANAGER_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono text-purple-600 dark:text-purple-400 hover:underline break-all"
          >
            {TOKEN_PRICE_MANAGER_ADDRESS}
          </a>
        </div>
      </div>
    </div>
  );
}

