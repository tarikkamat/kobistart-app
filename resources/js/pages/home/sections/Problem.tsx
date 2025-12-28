import { GlassCard } from '@/components/ui/glass-card';
import { AlertCircle, HelpCircle, SearchX, ZapOff, Ban, ShieldAlert } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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
    const [activeStep, setActiveStep] = useState(-1);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval>;
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let step = 0;
                    if (intervalId) clearInterval(intervalId);
                    
                    intervalId = setInterval(() => {
                        setActiveStep(step);
                        step++;
                        if (step >= problems.length) {
                            clearInterval(intervalId);
                        }
                    }, 600);
                } else {
                    setActiveStep(-1);
                    if (intervalId) clearInterval(intervalId);
                }
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            observer.disconnect();
            if (intervalId) clearInterval(intervalId);
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden py-24 lg:py-32 bg-slate-50 dark:bg-[#020617]">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-[120px] dark:bg-red-500/5" />

            <div className="container mx-auto px-4">
                <div className="mb-20 text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-100 dark:bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-600 dark:text-red-400">
                        <AlertCircle className="h-4 w-4" />
                        <span>The Challenge</span>
                    </div>
                    <h2 className="mx-auto mb-6 max-w-4xl text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                        Choosing a platform is <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">harder</span> than it should be.
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                        Most founders get stuck in analysis paralysis or choose the wrong tool based on generic advice, costing time and money later.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {problems.map((item, index) => {
                        const isActive = activeStep >= index;
                        return (
                            <GlassCard
                                key={index}
                                className={`group relative flex flex-col overflow-hidden border-gray-200 bg-white p-8 transition-all duration-700 dark:border-white/5 dark:bg-white/5
                                    ${isActive ? 'border-red-500/30 bg-red-50/50 translate-y-[-8px] dark:bg-white/[0.08]' : ''}
                                    hover:border-red-500/30 hover:bg-red-50/50 dark:hover:bg-white/[0.08]`}
                            >
                                {/* Abstract Icon Background */}
                                <item.icon className={`absolute -right-6 -top-6 h-32 w-32 transition-colors duration-700
                                    ${isActive ? 'text-red-500/[0.05]' : 'text-gray-200 dark:text-white/[0.02]'}`} />

                                <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} p-0.5 shadow-lg transition-transform duration-700 ${isActive ? 'scale-110 shadow-red-500/20' : ''}`}>
                                    <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white dark:bg-[#020617]">
                                        <item.icon className="h-6 w-6 text-red-500 dark:text-white" />
                                    </div>
                                </div>

                                <div className="relative">
                                    <h3 className={`mb-3 text-xl font-bold transition-colors duration-700 ${isActive ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                                        {item.title}
                                    </h3>
                                    <p className={`leading-relaxed transition-colors duration-700 ${isActive ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>
                                        {item.description}
                                    </p>
                                </div>

                                {/* Corner Accent */}
                                <div className={`absolute bottom-0 right-0 h-16 w-16 transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                                    <div className={`absolute bottom-0 right-0 h-1 w-full bg-gradient-to-l ${item.accent}`} />
                                    <div className={`absolute bottom-0 right-0 h-full w-1 bg-gradient-to-t ${item.accent}`} />
                                </div>
                            </GlassCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
