'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { WalletConnect } from '@/components/WalletConnect';
import { ContractInfo } from '@/components/ContractInfo';
import { NetworkBadge } from '@/components/NetworkBadge';
import { PriceViewer } from '@/components/PriceViewer';
import { PriceCalculator } from '@/components/PriceCalculator';
import { AdminPanel } from '@/components/AdminPanel';

type Tab = 'view' | 'calculate' | 'admin';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('view');
  const { isConnected } = useAccount();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Header */}
      <header className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Fluent Calculator
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Blended execution
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isConnected && <NetworkBadge />}
              <WalletConnect />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero */}
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Token Price Calculator
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Rust + Solidity working together on Fluent Network
          </p>
        </div>

        {/* Contract Cards */}
        <ContractInfo />

        {/* Tabs */}
        <div className="mb-6">
          <div className="inline-flex gap-2 bg-white/80 dark:bg-gray-900/80 p-1.5 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50">
            <button
              onClick={() => setActiveTab('view')}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all text-sm ${
                activeTab === 'view'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              View Prices
            </button>
            <button
              onClick={() => setActiveTab('calculate')}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all text-sm ${
                activeTab === 'calculate'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Calculate
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all text-sm ${
                activeTab === 'admin'
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md shadow-purple-500/30'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-12">
          {!isConnected && activeTab !== 'view' && (
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-gray-200/50 dark:border-gray-800/50 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Connect Your Wallet
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                Connect to use calculator and admin features
              </p>
              <WalletConnect />
            </div>
          )}

          {(isConnected || activeTab === 'view') && (
            <>
              {activeTab === 'view' && <PriceViewer />}
              {activeTab === 'calculate' && isConnected && <PriceCalculator />}
              {activeTab === 'admin' && isConnected && <AdminPanel />}
            </>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-800/50 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Rust Power
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Fast calculations with WebAssembly
            </p>
          </div>

          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-800/50 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Solidity State
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Secure storage and access control
            </p>
          </div>

          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-800/50 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Blended Execution
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Cross-VM on Fluent Network
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-gray-200/50 dark:border-gray-800/50">
          <div className="flex items-center justify-center gap-6 mb-4 text-sm">
            <a
              href="https://github.com/GoJackzi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
            <a
              href="https://testnet.fluentscan.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Explorer
            </a>
            <a
              href="https://docs.fluent.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Docs
            </a>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Built on Fluent Network
          </p>
        </footer>
      </div>
    </main>
  );
}
