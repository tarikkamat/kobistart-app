import { ExternalLink, Globe, ShieldCheck, Zap } from 'lucide-react';
import { Platform } from '@/types';
import { Button } from '@/components/ui/button';

interface PlatformHeaderProps {
    platform: Platform;
}

export default function PlatformHeader({ platform }: PlatformHeaderProps) {
    return (
        <section className="relative overflow-hidden pt-12 pb-16 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/5 via-transparent to-transparent blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
                    {/* Platform Logo Container */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 flex items-center justify-center shadow-sm">
                        {platform.logo ? (
                            <>
                                <img
                                    src={platform.logo}
                                    alt={platform.name}
                                        className="h-full w-full object-contain dark:hidden"
                                />
                                {platform.dark_logo && (
                                    <img
                                        src={platform.dark_logo}
                                        alt={platform.name}
                                            className="h-full w-full object-contain hidden dark:block"
                                    />
                                )}
                            </>
                        ) : (
                                <span className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-blue-600 to-violet-600 bg-clip-text text-transparent">
                                    {platform.name.charAt(0).toUpperCase()}
                                </span>
                            )}
                            </div>
                    </div>

                    {/* Platform Content Area */}
                    <div className="flex-1 text-center lg:text-left space-y-4">
                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                                    {platform.name}
                                </h1>
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-100 dark:border-blue-800">
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                    Doğrulanmış Platform
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                                <div className="flex items-center gap-1.5">
                                    <Globe className="h-4 w-4" />
                                    {platform.url ? new URL(platform.url).hostname : 'kobis.io'}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Zap className="h-4 w-4 text-yellow-500" />
                                    {platform.plans?.length || 0} Aktif Paket
                        </div>
                            </div>
                        </div>

                        {platform.description ? (
                            <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto lg:mx-0">
                                {platform.description}
                            </p>
                        ) : (
                            <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto lg:mx-0">
                                {platform.name}, işletmenizi büyütmeniz için gereken tüm araçları sunan kapsamlı bir platformdur.
                            </p>
                        )}

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                            <Button asChild size="lg" className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
                                <a href={platform.url} target="_blank" rel="noopener noreferrer">
                                    Hemen Başvur
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-full px-8 border-zinc-200 dark:border-zinc-800" onClick={() => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })}>
                                İncelemeler
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
