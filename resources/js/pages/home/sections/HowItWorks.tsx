import { GlassCard } from '@/components/ui/glass-card';
import { BarChart3, BrainCircuit, ClipboardList, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const steps = [
    {
        icon: ClipboardList,
        title: 'Tell us about your business',
        description: 'Answer a few simple questions about your products, budget, and tech skills.',
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
    },
    {
        icon: BrainCircuit,
        title: 'We analyze the trade-offs',
        description: 'Our engine scores platforms based on 50+ data points specific to your needs.',
        color: 'text-indigo-500',
        bgColor: 'bg-indigo-500/10',
    },
    {
        icon: BarChart3,
        title: 'Get explained results',
        description: 'See exactly why one platform wins and where others fall short.',
        color: 'text-violet-500',
        bgColor: 'bg-violet-500/10',
    },
];

export default function HowItWorks() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeStep, setActiveStep] = useState(-1);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval>;
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    
                    // Start staggered activation
                    let step = 0;
                    if (intervalId) clearInterval(intervalId);
                    
                    intervalId = setInterval(() => {
                        setActiveStep(step);
                        step++;
                        if (step >= steps.length) {
                            clearInterval(intervalId);
                        }
                    }, 800);
                } else {
                    // Reset everything when scrolled out
                    setIsVisible(false);
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
        <section ref={sectionRef} className="relative overflow-hidden py-24 lg:py-32">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 -z-10 bg-[#030712]" />
            <div className="absolute top-1/2 left-1/4 -z-10 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-[100px]" />

            <div className="container mx-auto px-4">
                <div className="mb-20 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400">
                        <Sparkles className="h-4 w-4" />
                        <span>The Process</span>
                    </div>
                    <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
                        How <span className="text-blue-500">KobiStart</span> Works
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">
                        From confusion to confidence in three simple steps. We handle the complexity so you can focus on building.
                    </p>
                </div>

                <div className="relative grid gap-8 md:grid-cols-3">
                    {/* Connecting Flow Line (Desktop) */}
                    <div className="absolute top-[60px] left-[15%] hidden h-[2px] w-[70%] bg-white/5 md:block overflow-hidden rounded-full">
                        <div 
                            className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 transition-transform duration-[2400ms] ease-out"
                            style={{
                                transform: `scaleX(${isVisible ? 1 : 0})`,
                                transformOrigin: 'left',
                                boxShadow: '0 0 15px rgba(99,102,241,0.5)'
                            }}
                        />
                    </div>

                    {steps.map((step, index) => {
                        const isActive = activeStep >= index;
                        return (
                            <div key={index} className="group relative">
                                <GlassCard 
                                    className={`relative h-full overflow-hidden border-white/5 transition-all duration-700 
                                        ${isActive ? 'border-blue-500/40 bg-white/[0.08] translate-y-[-8px]' : 'bg-white/5'}
                                        hover:border-blue-500/30 hover:bg-white/[0.08]`}
                                >
                                    {/* Step Number Background */}
                                    <div className={`absolute -right-4 -top-8 select-none text-9xl font-bold transition-colors duration-700
                                        ${isActive ? 'text-blue-500/[0.05]' : 'text-white/[0.02]'}`}>
                                        0{index + 1}
                                    </div>

                                    <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${step.bgColor} border border-white/10 shadow-lg transition-transform duration-700 ${isActive ? 'scale-110 shadow-blue-500/20' : ''}`}>
                                        <step.icon className={`h-7 w-7 ${step.color}`} />
                                    </div>

                                    <div className="relative">
                                        <h3 className={`mb-4 text-xl font-bold transition-colors duration-700 ${isActive ? 'text-blue-400' : 'text-white'}`}>
                                            {index + 1}. {step.title}
                                        </h3>
                                        <p className={`leading-relaxed transition-colors duration-700 ${isActive ? 'text-gray-200' : 'text-gray-400'}`}>
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Bottom Accent Line */}
                                    <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-700 
                                        ${isActive ? 'w-full' : 'w-0'}`} />
                                </GlassCard>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
