import { GlassCard } from '@/components/ui/glass-card';
import { AlertTriangle, HelpCircle, SearchX, ZapOff } from 'lucide-react';

const problems = [
    {
        icon: SearchX,
        title: 'Too Many Options',
        description: 'Hundreds of platforms with confusing feature lists.',
    },
    {
        icon: AlertTriangle,
        title: 'Hidden Costs',
        description: 'Transaction fees and app costs they don’t tell you upfront.',
    },
    {
        icon: HelpCircle,
        title: 'No Real Explanation',
        description: 'Why was Platform A recommended over Platform B?',
    },
    {
        icon: ZapOff,
        title: 'Generic Advice',
        description: '“Just use Shopify” isn’t always the right answer.',
    },
];

export default function Problem() {
    return (
        <section className="relative py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                        Choosing a platform is <span className="text-red-500">harder</span> than it should be.
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                        Most founders get stuck in analysis paralysis or choose the wrong tool, costing time and money later.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {problems.map((item, index) => (
                        <GlassCard
                            key={index}
                            className="group flex flex-col items-center text-center hover:bg-red-50/50 dark:hover:bg-red-900/10"
                        >
                            <div className="mb-4 rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                                <item.icon className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {item.description}
                            </p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
