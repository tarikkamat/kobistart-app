import { GlassCard } from '@/components/ui/glass-card';
import { Link } from '@inertiajs/react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Platform } from '@/types';

// Platform renkleri için mapping (görsel tutarlılık için)
const platformColors: Record<string, string> = {
    shopify: 'bg-[#96bf48]',
    woocommerce: 'bg-[#96588a]',
    wix: 'bg-[#000000]',
    bigcommerce: 'bg-[#000000]',
    ideasosoft: 'bg-[#0057ff]',
    ticimax: 'bg-[#ff0000]',
    magento: 'bg-[#f46f25]',
    opencart: 'bg-[#239cd3]',
};

interface PlatformGridProps {
    platforms: Platform[];
}

export default function PlatformGrid({ platforms }: PlatformGridProps) {
    return (
        <section className="relative overflow-hidden py-20 lg:py-32 bg-slate-50/50 dark:bg-slate-950/50">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-1/2 -z-10 h-[800px] w-[1200px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/10 via-violet-500/5 to-transparent blur-[120px] animate-pulse dark:from-blue-500/20 dark:via-violet-500/10" />
            <div className="absolute top-[20%] right-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-blue-400/10 blur-[100px] animate-float dark:bg-blue-500/20" />
            <div className="absolute bottom-[10%] left-[-5%] -z-10 h-[300px] w-[300px] rounded-full bg-violet-400/10 blur-[80px] animate-float [animation-delay:2s] dark:bg-violet-500/20" />

            <div className="container mx-auto px-4">
                <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <h1 className="mx-auto mb-6 max-w-5xl font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-slate-50">
                        <span className="inline-block">
                            Tüm E-Ticaret
                        </span>
                        <br className="hidden md:block" />
                        <span className="relative inline-block">
                            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 dark:from-blue-400 dark:via-violet-400 dark:to-blue-400 bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
                                Platformları
                            </span>
                        </span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                        Detaylı karşılaştırma ve analiz için platformları keşfedin.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {platforms.map((platform, index) => (
                        <Link
                            key={platform.id}
                            href={`/platforms/${platform.slug}`}
                            className="group animate-in fade-in slide-in-from-bottom-8 duration-1000"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <GlassCard className="h-full p-6 border-white/40 dark:border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] bg-white/40 dark:bg-white/5 hover:shadow-[0_40px_80px_-16px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_40px_80px_-16px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                                <div className="flex flex-col h-full">
                                    {/* Platform Logo/Icon */}
                                    <div className="mb-4 flex items-center gap-4">
                                        {platform.logo ? (
                                            <>
                                                <img
                                                    src={platform.logo}
                                                    alt={platform.name}
                                                    className="h-12 w-12 object-contain dark:hidden"
                                                />
                                                {platform.dark_logo && (
                                                    <img
                                                        src={platform.dark_logo}
                                                        alt={platform.name}
                                                        className="h-12 w-12 object-contain hidden dark:block"
                                                    />
                                                )}
                                            </>
                                        ) : platform.favicon ? (
                                            <img
                                                src={platform.favicon}
                                                alt={platform.name}
                                                className="h-12 w-12 object-contain"
                                            />
                                        ) : (
                                            <div className={cn(
                                                "h-12 w-12 rounded-xl flex items-center justify-center shrink-0",
                                                platformColors[platform.slug] || 'bg-gray-400'
                                            )}>
                                                <span className="text-white font-bold text-lg">
                                                    {platform.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Platform Name */}
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {platform.name}
                                    </h3>

                                    {/* Platform URL */}
                                    {platform.url && (
                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                            <ExternalLink className="h-4 w-4" />
                                            <span className="truncate">{platform.url}</span>
                                        </div>
                                    )}

                                    {/* Plans Count */}
                                    {platform.plans && platform.plans.length > 0 && (
                                        <div className="mt-auto pt-4 border-t border-gray-200/50 dark:border-white/10">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    {platform.plans.length} Paket
                                                </span>
                                                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors group-hover:translate-x-1 duration-300" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </GlassCard>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

