import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Platform } from '@/types';

interface PlatformHeaderProps {
    platform: Platform;
}

export default function PlatformHeader({ platform }: PlatformHeaderProps) {
    return (
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-32 bg-slate-50/50 dark:bg-slate-950/50">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-1/2 -z-10 h-[800px] w-[1200px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/10 via-violet-500/5 to-transparent blur-[120px] animate-pulse dark:from-blue-500/20 dark:via-violet-500/10" />
            <div className="absolute top-[20%] right-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-blue-400/10 blur-[100px] animate-float dark:bg-blue-500/20" />
            <div className="absolute bottom-[10%] left-[-5%] -z-10 h-[300px] w-[300px] rounded-full bg-violet-400/10 blur-[80px] animate-float [animation-delay:2s] dark:bg-violet-500/20" />

            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    {/* Back Link */}
                    <Link
                        href="/platforms"
                        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-700"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Tüm Platformlara Dön
                    </Link>

                    {/* Platform Logo */}
                    <div className="mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
                        {platform.logo ? (
                            <>
                                <img
                                    src={platform.logo}
                                    alt={platform.name}
                                    className="h-24 w-24 md:h-32 md:w-32 object-contain mx-auto dark:hidden"
                                />
                                {platform.dark_logo && (
                                    <img
                                        src={platform.dark_logo}
                                        alt={platform.name}
                                        className="h-24 w-24 md:h-32 md:w-32 object-contain mx-auto hidden dark:block"
                                    />
                                )}
                            </>
                        ) : platform.favicon ? (
                            <img
                                src={platform.favicon}
                                alt={platform.name}
                                className="h-24 w-24 md:h-32 md:w-32 object-contain mx-auto"
                            />
                        ) : (
                            <div className="h-24 w-24 md:h-32 md:w-32 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center mx-auto shadow-lg">
                                <span className="text-white font-bold text-4xl md:text-5xl">
                                    {platform.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Platform Name */}
                    <h1 className="mx-auto mb-6 max-w-5xl font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-slate-50 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                        <span className="inline-block">
                            {platform.name}
                        </span>
                    </h1>

                    {/* Platform URL */}
                    {platform.url && (
                        <div className="mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                            <a
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-white/10 transition-all hover:shadow-lg backdrop-blur-sm"
                            >
                                <ExternalLink className="h-5 w-5" />
                                <span className="font-medium">{platform.url}</span>
                            </a>
                        </div>
                    )}

                    {/* Platform Info */}
                    {platform.plans && platform.plans.length > 0 && (
                        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-blue-500" />
                                <span className="font-semibold">{platform.plans.length} Paket Seçeneği</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

