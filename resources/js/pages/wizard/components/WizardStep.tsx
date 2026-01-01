import { PropsWithChildren } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface WizardStepProps {
    title: string;
    description?: string;
}

export default function WizardStep({
    title,
    description,
    children
}: PropsWithChildren<WizardStepProps>) {
    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
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
            <div className="pt-2">
                {children}
            </div>
        </div>
    );
}

