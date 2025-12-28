import { cn } from '@/lib/utils';
import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    gradient?: boolean;
}

export function GlassCard({
    children,
    className,
    gradient = false,
    ...props
}: GlassCardProps) {
    return (
        <div
            className={cn(
                'glass-card rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl',
                gradient && 'kobi-gradient-bg',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}
