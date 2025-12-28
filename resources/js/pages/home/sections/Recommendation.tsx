import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { AlertCircle, ArrowRight, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

export default function Recommendation() {
    return (
        <section className="relative py-20 overflow-hidden">
            <div className="absolute right-0 top-1/2 -z-10 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-blue-100/50 blur-[120px] dark:bg-blue-900/10" />

            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-900/30 dark:text-blue-300">
                        <Zap className="h-3 w-3 fill-current" />
                        The KobiStart Difference
                    </div>
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                        See <span className="italic">why</span>, not just what.
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                        We highlight the exact reasons a platform fits your specific constraints.
                    </p>
                </div>

                <div className="mx-auto max-w-5xl">
                    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
                        {/* Main Recommendation */}
                        <GlassCard className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-900/20">
                            <div className="mb-6 flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white shadow-xl dark:bg-white dark:text-black">
                                        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">WooCommerce</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="flex items-center rounded-md bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                                ★ 9.2 Match
                                            </span>
                                            <span className="text-sm text-gray-500">Best for Technical Users</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden text-right sm:block">
                                    <div className="text-sm font-medium text-gray-500">Est. Cost</div>
                                    <div className="text-xl font-bold text-gray-900 dark:text-white">$25<span className="text-sm font-normal text-gray-500">/mo</span></div>
                                </div>
                            </div>

                            <div className="mb-8 grid gap-4">
                                <div className="rounded-xl border border-green-200 bg-green-50/50 p-4 dark:border-green-900/50 dark:bg-green-900/10">
                                    <h4 className="flex items-center gap-2 font-semibold text-green-800 dark:text-green-300">
                                        <CheckCircle2 className="h-4 w-4" />
                                        Why it fits you
                                    </h4>
                                    <ul className="mt-2 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1 w-1 rounded-full bg-green-500"></span>
                                            You already have WordPress hosting, saving ~$30/mo.
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1 w-1 rounded-full bg-green-500"></span>
                                            You requested full code customization access.
                                        </li>
                                    </ul>
                                </div>

                                <div className="rounded-xl border border-yellow-200 bg-yellow-50/50 p-4 dark:border-yellow-900/50 dark:bg-yellow-900/10">
                                    <h4 className="flex items-center gap-2 font-semibold text-yellow-800 dark:text-yellow-300">
                                        <AlertCircle className="h-4 w-4" />
                                        Things to watch out for
                                    </h4>
                                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                        Requires manual security updates. Since you marked "Medium" technical skills, consider a maintenance plugin.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-gray-200 pt-6 dark:border-white/10">
                                <Button variant="link" className="px-0 text-blue-600 dark:text-blue-400">
                                    View Full Analysis
                                </Button>
                                <Button className="bg-gray-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200">
                                    Select Platform
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                        </GlassCard>

                        {/* Comparative Insight & Next Best */}
                        <div className="flex flex-col gap-6">
                            <GlassCard className="relative overflow-hidden">
                                <div className="absolute -right-4 -top-4 -z-10 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl dark:bg-purple-900/20" />

                                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                                    What If?
                                </h4>
                                <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                                    If you increased your budget to <strong>$50/mo</strong>, <strong className="text-blue-600 dark:text-blue-400">Shopify</strong> becomes the #1 choice due to better integrated payments.
                                </p>
                                <Button variant="outline" size="sm" className="w-full justify-between dark:bg-transparent">
                                    Simulate Changes <ArrowRight className="h-3 w-3" />
                                </Button>
                            </GlassCard>

                            <GlassCard>
                                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                                    Runner Up
                                </h4>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
                                        B
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900 dark:text-white">BigCommerce</div>
                                        <div className="text-xs text-gray-500">8.5 Match</div>
                                    </div>
                                </div>
                                <div className="mt-3 text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    Missing key integration: Klaviyo
                                </div>
                            </GlassCard>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
