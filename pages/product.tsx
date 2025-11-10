"use client"

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { useAuth } from '@clerk/nextjs';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { Protect, PricingTable, UserButton } from '@clerk/nextjs';

function IdeaGenerator() {
    const { getToken } = useAuth();
    const [idea, setIdea] = useState<string>('…loading');

    useEffect(() => {
        let buffer = '';
        (async () => {
            const jwt = await getToken();
            if (!jwt) {
                setIdea('Authentication required');
                return;
            }

            await fetchEventSource('/api', {
                headers: { Authorization: `Bearer ${jwt}` },
                onmessage(ev) {
                    buffer += ev.data;
                    setIdea(buffer);
                },
                onerror(err) {
                    console.error('SSE error:', err);
                }
            });
        })();
    }, []);

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Header */}
            <header className="text-center mb-12">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-[#3a2f2a] to-[#6f5f57] bg-clip-text text-transparent mb-4">
                    Business Idea Generator
                </h1>
                <p className="text-[#7a6f67] dark:text-[#b8ada4] text-lg">
                    AI-powered innovation at your fingertips
                </p>
            </header>

            {/* Content Card */}
            <div className="max-w-3xl mx-auto">
                <div className="bg-[#fffdfb]/90 dark:bg-[#2b2623]/90 rounded-2xl shadow-xl p-8 backdrop-blur-lg border border-[#e6e0da]/60 dark:border-[#3c3532]">
                    {idea === '…loading' ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-pulse text-[#a0958c] dark:text-[#8c8279]">
                                Generating your business idea...
                            </div>
                        </div>
                    ) : (
                        <div className="markdown-content text-[#3a2f2a] dark:text-[#e8e1da] leading-relaxed">
                            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                                {idea}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Product() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-[#f9f7f4] to-[#f3ede8] dark:from-[#1f1c1a] dark:to-[#2a2725] relative">
            {/* User Menu in Top Right */}
            <div className="absolute top-4 right-4">
                <UserButton showName={true} />
            </div>

            {/* Subscription Protection */}
            <Protect
                plan="premium_subscription"
                fallback={
                    <div className="container mx-auto px-4 py-12">
                        <header className="text-center mb-12">
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#3a2f2a] to-[#6f5f57] bg-clip-text text-transparent mb-4">
                                Choose Your Plan
                            </h1>
                            <p className="text-[#7a6f67] dark:text-[#b8ada4] text-lg mb-8">
                                Unlock unlimited AI-powered business ideas
                            </p>
                        </header>
                        <div className="max-w-4xl mx-auto bg-[#fffdfb]/90 dark:bg-[#2b2623]/90 rounded-2xl shadow-lg p-8 border border-[#e6e0da]/60 dark:border-[#3c3532]">
                            <PricingTable />
                        </div>
                    </div>
                }
            >
                <IdeaGenerator />
            </Protect>
        </main>
    );
}
