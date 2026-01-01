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
            <Card className="w-full max-w-md">
                <CardContent className="flex flex-col items-center justify-center space-y-6 py-12">
                    <Spinner className="h-12 w-12 text-primary" />
                    <div className="text-center space-y-2">
                        <p className="text-lg font-semibold">
                            {messages[currentMessageIndex]}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Lütfen bekleyin...
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

