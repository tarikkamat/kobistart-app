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
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">{title}</CardTitle>
                {description && (
                    <CardDescription className="text-base">{description}</CardDescription>
                )}
            </CardHeader>
            <CardContent className="space-y-6">
                {children}
            </CardContent>
        </Card>
    );
}

