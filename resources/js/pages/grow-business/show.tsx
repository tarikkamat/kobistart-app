import { GlassCard } from '@/components/ui/glass-card';
import LandingLayout from '@/layouts/LandingLayout';
import { Head } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    BarChart,
    Box,
    Calculator,
    Check,
    ChevronRight,
    Globe,
    LineChart,
    Search,
    Shield,
    ShoppingBag,
    Sparkles,
    Store,
    TrendingUp,
    Zap,
    type LucideIcon,
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { index } from '@/routes/grow-business';

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
    tool: Tool;
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

export default function Show({ tool }: Props) {
    const Icon = iconMap[tool.icon] || Box;

    const renderContent = () => {
        switch (tool.type) {
            case 'integration':
                return <IntegrationView tool={tool} Icon={Icon} />;
            case 'calculator':
                return <CalculatorView tool={tool} />;
            case 'analysis':
                return <AnalysisView tool={tool} />;
            case 'seo':
                return <SeoView tool={tool} />;
            default:
                return (
                    <GlassCard className="p-12 text-center text-muted-foreground border-white/10 bg-white/5">
                        <p>Bu araç için özel görünüm hazırlanıyor.</p>
                    </GlassCard>
                );
        }
    };

    return (
        <LandingLayout>
            <Head title={tool.title} />

            {/* Back Button & Breadcrumb */}
            <div className="container mx-auto px-4 pt-32 lg:pt-40">
                <Link
                    href={index()}
                    className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Büyüme Araçlarına Dön
                </Link>
            </div>

            {/* Hero Section */}
            <section className="container mx-auto px-4 pb-16">
                <div className="relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/40 p-8 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/40 md:p-12">
                    {/* Background Blobs */}
                    <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/20" />
                    <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/20" />

                    <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex flex-col gap-6 lg:max-w-2xl">
                            <div className="flex items-center gap-4">
                                <div className="rounded-2xl bg-gradient-to-br from-white/80 to-white/20 p-4 shadow-lg backdrop-blur-md dark:from-white/10 dark:to-white/5">
                                    <Icon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                                </div>
                                <span className="rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                    {tool.category}
                                </span>
                            </div>

                            <div>
                                <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl dark:text-slate-50">
                                    {tool.title}
                                </h1>
                                <p className="text-xl leading-relaxed text-muted-foreground">
                                    {tool.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <button className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-8 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 hover:scale-105 active:scale-95">
                                    {tool.action}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </button>
                                <button className="inline-flex h-12 items-center justify-center rounded-xl border border-input bg-transparent px-8 font-semibold shadow-sm transition-all hover:bg-accent hover:text-accent-foreground">
                                    Dokümantasyon
                                </button>
                            </div>
                        </div>

                        {/* Quick Stats / Info Widget */}
                        <div className="w-full lg:w-auto min-w-[300px]">
                            <GlassCard className="space-y-4 border-white/20 bg-white/60 p-6 dark:bg-black/20">
                                <h3 className="font-semibold text-foreground">Öne Çıkan Özellikler</h3>
                                <ul className="space-y-3">
                                    {[1, 2, 3].map((i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                            <div className="mt-0.5 rounded-full bg-green-500/10 p-1 text-green-600 dark:text-green-400">
                                                <Check className="h-3 w-3" />
                                            </div>
                                            <span>Otomatik senkronizasyon ve güncelleme</span>
                                        </li>
                                    ))}
                                </ul>
                            </GlassCard>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dynamic Content Section */}
            <section className="container mx-auto px-4 pb-32">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2">
                        {renderContent()}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <GlassCard className="p-6">
                            <h3 className="mb-4 text-lg font-semibold">Nasıl Çalışır?</h3>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                                        1
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-medium">Hesabınızı Bağlayın</p>
                                        <p className="text-sm text-muted-foreground">Saniyeler içinde entegrasyonu tamamlayın.</p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="absolute left-4 -top-6 h-6 w-0.5 bg-border"></div>
                                    <div className="flex gap-4">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                                            2
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-medium">Ayarlarınızı Yapın</p>
                                            <p className="text-sm text-muted-foreground">İhtiyacınıza göre özelleştirin.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="absolute left-4 -top-6 h-6 w-0.5 bg-border"></div>
                                    <div className="flex gap-4">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                                            3
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-medium">Sonuçları Görün</p>
                                            <p className="text-sm text-muted-foreground">Raporları ve analizleri inceleyin.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="relative overflow-hidden p-6 bg-gradient-to-br from-blue-600 to-violet-600 text-white">
                            <div className="relative z-10">
                                <h3 className="mb-2 text-lg font-bold">Yardıma mı ihtiyacınız var?</h3>
                                <p className="mb-4 text-sm text-blue-100">Uzman ekibimiz entegrasyon sürecinde size destek olmaya hazır.</p>
                                <button className="w-full rounded-lg bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-white/20">
                                    Destek İle Görüş
                                </button>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}

// Sub-components for specific views

function IntegrationView({ tool, Icon }: { tool: Tool; Icon: LucideIcon }) {
    return (
        <div className="space-y-6">
            <GlassCard className="p-8">
                <div className="flex flex-col items-center justify-center gap-8 py-8 md:flex-row">
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-lg dark:bg-slate-800">
                            <span className="text-2xl font-bold text-blue-600">Siz</span>
                        </div>
                    </div>

                    <div className="relative flex w-full max-w-[200px] flex-col items-center gap-2">
                        <div className="h-1 w-full border-t-2 border-dashed border-gray-300 dark:border-gray-700"></div>
                        <div className="absolute -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
                            <Check className="h-3 w-3" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">Güvenli Bağlantı</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-lg dark:bg-slate-800">
                            <Icon className="h-10 w-10 text-muted-foreground/50" />
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center text-muted-foreground">
                    <p>{tool.title} entegrasyonu henüz aktif değil. Hemen bağlayın ve verilerinizi senkronize etmeye başlayın.</p>
                </div>
            </GlassCard>

            <div className="grid gap-6 md:grid-cols-2">
                <GlassCard className="p-6">
                    <div className="mb-4 rounded-lg bg-blue-500/10 p-3 w-fit text-blue-600">
                        <Zap className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-semibold">Anlık Veri Akışı</h3>
                    <p className="text-sm text-muted-foreground">Siparişler, stoklar ve müşteri verileri eşzamanlı olarak sistemler arası akar.</p>
                </GlassCard>
                <GlassCard className="p-6">
                    <div className="mb-4 rounded-lg bg-violet-500/10 p-3 w-fit text-violet-600">
                        <Shield className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-semibold">İzosfer Güvenliği</h3>
                    <p className="text-sm text-muted-foreground">Verileriniz uçtan uca şifreleme ile korunur ve güvenli bir şekilde işlenir.</p>
                </GlassCard>
            </div>
        </div>
    );
}

function CalculatorView({ tool }: { tool: Tool }) {
    return (
        <div className="space-y-6">
            <GlassCard className="p-6">
                <h3 className="mb-6 text-xl font-semibold">Karlılık Hesaplayıcı</h3>
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Satış Fiyatı (₺)</label>
                            <input type="number" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" placeholder="100.00" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Maliyet (₺)</label>
                            <input type="number" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" placeholder="50.00" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Kargo Gideri (₺)</label>
                            <input type="number" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" placeholder="15.00" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-6 dark:bg-slate-900/50">
                        <h4 className="mb-4 text-sm font-medium text-muted-foreground">Tahmini Kar</h4>
                        <div className="mb-2 text-4xl font-bold text-green-600 dark:text-green-500">35.00 ₺</div>
                        <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                            <div className="h-full w-[35%] bg-green-500"></div>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Kar Marjı</span>
                            <span className="font-semibold">%35</span>
                        </div>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}

function AnalysisView({ tool }: { tool: Tool }) {
    return (
        <div className="space-y-6">
            <GlassCard className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Büyüme Simülasyonu</h3>
                    <select className="rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                        <option>Gelecek 12 Ay</option>
                        <option>Gelecek 6 Ay</option>
                    </select>
                </div>

                <div className="h-[300px] w-full items-end justify-between flex gap-2">
                    {[30, 45, 60, 50, 70, 85, 90, 95, 100, 110, 105, 120].map((h, i) => (
                        <div key={i} className="group relative w-full rounded-t-lg bg-blue-500/20 hover:bg-blue-500/40 transition-all" style={{ height: `${h * 2}px` }}>
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                                {h}K
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-border pt-6 text-center">
                    <div>
                        <div className="text-2xl font-bold text-foreground">%120</div>
                        <div className="text-xs text-muted-foreground">Büyüme Hızı</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-foreground">8.4M ₺</div>
                        <div className="text-xs text-muted-foreground">Tahmini Ciro</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-foreground">1.2K</div>
                        <div className="text-xs text-muted-foreground">Yeni Müşteri</div>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}

function SeoView({ tool }: { tool: Tool }) {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <GlassCard className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="font-semibold">SEO Sağlık Skoru</h3>
                    <span className="text-xs text-muted-foreground">Son tarama: Şimdi</span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-8 border-green-500/20 text-4xl font-bold text-green-600">
                        85
                        <div className="absolute top-0 left-0 h-full w-full -rotate-45 rounded-full border-8 border-green-500 border-l-transparent border-t-transparent border-r-transparent"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-sm text-foreground">Harika iş!</div>
                        <p className="text-xs text-muted-foreground">Siteniz arama motorları için oldukça optimize görünüyor.</p>
                    </div>
                </div>
            </GlassCard>

            <GlassCard className="p-6">
                <h3 className="mb-4 font-semibold">Önerilen Aksiyonlar</h3>
                <div className="space-y-4">
                    <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-900/50 dark:bg-red-900/20">
                        <div className="mt-0.5 text-red-600 dark:text-red-400">!</div>
                        <div>
                            <p className="text-sm font-medium text-red-900 dark:text-red-200">2 Sayfada Meta Tag Eksik</p>
                            <p className="text-xs text-red-700 dark:text-red-300">Ürün sayfalarınızın açıklama kısımlarını doldurun.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-900/50 dark:bg-yellow-900/20">
                        <div className="mt-0.5 text-yellow-600 dark:text-yellow-400">!</div>
                        <div>
                            <p className="text-sm font-medium text-yellow-900 dark:text-yellow-200">Görsel Boyutları</p>
                            <p className="text-xs text-yellow-700 dark:text-yellow-300">Bazı görseller optimize edilebilir.</p>
                        </div>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
