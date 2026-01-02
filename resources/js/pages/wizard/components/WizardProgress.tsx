interface WizardProgressProps {
    currentStep: number;
    totalSteps: number;
}

export default function WizardProgress({
    currentStep,
    totalSteps,
}: WizardProgressProps) {
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

    return (
        <div className="mx-auto w-full max-w-lg">
            <div className="relative">
                {/* Background Track */}
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200/50 backdrop-blur-sm dark:bg-white/10">
                    {/* Active Progress */}
                    <div
                        className="relative h-full bg-gradient-to-r from-blue-600 to-violet-600 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-white/30" />
                    </div>
                </div>

                {/* Step Indicators */}
                <div className="absolute -top-1 left-0 flex w-full justify-between px-[1px]">
                    {Array.from({ length: totalSteps }).map((_, idx) => {
                        const step = idx + 1;
                        const isActive = step <= currentStep;
                        const isCurrent = step === currentStep;

                        // Positioning percentage
                        const leftPos =
                            idx === 0
                                ? '0%'
                                : idx === totalSteps - 1
                                  ? '100%'
                                  : `${(idx / (totalSteps - 1)) * 100}%`;
                        const transform =
                            idx === 0
                                ? 'translateX(0)'
                                : idx === totalSteps - 1
                                  ? 'translateX(-100%)'
                                  : 'translateX(-50%)';

                        return (
                            <div
                                key={step}
                                className="absolute top-1"
                                style={{ left: leftPos, transform }}
                            >
                                <div
                                    className={`h-4 w-4 rounded-full border-2 transition-all duration-300 ${
                                        isActive
                                            ? 'scale-125 border-blue-600 bg-white shadow-lg shadow-blue-500/25'
                                            : 'border-gray-300 bg-white dark:border-gray-600'
                                    } ${isCurrent ? 'ring-4 ring-blue-500/20' : ''} `}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-6 text-center">
                <span className="inline-block rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    Adım {currentStep} / {totalSteps}
                </span>
            </div>
        </div>
    );
}
