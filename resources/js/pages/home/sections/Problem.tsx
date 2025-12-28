import { GlassCard } from '@/components/ui/glass-card';
import { AlertCircle, HelpCircle, SearchX, ZapOff, Ban, ShieldAlert } from 'lucide-react';

const problems = [
    {
        icon: SearchX,
        title: 'Analysis Paralysis',
        description: 'Hundreds of platforms with complex feature lists make it impossible to choose confidently.',
        accent: 'from-red-500 to-orange-500',
    },
    {
        icon: ShieldAlert,
        title: 'Hidden Traps',
        description: 'Transaction fees and hidden app costs that significantly impact your long-term margins.',
        accent: 'from-orange-500 to-amber-500',
    },
    {
        icon: HelpCircle,
        title: 'Lack of Clarity',
        description: 'Most recommendations are based on affiliate commissions, not your actual business needs.',
        accent: 'from-amber-500 to-red-500',
    },
    {
        icon: Ban,
        title: 'The Wrong Fit',
        description: 'Choosing a platform that doesn’t scale with you can cost thousands in migration fees.',
        accent: 'from-red-600 to-red-400',
    },
];

export default function Problem() {
    return (
        <section className="relative overflow-hidden py-24 lg:py-32">
            {/* Background Decor */}
            <div className="absolute inset-0 -z-10 bg-[#020617]" />
            <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/5 blur-[120px]" />

            <div className="container mx-auto px-4">
                <div className="mb-20 text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-400">
                        <AlertCircle className="h-4 w-4" />
                        <span>The Challenge</span>
                    </div>
                    <h2 className="mx-auto mb-6 max-w-4xl text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                        Choosing a platform is <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">harder</span> than it should be.
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">
                        Most founders get stuck in analysis paralysis or choose the wrong tool based on generic advice, costing time and money later.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {problems.map((item, index) => (
                        <GlassCard
                            key={index}
                            className="group relative flex flex-col overflow-hidden border-white/5 bg-white/5 p-8 transition-all duration-500 hover:border-red-500/30 hover:bg-white/[0.08]"
                        >
                            {/* Abstract Icon Background */}
                            <item.icon className="absolute -right-6 -top-6 h-32 w-32 text-white/[0.02] transition-colors duration-500 group-hover:text-red-500/[0.05]" />

                            <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} p-0.5 shadow-lg`}>
                                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#020617]">
                                    <item.icon className="h-6 w-6 text-white" />
                                </div>
                            </div>

                            <div className="relative">
                                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                    {item.description}
                                </p>
                            </div>

                            {/* Corner Accent */}
                            <div className={`absolute bottom-0 right-0 h-16 w-16 opacity-0 transition-opacity duration-500 group-hover:opacity-100`}>
                                <div className={`absolute bottom-0 right-0 h-1 w-full bg-gradient-to-l ${item.accent}`} />
                                <div className={`absolute bottom-0 right-0 h-full w-1 bg-gradient-to-t ${item.accent}`} />
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
