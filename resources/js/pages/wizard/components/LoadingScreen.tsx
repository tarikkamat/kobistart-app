import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

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
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="relative w-full max-w-md p-1">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-blue-500/50 rounded-2xl blur-3xl opacity-20 animate-pulse" />

                {/* Glass Card */}
                <div className="relative rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20 backdrop-blur-xl shadow-2xl overflow-hidden p-12">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full animate-pulse" />
                            <div className="relative bg-white/10 rounded-full p-4 backdrop-blur-md border border-white/20">
                                <Spinner className="h-12 w-12 text-primary animate-spin" />
                            </div>
                        </div>

                        <div className="text-center space-y-3">
                            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 min-h-[1.75rem] transition-all duration-300">
                                {messages[currentMessageIndex]}
                            </h3>
                            <div className="flex justify-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce delay-0" />
                                <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce delay-150" />
                                <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce delay-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

