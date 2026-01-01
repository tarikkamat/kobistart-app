import LandingLayout from '@/layouts/LandingLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { Platform, Plan } from '@/types';
import { PlanFeature, FEATURE_CATEGORIES } from '@/types/feature';
import { ChevronLeft, Check, X, Heart, ExternalLink, Sparkles, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { store as favoritesStore, destroy as favoritesDestroy } from '@/routes/favorites/index';
import { toast } from 'sonner';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

interface PageProps extends Record<string, unknown> {
    platform: Platform;
    plan: Plan;
}

const categoryLabels: Record<string, string> = {
    [FEATURE_CATEGORIES.CORE]: 'Temel Özellikler',
    [FEATURE_CATEGORIES.PAYMENT]: 'Ödeme',
    [FEATURE_CATEGORIES.ONBOARDING]: 'Kurulum',
    [FEATURE_CATEGORIES.SUPPORT]: 'Destek',
    [FEATURE_CATEGORIES.COMMUNICATION]: 'İletişim',
    [FEATURE_CATEGORIES.INTEGRATION]: 'Entegrasyonlar',
    [FEATURE_CATEGORIES.DESIGN]: 'Tasarım',
    [FEATURE_CATEGORIES.PRODUCT]: 'Ürün Yönetimi',
    [FEATURE_CATEGORIES.MARKETING]: 'Pazarlama',
    [FEATURE_CATEGORIES.SHOPPING]: 'Alışveriş',
    [FEATURE_CATEGORIES.SALES_CHANNELS]: 'Satış Kanalları',
    [FEATURE_CATEGORIES.B2B]: 'B2B',
    [FEATURE_CATEGORIES.INTERNATIONAL]: 'Uluslararası',
    [FEATURE_CATEGORIES.AI]: 'Yapay Zeka',
    [FEATURE_CATEGORIES.CUSTOMIZATION]: 'Özelleştirme',
    [FEATURE_CATEGORIES.ADVANCED]: 'Gelişmiş Özellikler',
    [FEATURE_CATEGORIES.COMPLIANCE]: 'Uyumluluk',
    [FEATURE_CATEGORIES.FINANCE]: 'Finans',
    [FEATURE_CATEGORIES.PLUS_EXCLUSIVE]: 'Özel',
    [FEATURE_CATEGORIES.MOBILE]: 'Mobil',
};

// Helper function to format price with dynamic currency
const formatPrice = (price: number, currency: string = 'TRY'): string => {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};

// Helper function to get period label
const getPeriodLabel = (period: string): string => {
    const labels: Record<string, string> = {
        monthly: 'Aylık',
        yearly: 'Yıllık',
        two_yearly: '2 Yıllık',
    };
    return labels[period] || period;
};

// Helper function to get period label with pricing context
const getPeriodLabelWithContext = (period: string, isMonthlyPayment: boolean = false): string => {
    if (period === 'monthly') {
        return 'Aylık';
    }

    if (isMonthlyPayment) {
        const labels: Record<string, string> = {
            yearly: 'Yıllık (Aylık Ödeme)',
            two_yearly: '2 Yıllık (Aylık Ödeme)',
        };
        return labels[period] || period;
    }

    const labels: Record<string, string> = {
        yearly: 'Yıllık',
        two_yearly: '2 Yıllık',
    };
    return labels[period] || period;
};

// Helper function to get best price for a plan
const getBestPrice = (plan: Plan) => {
    const prices = (plan.planPrices || (plan as any).plan_prices) || [];

    if (!prices || prices.length === 0) {
        return null;
    }

    const withDiscount = prices.find((p: any) => p.discounted_price !== null);
    if (withDiscount) {
        return {
            period: withDiscount.period,
            price: withDiscount.discounted_price!,
            originalPrice: withDiscount.original_price,
            hasDiscount: true,
            currency: withDiscount.currency || 'TRY',
        };
    }

    const lowestPrice = prices.reduce((min: any, p: any) =>
        p.original_price < min.original_price ? p : min
    );

    return {
        period: lowestPrice.period,
        price: lowestPrice.original_price,
        originalPrice: null,
        hasDiscount: false,
        currency: lowestPrice.currency || 'TRY',
    };
};

export default function PlanShow() {
    const { platform, plan } = usePage<PageProps>().props;
    const isFavorited = plan.is_favorited || false;

    const { post: addFavorite, processing: addingFavorite } = useForm({
        favoritable_type: 'App\\Models\\Plan',
        favoritable_id: plan.id,
    });

    const { delete: removeFavorite, processing: removingFavorite } = useForm({
        favoritable_type: 'App\\Models\\Plan',
        favoritable_id: plan.id,
    });

    const handleToggleFavorite = () => {
        if (isFavorited) {
            removeFavorite(favoritesDestroy.url(), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Favorilerden çıkarıldı');
                },
                onError: () => {
                    toast.error('Bir hata oluştu');
                },
            });
        } else {
            addFavorite(favoritesStore.url(), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Favorilere eklendi');
                },
                onError: () => {
                    toast.error('Bir hata oluştu');
                },
            });
        }
    };

    const bestPrice = getBestPrice(plan);
    const prices = (plan.planPrices || (plan as any).plan_prices) || [];

    // Group features by category
    const featuresByCategory = new Map<string, PlanFeature[]>();
    const planFeatures = plan.features || [];

    planFeatures.forEach((pf) => {
        if (pf.feature) {
            const category = pf.feature.category;
            if (!featuresByCategory.has(category)) {
                featuresByCategory.set(category, []);
            }
            featuresByCategory.get(category)!.push(pf);
        }
    });

    // Sort categories (core first)
    const sortedCategories = Array.from(featuresByCategory.keys()).sort((a, b) => {
        if (a === FEATURE_CATEGORIES.CORE) return -1;
        if (b === FEATURE_CATEGORIES.CORE) return 1;
        return a.localeCompare(b);
    });

    return (
        <LandingLayout>
            <Head title={`${plan.name} - ${platform.name} - KobiStart`} />

            {/* Breadcrumb / Back Navigation */}
            <div className="bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center gap-2 text-sm">
                        <Link
                            href="/platforms"
                            className="font-medium text-zinc-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors"
                        >
                            Platformlar
                        </Link>
                        <span className="text-zinc-400">/</span>
                        <Link
                            href={`/platforms/${platform.slug}`}
                            className="font-medium text-zinc-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors"
                        >
                            {platform.name}
                        </Link>
                        <span className="text-zinc-400">/</span>
                        <span className="font-medium text-zinc-900 dark:text-zinc-50">{plan.name}</span>
                    </div>
                </div>
            </div>

            {/* Plan Header */}
            <section className="relative overflow-hidden pt-12 pb-16 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
                <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/5 via-transparent to-transparent blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
                        {/* Platform Logo */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative h-24 w-24 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 flex items-center justify-center shadow-sm">
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
                                    <span className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-violet-600 bg-clip-text text-transparent">
                                        {platform.name.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Plan Content */}
                        <div className="flex-1 text-center lg:text-left space-y-4">
                            <div className="space-y-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-100 dark:border-blue-800">
                                    <Zap className="h-3.5 w-3.5 fill-blue-600/20" />
                                    {platform.name} Paketi
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                                    {plan.name}
                                </h1>
                            </div>

                            {/* Price Display */}
                            {bestPrice && (
                                <div className="space-y-2">
                                    <div className="flex items-baseline gap-2 justify-center lg:justify-start">
                                        <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                                            {formatPrice(bestPrice.price, bestPrice.currency)}
                                        </span>
                                        <span className="text-base text-zinc-500 dark:text-zinc-400">
                                            / {getPeriodLabel(bestPrice.period)}
                                        </span>
                                    </div>
                                    {bestPrice.hasDiscount && bestPrice.originalPrice && (
                                        <div className="flex items-center gap-2 justify-center lg:justify-start">
                                            <span className="text-sm text-zinc-400 dark:text-zinc-500 line-through">
                                                {formatPrice(bestPrice.originalPrice, bestPrice.currency)}
                                            </span>
                                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                                                İndirimli
                                            </span>
                                        </div>
                                    )}
                                    {prices.length > 1 && (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 hover:text-blue-600 dark:hover:text-blue-400 underline underline-offset-2 cursor-pointer transition-colors">
                                                    {prices.length} farklı ödeme seçeneği
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-80 p-0" align="start">
                                                <div className="p-4">
                                                    <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 mb-3">
                                                        Tüm Ödeme Seçenekleri
                                                    </h4>
                                                    <div className="space-y-3">
                                                        {prices.map((price: any) => {
                                                            const currency = price.currency || 'TRY';
                                                            const displayPrice = price.discounted_price ?? price.original_price;
                                                            const hasDiscount = price.discounted_price !== null;
                                                            const isMonthlyPayment = price.is_monthly_payment ?? false;

                                                            return (
                                                                <div
                                                                    key={price.id}
                                                                    className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700"
                                                                >
                                                                    <div className="flex flex-col">
                                                                        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                                                                            {getPeriodLabelWithContext(price.period, isMonthlyPayment)}
                                                                        </span>
                                                                        {hasDiscount && (
                                                                            <span className="text-xs text-zinc-400 dark:text-zinc-500 line-through mt-0.5">
                                                                                {formatPrice(price.original_price, currency)}
                                                                                {isMonthlyPayment && price.period !== 'monthly' && ' / ay'}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <div className="flex flex-col items-end">
                                                                        <span className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                                                                            {formatPrice(displayPrice, currency)}
                                                                            {isMonthlyPayment && price.period !== 'monthly' && (
                                                                                <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400 ml-1">
                                                                                    / ay
                                                                                </span>
                                                                            )}
                                                                        </span>
                                                                        {hasDiscount && (
                                                                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 mt-1">
                                                                                İndirimli
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                </div>
                            )}

                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                                <Button asChild size="lg" className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
                                    <a href={platform.url} target="_blank" rel="noopener noreferrer">
                                        Hemen Başvur
                                        <ExternalLink className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
                                <Button
                                    variant={isFavorited ? "default" : "outline"}
                                    size="lg"
                                    className={`rounded-full px-8 border-zinc-200 dark:border-zinc-800 ${isFavorited ? 'bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800' : ''}`}
                                    onClick={handleToggleFavorite}
                                    disabled={addingFavorite || removingFavorite}
                                >
                                    <Heart className={`mr-2 h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                                    {isFavorited ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="space-y-8">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-100 dark:border-blue-800">
                            <Sparkles className="h-3.5 w-3.5 fill-blue-600/20" />
                            Paket Özellikleri
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                            {plan.name} Paketinde Neler Var?
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 max-w-xl">
                            Bu pakete dahil olan tüm özellikleri kategoriler halinde görüntüleyin.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {sortedCategories.map((category) => {
                            const features = featuresByCategory.get(category) || [];
                            if (features.length === 0) return null;

                            return (
                                <Card key={category} className="border-zinc-200 dark:border-zinc-800 shadow-sm">
                                    <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
                                        <CardTitle className="text-lg font-semibold">
                                            {categoryLabels[category] || category}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {features.map((pf) => {
                                                const displayName = pf.platform_label || pf.feature?.name || 'Özellik';
                                                const isIncluded = pf.is_included ?? true;

                                                return (
                                                    <div
                                                        key={pf.id}
                                                        className="flex items-start gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                                                    >
                                                        <div className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${
                                                            isIncluded
                                                                ? 'bg-green-500/10'
                                                                : 'bg-red-500/10'
                                                        }`}>
                                                            {isIncluded ? (
                                                                <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                                                            ) : (
                                                                <X className="h-3 w-3 text-red-600 dark:text-red-400" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                                                                {displayName}
                                                            </div>
                                                            {pf.value && pf.value !== 'true' && pf.value !== 'false' && (
                                                                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                                    {pf.value}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
