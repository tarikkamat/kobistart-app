import { cn } from '@/lib/utils';

interface WizardProgressProps {
    currentStep: number;
    totalSteps: number;
}

export default function WizardProgress({ currentStep, totalSteps }: WizardProgressProps) {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                    Adım {currentStep} / {totalSteps}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                    %{Math.round(progress)}
                </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                    className="h-full bg-primary transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}

