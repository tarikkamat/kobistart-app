import { GlassCard } from '@/components/ui/glass-card';
import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    Filter,
    Globe,
    MapPin,
    Search,
    Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Platform } from '@/types';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';

interface PlatformGridProps {
    platforms: Platform[];
}

type Category = 'all' | 'local' | 'global';

export default function PlatformGrid({ platforms }: PlatformGridProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState<Category>('all');

    const filteredPlatforms = useMemo(() => {
        return platforms.filter((platform) => {
            const matchesSearch =
                platform.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                platform.url?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory =
                category === 'all' ||
                (category === 'local' && platform.is_local) ||
                (category === 'global' && !platform.is_local);

            return matchesSearch && matchesCategory;
        });
    }, [platforms, searchQuery, category]);

    return (
        <section className="relative min-h-screen overflow-hidden bg-white dark:bg-slate-950">
            {/* Ultra-Modern Ambient Background */}
            <div className="absolute top-0 left-1/2 -z-10 h-[1000px] w-[1400px] -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-tr from-blue-600/10 via-indigo-500/5 to-transparent blur-[140px] dark:from-blue-500/20 dark:via-indigo-500/10" />
            <div className="animate-float absolute top-[10%] right-[-5%] -z-10 h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-[120px] dark:bg-blue-600/15" />
            <div className="animate-float absolute bottom-[5%] left-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-violet-400/10 blur-[100px] [animation-delay:3s] dark:bg-violet-600/15" />

            {/* Decorative Mesh Gradient */}
            <div
                className="absolute inset-0 -z-20 opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            {/* Hero Header */}
            <div className="relative container mx-auto px-4 pt-12 pb-20 lg:pt-16 lg:pb-32">
                <div className="mx-auto max-w-4xl animate-in text-center duration-1000 ease-out slide-in-from-top-10 fade-in">
                    <div className="mb-6 inline-flex animate-bounce items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold tracking-widest text-blue-600 uppercase dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
                        <Sparkles className="h-3 w-3" />
                        <span>Keşfetmeye Başla</span>
                    </div>

                    <h1 className="mb-8 font-display text-4xl leading-[1.05] font-black tracking-tight text-slate-900 md:text-6xl lg:text-7xl dark:text-white">
                        E-Ticaretin <br />
                        <span className="relative inline-block">
                            <span className="animate-gradient-x bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-[length:200%_auto] bg-clip-text text-transparent">
                                Yeni Nesil Hub'ı
                            </span>
                            <div className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-blue-600/0 via-blue-600/50 to-blue-600/0" />
                        </span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-slate-600 md:text-xl dark:text-slate-400">
                        İşinizi büyütecek en iyi e-ticaret platformlarını tek
                        bir yerde karşılaştırın, analiz edin ve doğru kararı
                        verin.
                    </p>
                </div>
            </div>

            <div className="relative container mx-auto px-4 pb-24 lg:pb-40">
                {/* Search & Filters */}
                <div className="mx-auto mb-16 max-w-5xl animate-in space-y-8 delay-300 duration-1000 slide-in-from-bottom-10 fade-in">
                    <div className="group relative">
                        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 opacity-20 blur transition duration-500 group-focus-within:opacity-40" />
                        <div className="relative flex items-center">
                            <Search className="absolute left-5 h-5 w-5 text-slate-400 transition-colors group-focus-within:text-blue-500" />
                            <Input
                                type="text"
                                placeholder="Platform ara (örn: Shopify, Ticimax...)"
                                className="h-16 rounded-2xl border-slate-200 bg-white pr-6 pl-14 text-lg shadow-xl transition-all focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900/80"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {(['all', 'local', 'global'] as const).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={cn(
                                    'flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300',
                                    category === cat
                                        ? 'scale-105 bg-slate-900 text-white shadow-lg dark:bg-white dark:text-slate-900'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700',
                                )}
                            >
                                {cat === 'all' && (
                                    <Filter className="h-4 w-4" />
                                )}
                                {cat === 'local' && (
                                    <MapPin className="h-4 w-4" />
                                )}
                                {cat === 'global' && (
                                    <Globe className="h-4 w-4" />
                                )}
                                {cat === 'all'
                                    ? 'Tüm Platformlar'
                                    : cat === 'local'
                                      ? 'Yerel Çözümler'
                                      : 'Global Devler'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <div className="mx-auto mb-8 flex max-w-7xl animate-in items-center justify-between duration-700 fade-in">
                    <p className="text-sm font-semibold text-slate-500">
                        <span className="text-slate-900 dark:text-white">
                            {filteredPlatforms.length}
                        </span>{' '}
                        platform listeleniyor
                    </p>
                </div>

                {/* Platform Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {filteredPlatforms.map((platform, index) => {
                        return (
                            <Link
                                key={platform.id}
                                href={`/platforms/${platform.slug}`}
                                className="group block"
                            >
                                <GlassCard className="relative h-full overflow-hidden rounded-2xl border-slate-200/50 bg-white/70 p-0 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] hover:bg-white dark:border-white/5 dark:bg-slate-900/40 dark:group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.2)] dark:hover:bg-slate-900">
                                    {/* Card Top Border Accent */}
                                    <div
                                        className="absolute top-0 left-0 h-1 w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                        style={{
                                            backgroundColor:
                                                platform.color || '#2563eb',
                                        }}
                                    />

                                    <div className="flex h-full flex-col p-5">
                                        {/* Header */}
                                        <div className="mb-6 flex items-start justify-between">
                                            <div className="relative">
                                                <div className="relative flex h-8 w-24 items-center justify-start">
                                                    {platform.logo ? (
                                                        <>
                                                            <img
                                                                src={
                                                                    platform.logo
                                                                }
                                                                alt={
                                                                    platform.name
                                                                }
                                                                className="h-full w-full transform object-contain object-left transition-transform duration-500 group-hover:scale-105 dark:hidden"
                                                            />
                                                            {platform.dark_logo && (
                                                                <img
                                                                    src={
                                                                        platform.dark_logo
                                                                    }
                                                                    alt={
                                                                        platform.name
                                                                    }
                                                                    className="hidden h-full w-full transform object-contain object-left transition-transform duration-500 group-hover:scale-105 dark:block"
                                                                />
                                                            )}
                                                        </>
                                                    ) : (
                                                        <div
                                                            className="flex items-center justify-center rounded-lg px-3 py-1.5"
                                                            style={{
                                                                backgroundColor:
                                                                    platform.color ||
                                                                    '#64748b',
                                                            }}
                                                        >
                                                            <span className="text-sm font-black whitespace-nowrap text-white">
                                                                {platform.name}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div
                                                className={cn(
                                                    'rounded-md border px-2 py-0.5 text-[9px] font-black tracking-wider uppercase',
                                                    platform.is_local
                                                        ? 'border-amber-100 bg-amber-50 text-amber-600 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400'
                                                        : 'border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400',
                                                )}
                                            >
                                                {platform.is_local
                                                    ? 'Yerel'
                                                    : 'Global'}
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase">
                                                    Paket
                                                </span>
                                                <span className="text-base font-black text-slate-900 dark:text-white">
                                                    {platform.plans?.length ||
                                                        0}
                                                </span>
                                            </div>

                                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 transition-all duration-300 group-hover:bg-slate-900 group-hover:text-white dark:bg-slate-800 dark:group-hover:bg-white dark:group-hover:text-slate-900">
                                                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-0.5" />
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            </Link>
                        );
                    })}
                </div>

                {/* Empty State */}
                {filteredPlatforms.length === 0 && (
                    <div className="animate-in py-20 text-center duration-500 fade-in zoom-in">
                        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 dark:bg-slate-900">
                            <Search className="h-8 w-8 text-slate-400" />
                        </div>
                        <h3 className="mb-2 text-2xl font-black text-slate-900 dark:text-white">
                            Platform Bulunamadı
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400">
                            Aramanızla eşleşen bir platform bulamadık. Lütfen
                            farklı bir anahtar kelime deneyin.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setCategory('all');
                            }}
                            className="mt-6 font-bold text-blue-600 hover:underline"
                        >
                            Tümünü Göster
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
