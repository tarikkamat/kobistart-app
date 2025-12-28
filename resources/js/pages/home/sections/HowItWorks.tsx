import { GlassCard } from '@/components/ui/glass-card';
import { ArrowRight, BarChartHorizontal, BrainCircuit, FileInput } from 'lucide-react';

const steps = [
    {
        icon: FileInput,
        title: '1. Tell us about your business',
        description: 'Answer a few simple questions about your products, budget, and tech skills.',
    },
    {
        icon: BrainCircuit,
        title: '2. We analyze the trade-offs',
        description: 'Our engine scores platforms based on 50+ data points specific to your needs.',
    },
    {
        icon: BarChartHorizontal,
        title: '3. Get explained results',
        description: 'See exactly why one platform wins and where others fall short.',
    },
];

export default function HowItWorks() {
    return (
        <section className="relative py-20">
            {/* Background Gradient */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent dark:via-blue-900/10" />

            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                        How KobiStart Works
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                        From confusion to confidence in three simple steps.
                    </p>
                </div>

                <div className="relative grid gap-8 md:grid-cols-3">
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute top-12 left-[16%] hidden h-0.5 w-[68%] bg-gradient-to-r from-blue-200 via-violet-200 to-blue-200 lg:block dark:from-blue-800 dark:via-violet-800 dark:to-blue-800" />

                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            <GlassCard className="h-full pt-12">
                                <div className="absolute top-0 left-1/2 -mt-6 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-white border border-blue-100 shadow-md dark:bg-gray-900 dark:border-blue-900">
                                    <step.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {step.description}
                                </p>
                            </GlassCard>
                            {index < 2 && (
                                <ArrowRight className="absolute top-1/2 -right-4 hidden h-6 w-6 -translate-y-1/2 text-gray-300 md:block lg:hidden dark:text-gray-700" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
