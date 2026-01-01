import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CallToAction() {
    return (
        <section className="relative py-12 bg-gradient-to-b from-indigo-50/30 via-blue-50/20 to-white dark:from-indigo-950/10 dark:via-blue-950/5 dark:to-transparent overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-500/5" />
            <div className="container mx-auto px-4">
                <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 py-10 text-center shadow-2xl md:px-10 md:py-14 dark:bg-white/5 dark:ring-1 dark:ring-white/10">
                    {/* Decorative background elements */}
                    <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-blue-500/20 blur-[100px]" />
                    <div className="absolute -right-20 -bottom-20 h-48 w-48 rounded-full bg-indigo-500/20 blur-[100px]" />

                    <div className="relative z-10">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20">
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>Ölçeklenmeye hazır mısınız?</span>
                        </div>

                        <h2 className="mb-4 text-2xl font-bold tracking-tight text-white md:text-4xl">
                            Tahmin etmeyi bırakın. <br className="hidden sm:block" />
                            Güvenle seçmeye başlayın.
                        </h2>

                        <p className="mx-auto mb-8 max-w-2xl text-base text-gray-400">
                            Doğru altyapıyı en başta seçerek haftalarca süren araştırmadan ve binlerce dolardan tasarruf eden yüzlerce girişimciye katılın.
                        </p>

                        <div className="relative mx-auto mb-8 mt-10 max-w-4xl h-[200px]">
                            {/* SVG Connections */}
                            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Lines from bottom center to platforms */}
                                <path d="M400 180 C400 130, 100 130, 100 50" stroke="currentColor" strokeWidth="1.5" className="text-gray-700/40" />
                                <path d="M400 180 C400 130, 250 130, 250 50" stroke="currentColor" strokeWidth="1.5" className="text-gray-700/40" />
                                <path d="M400 180 C400 120, 400 120, 400 50" stroke="currentColor" strokeWidth="1.5" className="text-gray-700/40" />
                                <path d="M400 180 C400 130, 550 130, 550 50" stroke="currentColor" strokeWidth="1.5" className="text-gray-700/40" />
                                <path d="M400 180 C400 130, 700 130, 700 50" stroke="currentColor" strokeWidth="1.5" className="text-gray-700/40" />
                            </svg>

                            {/* Platform Labels */}
                            <div className="absolute top-6 left-[12%] -translate-x-1/2 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Shopify</div>
                            <div className="absolute top-6 left-[31%] -translate-x-1/2 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Ticimax</div>
                            <div className="absolute top-6 left-[50%] -translate-x-1/2 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Ideasoft</div>
                            <div className="absolute top-6 left-[69%] -translate-x-1/2 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">BigCommerce</div>
                            <div className="absolute top-6 left-[88%] -translate-x-1/2 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">WooCommerce</div>

                            {/* Central KobiStart Logo Area */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-[0_0_30px_-8px_rgba(37,99,235,0.5)] ring-2 ring-gray-900">
                                    <div className="flex flex-col gap-0.5 transform rotate-12">
                                        <div className="h-1 w-5 rounded-full bg-white/40" />
                                        <div className="h-1 w-6 rounded-full bg-white" />
                                        <div className="h-1 w-5 rounded-full bg-white/60" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button
                                size="lg"
                                className="group h-12 rounded-full bg-blue-600 px-6 text-base font-semibold text-white shadow-lg transition-all hover:bg-blue-500 hover:shadow-blue-500/25"
                            >
                                En İyi Platformumu Bul
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
