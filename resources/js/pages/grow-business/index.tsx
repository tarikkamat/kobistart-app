import { GlassCard } from '@/components/ui/glass-card';
import LandingLayout from '@/layouts/LandingLayout';
import { show } from '@/routes/grow-business/index';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart,
    Box,
    Calculator,
    LineChart,
    Search,
    ShoppingBag,
    Sparkles,
    Store,
    TrendingUp,
    Zap,
    type LucideIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';

interface Tool {
    id: number;
    slug: string;
    title: string;
    description: string;
    icon: string;
    category: string;
    type: string;
    action: string;
}

interface Props {
    tools: Tool[];
}

const iconMap: Record<string, LucideIcon> = {
    ShoppingBag,
    Store,
    Calculator,
    Box,
    TrendingUp,
    Search,
    BarChart,
    LineChart,
};

export default function GrowBusiness({ tools }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const categories = useMemo(() => {
        const uniqueCategories = Array.from(
            new Set(tools.map((t) => t.category)),
        );
        return ['all', ...uniqueCategories];
    }, [tools]);

    const filteredTools = useMemo(() => {
        return tools.filter((tool) => {
            const matchesSearch =
                tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            const matchesCategory =
                selectedCategory === 'all' || tool.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [tools, searchQuery, selectedCategory]);

    return (
        <LandingLayout>
            <Head title="İşinizi Büyütün" />

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-32 pb-16 lg:pt-48 lg:pb-32">
                {/* Ambient Background Elements */}
                <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[800px] w-[1200px] -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-b from-blue-500/10 via-violet-500/5 to-transparent blur-[120px] dark:from-blue-500/20 dark:via-violet-500/10" />
                <div className="animate-float pointer-events-none absolute top-[20%] right-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-blue-400/10 blur-[100px] dark:bg-blue-500/20" />
                <div className="animate-float pointer-events-none absolute bottom-[10%] left-[-5%] -z-10 h-[300px] w-[300px] rounded-full bg-violet-400/10 blur-[80px] [animation-delay:2s] dark:bg-violet-500/20" />

                <div className="container mx-auto px-4 text-center">
                    <div className="mb-6 inline-flex animate-in items-center gap-2.5 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-sm font-semibold text-blue-600 backdrop-blur-sm duration-700 fade-in slide-in-from-bottom-4 dark:text-blue-400">
                        <Sparkles className="h-4 w-4 fill-blue-500/20" />
                        Büyüme Araçları
                    </div>

                    <h1 className="mx-auto mb-6 max-w-4xl font-display text-4xl leading-[1.1] font-extrabold tracking-tight text-gray-900 md:text-6xl dark:text-slate-50">
                        <span className="inline-block animate-in duration-1000 fill-mode-both fade-in slide-in-from-bottom-8">
                            İşletmenizi
                        </span>{' '}
                        <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
                            Geleceğe Taşıyın
                        </span>
                    </h1>

                    <p className="mx-auto mb-12 max-w-2xl animate-in text-xl leading-relaxed text-gray-600 delay-200 duration-1000 fade-in slide-in-from-bottom-8 dark:text-gray-400">
                        Modern e-ticaretin gücünü keşfedin. Satışlarınızı artırmak,
                        operasyonları optimize etmek ve markanızı büyütmek için
                        ihtiyacınız olan her şey burada.
                    </p>

                    {/* Search Bar */}
                    <div className="mx-auto max-w-xl animate-in delay-300 duration-1000 fade-in slide-in-from-bottom-12">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 opacity-20 blur-xl transition-all group-hover:opacity-30 rounded-2xl" />
                            <div className="relative flex items-center rounded-2xl border border-white/20 bg-white/50 p-2 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/40">
                                <Search className="ml-3 h-5 w-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Araç veya özellik ara..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1 bg-transparent px-4 py-2 text-base outline-none placeholder:text-muted-foreground dark:text-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="container mx-auto px-4 pb-24">
                {/* Category Filters */}
                <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 
                                ${selectedCategory === category
                                    ? 'border-blue-500/50 bg-blue-500/10 text-blue-600 shadow-lg shadow-blue-500/20 dark:text-blue-400'
                                    : 'border-transparent bg-white/50 text-muted-foreground hover:bg-white/80 hover:text-foreground dark:bg-white/5 dark:hover:bg-white/10'
                                }`}
                        >
                            {category === 'all'
                                ? 'Tüm Araçlar'
                                : category.charAt(0).toUpperCase() +
                                category.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {filteredTools.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredTools.map((tool, index) => {
                            const Icon = iconMap[tool.icon] || Box;
                            return (
                                <Link
                                    key={tool.id}
                                    href={show({ slug: tool.slug })}
                                    className="group block h-full"
                                >
                                    <GlassCard
                                        className="relative flex h-full flex-col gap-6 overflow-hidden border-white/20 bg-white/40 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:border-white/5 dark:bg-white/5 dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="relative">
                                                <div className="absolute inset-0 animate-pulse rounded-xl bg-blue-500/20 blur-lg transition-all group-hover:bg-blue-500/40" />
                                                <div className="relative rounded-xl bg-gradient-to-br from-white/80 to-white/20 p-3 text-blue-600 shadow-sm backdrop-blur-md dark:from-white/10 dark:to-white/5 dark:text-blue-400">
                                                    <Icon className="h-6 w-6" />
                                                </div>
                                            </div>
                                            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                                {tool.category}
                                            </span>
                                        </div>

                                        <div className="flex flex-1 flex-col gap-3">
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors">
                                                {tool.title}
                                            </h3>
                                            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                                                {tool.description}
                                            </p>
                                        </div>

                                        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 dark:border-white/5">
                                            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">
                                                {tool.type.toUpperCase()}
                                            </span>
                                            <div className="flex items-center gap-1 text-sm font-semibold text-blue-600 transition-all group-hover:gap-2 dark:text-blue-400">
                                                {tool.action}
                                                <ArrowRight className="h-4 w-4" />
                                            </div>
                                        </div>

                                        {/* Hover Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-violet-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                    </GlassCard>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="mb-4 rounded-full bg-slate-100 p-6 dark:bg-slate-900">
                            <Search className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold">Sonuç bulunamadı</h3>
                        <p className="text-muted-foreground">
                            Aramanızla eşleşen bir araç bulunamadı. Lütfen farklı anahtar
                            kelimeler deneyin.
                        </p>
                        <button
                            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                            className="mt-4 text-blue-600 hover:underline"
                        >
                            Filtreleri Temizle
                        </button>
                    </div>
                )}
            </section>

            {/* Features/Value Prop Section */}
            <section className="container mx-auto mb-24 px-4">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="rounded-3xl border border-white/20 bg-gradient-to-br from-blue-500/5 to-transparent p-8 backdrop-blur-sm dark:border-white/5">
                        <div className="mb-4 inline-flex rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                            <Zap className="h-6 w-6" />
                        </div>
                        <h3 className="mb-2 text-xl font-bold">Hızlı Entegrasyon</h3>
                        <p className="text-muted-foreground">
                            Tüm araçlarımız mevcut sisteminize saniyeler içinde entegre
                            olur ve hemen çalışmaya başlar.
                        </p>
                    </div>
                    <div className="rounded-3xl border border-white/20 bg-gradient-to-br from-violet-500/5 to-transparent p-8 backdrop-blur-sm dark:border-white/5">
                        <div className="mb-4 inline-flex rounded-xl bg-violet-100 p-3 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
                            <BarChart className="h-6 w-6" />
                        </div>
                        <h3 className="mb-2 text-xl font-bold">Detaylı Analizler</h3>
                        <p className="text-muted-foreground">
                            Veriye dayalı kararlar almanız için gelişmiş raporlama ve
                            analiz araçları sunuyoruz.
                        </p>
                    </div>
                    <div className="rounded-3xl border border-white/20 bg-gradient-to-br from-amber-500/5 to-transparent p-8 backdrop-blur-sm dark:border-white/5">
                        <div className="mb-4 inline-flex rounded-xl bg-amber-100 p-3 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <h3 className="mb-2 text-xl font-bold">Sürekli Büyüme</h3>
                        <p className="text-muted-foreground">
                            İşletmenizin her aşamasında size destek olacak ölçeklenebilir
                            çözümler geliştiriyoruz.
                        </p>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
