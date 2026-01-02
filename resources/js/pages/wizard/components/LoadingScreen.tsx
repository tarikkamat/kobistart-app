import { Spinner } from '@/components/ui/spinner';
import { useEffect, useState } from 'react';

const messages = [
    'Özellikler analiz ediliyor…',
    'Platformlar karşılaştırılıyor…',
    'AI en iyi sonucu hazırlıyor…',
];

interface LoadingScreenProps {
    duration?: number; // in seconds
}

export default function LoadingScreen({ duration = 4 }: LoadingScreenProps) {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        }, 2000); // Change message every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <div className="relative w-full max-w-md p-1">
                {/* Background Glow */}
                <div className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-r from-primary/50 to-blue-500/50 opacity-20 blur-3xl" />

                {/* Glass Card */}
                <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-12 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

                    <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
                        <div className="relative">
                            <div className="absolute inset-0 animate-pulse rounded-full bg-primary/30 blur-xl" />
                            <div className="relative rounded-full border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                                <Spinner className="h-12 w-12 animate-spin text-primary" />
                            </div>
                        </div>

                        <div className="space-y-3 text-center">
                            <h3 className="min-h-[1.75rem] bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-xl font-bold text-transparent transition-all duration-300">
                                {messages[currentMessageIndex]}
                            </h3>
                            <div className="flex justify-center gap-1">
                                <span className="h-2 w-2 animate-bounce rounded-full bg-primary/50 delay-0" />
                                <span className="h-2 w-2 animate-bounce rounded-full bg-primary/50 delay-150" />
                                <span className="h-2 w-2 animate-bounce rounded-full bg-primary/50 delay-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
