import { cn } from '@/lib/utils';

interface WizardProgressProps {
    currentStep: number;
    totalSteps: number;
}

export default function WizardProgress({ currentStep, totalSteps }: WizardProgressProps) {
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="relative">
                {/* Background Track */}
                <div className="h-3 w-full bg-gray-200/50 dark:bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                    {/* Active Progress */}
                    <div
                        className="h-full bg-gradient-to-r from-blue-600 to-violet-600 transition-all duration-500 ease-out relative"
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]" />
                    </div>
                </div>

                {/* Step Indicators */}
                <div className="absolute -top-1 left-0 w-full flex justify-between px-[1px]">
                    {Array.from({ length: totalSteps }).map((_, idx) => {
                        const step = idx + 1;
                        const isActive = step <= currentStep;
                        const isCurrent = step === currentStep;

                        // Positioning percentage
                        const leftPos = idx === 0 ? '0%' : idx === totalSteps - 1 ? '100%' : `${(idx / (totalSteps - 1)) * 100}%`;
                        const transform = idx === 0 ? 'translateX(0)' : idx === totalSteps - 1 ? 'translateX(-100%)' : 'translateX(-50%)';

                        return (
                            <div
                                key={step}
                                className="absolute top-1"
                                style={{ left: leftPos, transform }}
                            >
                                <div className={`
                                    w-4 h-4 rounded-full border-2 transition-all duration-300
                                    ${isActive
                                        ? 'bg-white border-blue-600 scale-125 shadow-lg shadow-blue-500/25'
                                        : 'bg-white border-gray-300 dark:border-gray-600'}
                                    ${isCurrent ? 'ring-4 ring-blue-500/20' : ''}
                                `} />
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="text-center mt-6">
                <span className="inline-block px-4 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-sm font-semibold text-blue-600 dark:text-blue-400">
                    Adım {currentStep} / {totalSteps}
                </span>
            </div>
        </div>
    );
}

