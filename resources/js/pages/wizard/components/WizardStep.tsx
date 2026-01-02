import { PropsWithChildren } from 'react';

interface WizardStepProps {
    title: string;
    description?: string;
}

export default function WizardStep({
    title,
    description,
    children,
}: PropsWithChildren<WizardStepProps>) {
    return (
        <div className="animate-in space-y-6 duration-300 fade-in slide-in-from-right-4">
            <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {title}
                </h2>
                {description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {description}
                    </p>
                )}
            </div>
            <div className="pt-2">{children}</div>
        </div>
    );
}
