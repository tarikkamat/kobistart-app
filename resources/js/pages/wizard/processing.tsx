import LandingLayout from '@/layouts/LandingLayout';
import wizardRoutes from '@/routes/wizard';
import { Head, router, usePage } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PageProps extends Record<string, unknown> {
    sessionId?: string;
}

export default function WizardProcessing() {
    const { sessionId } = usePage<PageProps>().props;
    const [status, setStatus] = useState<'processing' | 'ready' | 'error'>(
        'processing',
    );
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let pollInterval: NodeJS.Timeout;
        let attempts = 0;
        const maxAttempts = 100; // 5 minutes max (3 second intervals = 300 seconds)

        const checkStatus = async () => {
            try {
                attempts++;

                if (attempts > maxAttempts) {
                    setStatus('error');
                    setError('Analiz çok uzun sürdü. Lütfen tekrar deneyin.');
                    return;
                }

                const response = await fetch(
                    wizardRoutes.checkAnalysis.url({
                        query: { session_id: sessionId },
                    }),
                    {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                        },
                    },
                );

                const data = await response.json();

                if (data.ready && data.result && data.analysisId) {
                    setStatus('ready');
                    // Redirect to result page with analysisId
                    router.visit(
                        wizardRoutes.result.url({
                            query: { analysisId: data.analysisId },
                        }),
                    );
                }
            } catch (err) {
                console.error('Polling error:', err);
                // Continue polling on error
            }
        };

        // Start polling immediately, then every 3 seconds
        checkStatus();
        pollInterval = setInterval(checkStatus, 3000);

        return () => {
            if (pollInterval) {
                clearInterval(pollInterval);
            }
        };
    }, [sessionId]);

    return (
        <LandingLayout>
            <Head title="Analiz İşleniyor - Platform Önerisi" />
            <div className="container mx-auto max-w-4xl px-4 py-12">
                <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-8">
                    {status === 'processing' && (
                        <>
                            <div className="relative">
                                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                            </div>
                            <div className="space-y-4 text-center">
                                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                                    Analiz İşleniyor
                                </h1>
                                <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
                                    AI asistanınız işletmenizin ihtiyaçlarına en
                                    uygun platformu analiz ediyor. Bu işlem
                                    birkaç dakika sürebilir...
                                </p>
                                <div className="flex items-center justify-center space-x-2 text-sm text-zinc-500 dark:text-zinc-400">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>
                                        Lütfen bekleyin, sayfayı kapatmayın
                                    </span>
                                </div>
                            </div>
                        </>
                    )}

                    {status === 'error' && (
                        <div className="space-y-4 text-center">
                            <div className="mb-4 text-6xl text-red-500">⚠️</div>
                            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                                Bir Hata Oluştu
                            </h1>
                            <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
                                {error || 'Analiz sırasında bir hata oluştu.'}
                            </p>
                            <button
                                onClick={() => router.visit('/wizard')}
                                className="rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary/90"
                            >
                                Tekrar Dene
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </LandingLayout>
    );
}
