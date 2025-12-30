import { GlassCard } from '@/components/ui/glass-card';
import { Link } from '@inertiajs/react';
import { ArrowRight, ExternalLink, Search, Sparkles, Filter, Globe, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Platform } from '@/types';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';

// Platform renkleri için mapping
const platformColors: Record<string, string> = {
    shopify: 'bg-[#96bf48]',
    woocommerce: 'bg-[#96588a]',
    wix: 'bg-[#000000]',
    bigcommerce: 'bg-[#000000]',
    ideasoft: 'bg-[#0057ff]',
    ticimax: 'bg-[#ff0000]',
    magento: 'bg-[#f46f25]',
    opencart: 'bg-[#239cd3]',
};

// Yerel (TR) platformlar listesi
const localPlatforms = ['ticimax', 'ideasoft', 't-soft', 'ikas', 'shopyy'];

interface PlatformGridProps {
    platforms: Platform[];
}

type Category = 'all' | 'local' | 'global';

export default function PlatformGrid({ platforms }: PlatformGridProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState<Category>('all');

    const filteredPlatforms = useMemo(() => {
        return platforms.filter((platform) => {
            const matchesSearch = platform.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 platform.url?.toLowerCase().includes(searchQuery.toLowerCase());
            
            const isLocal = localPlatforms.includes(platform.slug.toLowerCase());
            const matchesCategory = category === 'all' || 
                                   (category === 'local' && isLocal) || 
                                   (category === 'global' && !isLocal);

            return matchesSearch && matchesCategory;
        });
    }, [platforms, searchQuery, category]);

    return (
        <section className="relative min-h-screen overflow-hidden py-24 lg:py-40 bg-white dark:bg-slate-950">
            {/* Ultra-Modern Ambient Background */}
            <div className="absolute top-0 left-1/2 -z-10 h-[1000px] w-[1400px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-600/10 via-indigo-500/5 to-transparent blur-[140px] animate-pulse dark:from-blue-500/20 dark:via-indigo-500/10" />
            <div className="absolute top-[10%] right-[-5%] -z-10 h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-[120px] animate-float dark:bg-blue-600/15" />
            <div className="absolute bottom-[5%] left-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-violet-400/10 blur-[100px] animate-float [animation-delay:3s] dark:bg-violet-600/15" />
            
            {/* Decorative Mesh Gradient */}
            <div className="absolute inset-0 -z-20 opacity-[0.03] dark:opacity-[0.05]" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
            />

            <div className="container mx-auto px-4 relative">
                {/* Hero Header */}
                <div className="max-w-4xl mx-auto text-center mb-20 animate-in fade-in slide-in-from-top-10 duration-1000 ease-out">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase mb-6 animate-bounce">
                        <Sparkles className="h-3 w-3" />
                        <span>Keşfetmeye Başla</span>
                    </div>
                    
                    <h1 className="mb-8 font-display text-4xl font-black leading-[1.05] tracking-tight text-slate-900 md:text-6xl lg:text-7xl dark:text-white">
                        E-Ticaretin <br />
                        <span className="relative inline-block">
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
                                Yeni Nesil Hub'ı
                            </span>
                            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600/0 via-blue-600/50 to-blue-600/0" />
                        </span>
                    </h1>
                    
                    <p className="mx-auto max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        İşinizi büyütecek en iyi e-ticaret platformlarını tek bir yerde 
                        karşılaştırın, analiz edin ve doğru kararı verin.
                    </p>
                </div>

                {/* Search & Filters */}
                <div className="max-w-5xl mx-auto mb-16 space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500" />
                        <div className="relative flex items-center">
                            <Search className="absolute left-5 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            <Input
                                type="text"
                                placeholder="Platform ara (örn: Shopify, Ticimax...)"
                                className="h-16 pl-14 pr-6 rounded-2xl bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-lg focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xl"
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
                                    "px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2",
                                    category === cat
                                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg scale-105"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                                )}
                            >
                                {cat === 'all' && <Filter className="h-4 w-4" />}
                                {cat === 'local' && <MapPin className="h-4 w-4" />}
                                {cat === 'global' && <Globe className="h-4 w-4" />}
                                {cat === 'all' ? 'Tüm Platformlar' : cat === 'local' ? 'Yerel Çözümler' : 'Global Devler'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between animate-in fade-in duration-700">
                    <p className="text-sm font-semibold text-slate-500">
                        <span className="text-slate-900 dark:text-white">{filteredPlatforms.length}</span> platform listeleniyor
                    </p>
                </div>

                {/* Platform Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredPlatforms.map((platform, index) => {
                        const isLocal = localPlatforms.includes(platform.slug.toLowerCase());
                        return (
                            <Link
                                key={platform.id}
                                href={`/platforms/${platform.slug}`}
                                className="group block"
                            >
                                <GlassCard className="h-full relative overflow-hidden p-0 border-slate-200/50 dark:border-white/5 bg-white/70 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover:-translate-y-2 rounded-3xl">
                                    {/* Card Top Border Accent */}
                                    <div className={cn(
                                        "absolute top-0 left-0 w-full h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                                        platformColors[platform.slug.toLowerCase()] || 'bg-blue-600'
                                    )} />

                                        <div className="p-8 flex flex-col h-full">
                                            {/* Header */}
                                            <div className="flex items-start justify-between mb-12">
                                                <div className="relative">
                                                    <div className="absolute -inset-4 bg-slate-100 dark:bg-slate-800 rounded-2xl opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-110 transition-all duration-500" />
                                                    <div className="relative h-12 w-32 flex items-center justify-start">
                                                        {platform.logo ? (
                                                            <>
                                                                <img
                                                                    src={platform.logo}
                                                                    alt={platform.name}
                                                                    className="h-full w-full object-contain object-left dark:hidden transform group-hover:scale-105 transition-transform duration-500"
                                                                />
                                                                {platform.dark_logo && (
                                                                    <img
                                                                        src={platform.dark_logo}
                                                                        alt={platform.name}
                                                                        className="h-full w-full object-contain object-left hidden dark:block transform group-hover:scale-105 transition-transform duration-500"
                                                                    />
                                                                )}
                                                            </>
                                                        ) : (
                                                            <div className={cn(
                                                                "px-4 py-2 rounded-xl flex items-center justify-center",
                                                                platformColors[platform.slug.toLowerCase()] || 'bg-slate-400'
                                                            )}>
                                                                <span className="text-white font-black text-lg whitespace-nowrap">
                                                                    {platform.name}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className={cn(
                                                    "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border",
                                                    isLocal 
                                                        ? "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
                                                        : "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20"
                                                )}>
                                                    {isLocal ? 'Yerel' : 'Global'}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="space-y-4 mb-8">
                                                {platform.url && (
                                                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                                                        <ExternalLink className="h-3.5 w-3.5" />
                                                        <span className="text-xs font-bold truncate max-w-[150px]">
                                                            {platform.url.replace(/^https?:\/\//, '').split('/')[0]}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                        {/* Footer */}
                                        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Paketler</span>
                                                <span className="text-lg font-black text-slate-900 dark:text-white">
                                                    {platform.plans?.length || 0}
                                                </span>
                                            </div>
                                            
                                            <div className="h-10 w-10 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-slate-900 transition-all duration-300">
                                                <ArrowRight className="h-5 w-5 transform group-hover:translate-x-0.5" />
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
                    <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                        <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 dark:bg-slate-900 mb-6">
                            <Search className="h-8 w-8 text-slate-400" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Platform Bulunamadı</h3>
                        <p className="text-slate-500 dark:text-slate-400">
                            Aramanızla eşleşen bir platform bulamadık. Lütfen farklı bir anahtar kelime deneyin.
                        </p>
                        <button 
                            onClick={() => { setSearchQuery(''); setCategory('all'); }}
                            className="mt-6 text-blue-600 font-bold hover:underline"
                        >
                            Tümünü Göster
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
