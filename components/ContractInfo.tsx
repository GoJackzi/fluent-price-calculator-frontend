'use client';

import { PRICE_CALCULATOR_ADDRESS, TOKEN_PRICE_MANAGER_ADDRESS } from '@/lib/contracts';

export function ContractInfo() {
  return (
    <div className="grid md:grid-cols-2 gap-4 mb-8">
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold mr-3 shadow-md shadow-blue-500/30">
            R
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Rust Contract
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">PriceCalculator</p>
          </div>
        </div>
        <a
          href={`https://testnet.fluentscan.xyz/address/${PRICE_CALCULATOR_ADDRESS}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline break-all block bg-blue-50/50 dark:bg-blue-900/20 rounded-lg p-2.5"
        >
          {PRICE_CALCULATOR_ADDRESS}
        </a>
      </div>

      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold mr-3 shadow-md shadow-purple-500/30">
            S
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Solidity Contract
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">TokenPriceManager</p>
          </div>
        </div>
        <a
          href={`https://testnet.fluentscan.xyz/address/${TOKEN_PRICE_MANAGER_ADDRESS}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-purple-600 dark:text-purple-400 hover:underline break-all block bg-purple-50/50 dark:bg-purple-900/20 rounded-lg p-2.5"
        >
          {TOKEN_PRICE_MANAGER_ADDRESS}
        </a>
      </div>
    </div>
  );
}
