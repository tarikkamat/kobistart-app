import { GlassCard } from '@/components/ui/glass-card';
import { Check, Minus, X } from 'lucide-react';

export default function Comparison() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                        Side-by-side Clarity
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                        Compare your top matches across the features that actually matter to you.
                    </p>
                </div>

                <div className="mx-auto max-w-5xl overflow-x-auto pb-4">
                    <GlassCard className="min-w-[700px] p-0">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-white/10">
                                    <th className="p-4 font-medium text-gray-500">Feature</th>
                                    <th className="p-4 font-bold text-gray-900 bg-blue-50/50 dark:text-white dark:bg-blue-900/20 w-[25%]">
                                        WooCommerce
                                        <span className="block text-[10px] font-normal text-blue-600">Your Pick</span>
                                    </th>
                                    <th className="p-4 font-semibold text-gray-700 dark:text-gray-300 w-[25%]">Shopify</th>
                                    <th className="p-4 font-semibold text-gray-700 dark:text-gray-300 w-[25%]">BigCommerce</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                                <tr>
                                    <td className="p-4 font-medium text-gray-900 dark:text-white">Monthly Cost</td>
                                    <td className="bg-blue-50/30 p-4 font-bold text-green-600 dark:bg-blue-900/10">~$25</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-400">$39</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-400">$39</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-gray-900 dark:text-white">Transaction Fees</td>
                                    <td className="bg-blue-50/30 p-4 font-bold text-green-600 dark:bg-blue-900/10">0%</td>
                                    <td className="p-4 text-red-500">2.0%*</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-400">0%</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-gray-900 dark:text-white">Ease of Use</td>
                                    <td className="bg-blue-50/30 p-4 font-medium text-yellow-600 dark:bg-blue-900/10">Medium</td>
                                    <td className="p-4 font-medium text-green-600">High</td>
                                    <td className="p-4 font-medium text-green-600">High</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-gray-900 dark:text-white">Customization</td>
                                    <td className="bg-blue-50/30 p-4 font-bold text-green-600 dark:bg-blue-900/10">Unlimited</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-400">Restricted</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-400">Moderate</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-gray-900 dark:text-white">Support</td>
                                    <td className="bg-blue-50/30 p-4 text-red-500 dark:bg-blue-900/10">Community</td>
                                    <td className="p-4 text-green-600">24/7 Live Chat</td>
                                    <td className="p-4 text-green-600">24/7 Phone</td>
                                </tr>
                            </tbody>
                        </table>
                    </GlassCard>
                </div>
            </div>
        </section>
    );
}
