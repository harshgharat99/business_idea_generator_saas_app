"use client"

import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f9f7f4] to-[#f3ede8] dark:from-[#1f1c1a] dark:to-[#2a2725]">
      <div className="container mx-auto px-4 py-12">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-12">
          <h1 className="text-2xl font-bold text-[#3a2f2a] dark:text-[#e8e1da]">
            IdeaGen Pro
          </h1>
          <div>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-[#6f5f57] hover:bg-[#5c4e47] text-[#fffaf7] font-medium py-2 px-6 rounded-lg transition-colors shadow-sm">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-4">
                <Link
                  href="/product"
                  className="bg-[#6f5f57] hover:bg-[#5c4e47] text-[#fffaf7] font-medium py-2 px-6 rounded-lg transition-colors shadow-sm"
                >
                  Go to App
                </Link>
                <UserButton showName={true} />
              </div>
            </SignedIn>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="text-center py-24">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-[#3a2f2a] to-[#6f5f57] bg-clip-text text-transparent mb-6">
            Generate Your Next
            <br />
            Big Business Idea
          </h2>
          <p className="text-xl text-[#7a6f67] dark:text-[#b8ada4] mb-8 max-w-2xl mx-auto">
            Harness the power of AI to discover innovative business opportunities tailored for the AI agent economy
          </p>

          {/* Pricing Preview */}
          <div className="bg-[#fffdfb]/80 dark:bg-[#2b2623]/80 backdrop-blur-lg rounded-xl p-6 max-w-sm mx-auto mb-8 border border-[#e6e0da]/60 dark:border-[#3c3532] shadow-md">
            <h3 className="text-2xl font-bold mb-2 text-[#3a2f2a] dark:text-[#e8e1da]">
              Premium Subscription
            </h3>
            <p className="text-4xl font-bold text-[#6f5f57] mb-2">
              $10
              <span className="text-lg text-[#7a6f67]">/month</span>
            </p>
            <ul className="text-left text-[#7a6f67] dark:text-[#b8ada4] mb-6">
              <li className="mb-2">✓ Unlimited idea generation</li>
              <li className="mb-2">✓ Advanced AI models</li>
              <li className="mb-2">✓ Priority support</li>
            </ul>
          </div>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-gradient-to-r from-[#6f5f57] to-[#8a7b72] hover:from-[#5c4e47] hover:to-[#76675e] text-[#fffaf7] font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-md">
                Start Your Free Trial
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/product">
              <button className="bg-gradient-to-r from-[#6f5f57] to-[#8a7b72] hover:from-[#5c4e47] hover:to-[#76675e] text-[#fffaf7] font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-md">
                Access Premium Features
              </button>
            </Link>
          </SignedIn>
        </div>
      </div>
    </main>
  );
}
