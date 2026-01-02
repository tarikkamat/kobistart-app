import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import LandingLayout from '@/layouts/LandingLayout';
import comparisonRoutes from '@/routes/comparisons';
import { Plan, Platform, SharedData } from '@/types';
import { SaveComparisonData } from '@/types/comparison';
import { FEATURE_CATEGORIES, PlanFeature } from '@/types/feature';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Check, Save, Sparkles, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface PageProps extends Record<string, unknown> {
    plan1: {
        plan: Plan;
        platform: Platform;
    };
    plan2: {
        plan: Plan;
        platform: Platform;
    };
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
const getPeriodLabelWithContext = (
    period: string,
    isMonthlyPayment: boolean = false,
): string => {
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
    const prices = plan.planPrices || (plan as any).plan_prices || [];

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
        p.original_price < min.original_price ? p : min,
    );

    return {
        period: lowestPrice.period,
        price: lowestPrice.original_price,
        originalPrice: null,
        hasDiscount: false,
        currency: lowestPrice.currency || 'TRY',
    };
};

export default function Compare() {
    const { plan1, plan2 } = usePage<PageProps>().props;
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [hasShownWarning, setHasShownWarning] = useState(false);
    const [savedComparisonId, setSavedComparisonId] = useState<number | null>(
        null,
    );
    const [isDeleting, setIsDeleting] = useState(false);
    const [isHoveringDelete, setIsHoveringDelete] = useState(false);

    // Collect all features from both plans
    const allFeatureKeys = new Set<string>();
    const featuresByPlan = new Map<number, Map<string, PlanFeature>>();

    [plan1.plan, plan2.plan].forEach((plan) => {
        const planFeaturesMap = new Map<string, PlanFeature>();
        const features = plan.features || [];
        features.forEach((pf) => {
            if (pf.feature) {
                const key = pf.feature.key;
                allFeatureKeys.add(key);
                planFeaturesMap.set(key, pf);
            }
        });
        featuresByPlan.set(plan.id, planFeaturesMap);
    });

    // Group features by category
    const featuresByCategory = new Map<
        string,
        Array<{
            key: string;
            featureName: string;
            category: string;
            plans: Map<
                number,
                {
                    value: string | null;
                    isIncluded: boolean;
                    platformLabel: string | null;
                }
            >;
        }>
    >();

    allFeatureKeys.forEach((key) => {
        // Get feature info from first plan that has it
        let featureInfo: { name: string; category: string } | null = null;
        for (const plan of [plan1.plan, plan2.plan]) {
            const planFeatures = featuresByPlan.get(plan.id);
            const pf = planFeatures?.get(key);
            if (pf?.feature) {
                featureInfo = {
                    name: pf.feature.name,
                    category: pf.feature.category,
                };
                break;
            }
        }

        if (!featureInfo) return;

        const category = featureInfo.category;
        if (!featuresByCategory.has(category)) {
            featuresByCategory.set(category, []);
        }

        // Collect values for both plans
        const planValues = new Map<
            number,
            {
                value: string | null;
                isIncluded: boolean;
                platformLabel: string | null;
            }
        >();
        [plan1.plan, plan2.plan].forEach((plan) => {
            const planFeatures = featuresByPlan.get(plan.id);
            const pf = planFeatures?.get(key);
            if (pf) {
                planValues.set(plan.id, {
                    value: pf.value,
                    isIncluded: pf.is_included,
                    platformLabel: pf.platform_label,
                });
            }
        });

        featuresByCategory.get(category)!.push({
            key,
            featureName: featureInfo.name,
            category,
            plans: planValues,
        });
    });

    // Sort categories (core first)
    const sortedCategories = Array.from(featuresByCategory.keys()).sort(
        (a, b) => {
            if (a === FEATURE_CATEGORIES.CORE) return -1;
            if (b === FEATURE_CATEGORIES.CORE) return 1;
            return a.localeCompare(b);
        },
    );

    const bestPrice1 = getBestPrice(plan1.plan);
    const bestPrice2 = getBestPrice(plan2.plan);
    const prices1 =
        plan1.plan.planPrices || (plan1.plan as any).plan_prices || [];
    const prices2 =
        plan2.plan.planPrices || (plan2.plan as any).plan_prices || [];

    // Prepare comparison data
    const comparisonData = {
        features_by_category: Object.fromEntries(
            Array.from(featuresByCategory.entries()).map(
                ([category, features]) => [
                    category,
                    features.map((f) => ({
                        key: f.key,
                        featureName: f.featureName,
                        category: f.category,
                        plans: Object.fromEntries(
                            Array.from(f.plans.entries()).map(
                                ([planId, planValue]) => [planId, planValue],
                            ),
                        ),
                    })),
                ],
            ),
        ),
        summary: {
            total_features_plan1:
                plan1.plan.features?.filter((f: any) => f.is_included).length ||
                0,
            total_features_plan2:
                plan2.plan.features?.filter((f: any) => f.is_included).length ||
                0,
            categories_count: sortedCategories.length,
        },
    };

    // Show warning toast for non-authenticated users
    useEffect(() => {
        if (!user && !hasShownWarning) {
            const warningShown = localStorage.getItem(
                'comparison_warning_shown',
            );
            if (!warningShown) {
                toast.warning(
                    'Karşılaştırma sonucunu kaydetmek için oturum açmanız gerekmektedir',
                    {
                        duration: 5000,
                    },
                );
                localStorage.setItem('comparison_warning_shown', 'true');
                setHasShownWarning(true);
            }
        }
    }, [user, hasShownWarning]);

    const handleSaveComparison = (isAutoSave = false) => {
        if (!user) {
            toast.warning(
                'Karşılaştırma sonucunu kaydetmek için oturum açmanız gerekmektedir',
            );
            return;
        }

        setIsSaving(true);

        const saveData: SaveComparisonData = {
            plan1_id: plan1.plan.id,
            plan2_id: plan2.plan.id,
            plan1_data: {
                plan: plan1.plan,
                platform: plan1.platform,
            },
            plan2_data: {
                plan: plan2.plan,
                platform: plan2.platform,
            },
            comparison_data: comparisonData,
        };

        router.post(comparisonRoutes.store.url(), saveData as any, {
            onSuccess: () => {
                // Check again to get the comparison ID
                fetch(
                    comparisonRoutes.check.url({
                        query: {
                            plan1_id: plan1.plan.id,
                            plan2_id: plan2.plan.id,
                        },
                    }),
                    {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                        },
                        credentials: 'include',
                    },
                )
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.exists && data.id) {
                            setSavedComparisonId(data.id);
                        }
                    })
                    .catch(() => {
                        // Silently fail
                    });

                setIsSaved(true);
                setIsSaving(false);
                if (!isAutoSave) {
                    toast.success('Karşılaştırma başarıyla kaydedildi');
                }
            },
            onError: (errors) => {
                setIsSaving(false);
                toast.error('Karşılaştırma kaydedilirken bir hata oluştu');
                console.error('Comparison save error:', errors);
            },
        });
    };

    const handleDeleteComparison = () => {
        if (!user || !savedComparisonId) {
            return;
        }

        setIsDeleting(true);

        router.delete(
            comparisonRoutes.destroy.url({ comparison: savedComparisonId }),
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setIsSaved(false);
                    setSavedComparisonId(null);
                    setIsDeleting(false);
                    setIsHoveringDelete(false);
                    toast.success('Karşılaştırma başarıyla kaldırıldı');
                },
                onError: () => {
                    setIsDeleting(false);
                    toast.error('Karşılaştırma kaldırılırken bir hata oluştu');
                },
            },
        );
    };

    // Check if comparison is already saved
    useEffect(() => {
        if (user) {
            fetch(
                comparisonRoutes.check.url({
                    query: { plan1_id: plan1.plan.id, plan2_id: plan2.plan.id },
                }),
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    credentials: 'include',
                },
            )
                .then((res) => res.json())
                .then((data) => {
                    if (data.exists && data.id) {
                        setSavedComparisonId(data.id);
                        setIsSaved(true);
                    }
                })
                .catch(() => {
                    // Silently fail
                });
        }
    }, [user, plan1.plan.id, plan2.plan.id]);

    // Auto-save comparison for authenticated users
    useEffect(() => {
        if (user && !isSaved && !isSaving && !savedComparisonId) {
            const autoSaveKey = `comparison_auto_save_${plan1.plan.id}_${plan2.plan.id}`;
            const wasAutoSaved = sessionStorage.getItem(autoSaveKey);

            if (!wasAutoSaved) {
                handleSaveComparison(true);
                sessionStorage.setItem(autoSaveKey, 'true');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        user,
        plan1.plan.id,
        plan2.plan.id,
        isSaved,
        isSaving,
        savedComparisonId,
    ]);

    return (
        <LandingLayout>
            <Head
                title={`${plan1.plan.name} vs ${plan2.plan.name} - Karşılaştırma - KobiStart`}
            />

            {/* Header Section */}
            <section className="relative overflow-hidden border-b border-zinc-200 bg-white pt-12 pb-16 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/5 via-transparent to-transparent blur-[100px]" />

                <div className="container mx-auto px-4">
                    <div className="space-y-8">
                        {/* Title */}
                        <div className="space-y-3 text-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold tracking-wider text-blue-600 uppercase dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                <Sparkles className="h-3.5 w-3.5 fill-blue-600/20" />
                                Paket Karşılaştırması
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-zinc-50">
                                İki Paketi Karşılaştırın
                            </h1>
                            <p className="mx-auto max-w-2xl text-zinc-500 dark:text-zinc-400">
                                İhtiyaçlarınıza en uygun paketi seçmek için
                                detaylı karşılaştırma yapın.
                            </p>
                            {user && (
                                <div className="flex justify-center pt-2">
                                    <div
                                        className="relative"
                                        onMouseEnter={() =>
                                            setIsHoveringDelete(true)
                                        }
                                        onMouseLeave={() =>
                                            setIsHoveringDelete(false)
                                        }
                                    >
                                        {isSaved && isHoveringDelete ? (
                                            <Button
                                                onClick={handleDeleteComparison}
                                                disabled={isDeleting}
                                                className="rounded-full bg-red-600 text-white hover:bg-red-700"
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                {isDeleting
                                                    ? 'Kaldırılıyor...'
                                                    : 'Karşılaştırmayı Kaldır'}
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() =>
                                                    handleSaveComparison(false)
                                                }
                                                disabled={isSaving || isSaved}
                                                className="rounded-full bg-blue-600 text-white hover:bg-blue-700"
                                            >
                                                <Save className="mr-2 h-4 w-4" />
                                                {isSaving
                                                    ? 'Kaydediliyor...'
                                                    : isSaved
                                                      ? 'Kaydedildi'
                                                      : 'Karşılaştırmayı Kaydet'}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Plans Header */}
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            {/* Plan 1 */}
                            <Card className="border-zinc-200 shadow-lg dark:border-zinc-800">
                                <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/50">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
                                            {plan1.platform.logo ? (
                                                <>
                                                    <img
                                                        src={
                                                            plan1.platform.logo
                                                        }
                                                        alt={
                                                            plan1.platform.name
                                                        }
                                                        className="h-full w-full object-contain dark:hidden"
                                                    />
                                                    {plan1.platform
                                                        .dark_logo && (
                                                        <img
                                                            src={
                                                                plan1.platform
                                                                    .dark_logo
                                                            }
                                                            alt={
                                                                plan1.platform
                                                                    .name
                                                            }
                                                            className="hidden h-full w-full object-contain dark:block"
                                                        />
                                                    )}
                                                </>
                                            ) : (
                                                <span className="bg-gradient-to-br from-blue-600 to-violet-600 bg-clip-text text-xl font-bold text-transparent">
                                                    {plan1.platform.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <div className="text-sm text-zinc-500 dark:text-zinc-400">
                                                {plan1.platform.name}
                                            </div>
                                            <CardTitle className="text-xl font-bold">
                                                {plan1.plan.name}
                                            </CardTitle>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4 p-6">
                                    {/* Price Display */}
                                    {bestPrice1 ? (
                                        <div className="space-y-2">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                                                    {formatPrice(
                                                        bestPrice1.price,
                                                        bestPrice1.currency,
                                                    )}
                                                </span>
                                                <span className="text-base text-zinc-500 dark:text-zinc-400">
                                                    /{' '}
                                                    {getPeriodLabel(
                                                        bestPrice1.period,
                                                    )}
                                                </span>
                                            </div>
                                            {bestPrice1.hasDiscount &&
                                                bestPrice1.originalPrice && (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-zinc-400 line-through dark:text-zinc-500">
                                                            {formatPrice(
                                                                bestPrice1.originalPrice,
                                                                bestPrice1.currency,
                                                            )}
                                                        </span>
                                                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                            İndirimli
                                                        </span>
                                                    </div>
                                                )}
                                            {prices1.length > 1 && (
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <button className="mt-2 cursor-pointer text-xs text-zinc-500 underline underline-offset-2 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400">
                                                            {prices1.length}{' '}
                                                            farklı ödeme
                                                            seçeneği
                                                        </button>
                                                    </PopoverTrigger>
                                                    <PopoverContent
                                                        className="w-80 p-0"
                                                        align="start"
                                                    >
                                                        <div className="p-4">
                                                            <h4 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                                                Tüm Ödeme
                                                                Seçenekleri
                                                            </h4>
                                                            <div className="space-y-3">
                                                                {prices1.map(
                                                                    (
                                                                        price: any,
                                                                    ) => {
                                                                        const currency =
                                                                            price.currency ||
                                                                            'TRY';
                                                                        const displayPrice =
                                                                            price.discounted_price ??
                                                                            price.original_price;
                                                                        const hasDiscount =
                                                                            price.discounted_price !==
                                                                            null;
                                                                        const isMonthlyPayment =
                                                                            price.is_monthly_payment ??
                                                                            false;

                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    price.id
                                                                                }
                                                                                className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800/50"
                                                                            >
                                                                                <div className="flex flex-col">
                                                                                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                                                                                        {getPeriodLabelWithContext(
                                                                                            price.period,
                                                                                            isMonthlyPayment,
                                                                                        )}
                                                                                    </span>
                                                                                    {hasDiscount && (
                                                                                        <span className="mt-0.5 text-xs text-zinc-400 line-through dark:text-zinc-500">
                                                                                            {formatPrice(
                                                                                                price.original_price,
                                                                                                currency,
                                                                                            )}
                                                                                            {isMonthlyPayment &&
                                                                                                price.period !==
                                                                                                    'monthly' &&
                                                                                                ' / ay'}
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                                <div className="flex flex-col items-end">
                                                                                    <span className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                                                                                        {formatPrice(
                                                                                            displayPrice,
                                                                                            currency,
                                                                                        )}
                                                                                        {isMonthlyPayment &&
                                                                                            price.period !==
                                                                                                'monthly' && (
                                                                                                <span className="ml-1 text-xs font-normal text-zinc-500 dark:text-zinc-400">
                                                                                                    /
                                                                                                    ay
                                                                                                </span>
                                                                                            )}
                                                                                    </span>
                                                                                    {hasDiscount && (
                                                                                        <span className="mt-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                                                            İndirimli
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    },
                                                                )}
                                                            </div>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-sm text-zinc-500 dark:text-zinc-400">
                                            Fiyat bilgisi mevcut değil
                                        </div>
                                    )}

                                    <Button
                                        asChild
                                        className="w-full rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        <Link
                                            href={`/platforms/${plan1.platform.slug}/${plan1.plan.slug}`}
                                        >
                                            Detayları Gör
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Plan 2 */}
                            <Card className="border-zinc-200 shadow-lg dark:border-zinc-800">
                                <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/50">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
                                            {plan2.platform.logo ? (
                                                <>
                                                    <img
                                                        src={
                                                            plan2.platform.logo
                                                        }
                                                        alt={
                                                            plan2.platform.name
                                                        }
                                                        className="h-full w-full object-contain dark:hidden"
                                                    />
                                                    {plan2.platform
                                                        .dark_logo && (
                                                        <img
                                                            src={
                                                                plan2.platform
                                                                    .dark_logo
                                                            }
                                                            alt={
                                                                plan2.platform
                                                                    .name
                                                            }
                                                            className="hidden h-full w-full object-contain dark:block"
                                                        />
                                                    )}
                                                </>
                                            ) : (
                                                <span className="bg-gradient-to-br from-blue-600 to-violet-600 bg-clip-text text-xl font-bold text-transparent">
                                                    {plan2.platform.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <div className="text-sm text-zinc-500 dark:text-zinc-400">
                                                {plan2.platform.name}
                                            </div>
                                            <CardTitle className="text-xl font-bold">
                                                {plan2.plan.name}
                                            </CardTitle>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4 p-6">
                                    {/* Price Display */}
                                    {bestPrice2 ? (
                                        <div className="space-y-2">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                                                    {formatPrice(
                                                        bestPrice2.price,
                                                        bestPrice2.currency,
                                                    )}
                                                </span>
                                                <span className="text-base text-zinc-500 dark:text-zinc-400">
                                                    /{' '}
                                                    {getPeriodLabel(
                                                        bestPrice2.period,
                                                    )}
                                                </span>
                                            </div>
                                            {bestPrice2.hasDiscount &&
                                                bestPrice2.originalPrice && (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-zinc-400 line-through dark:text-zinc-500">
                                                            {formatPrice(
                                                                bestPrice2.originalPrice,
                                                                bestPrice2.currency,
                                                            )}
                                                        </span>
                                                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                            İndirimli
                                                        </span>
                                                    </div>
                                                )}
                                            {prices2.length > 1 && (
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <button className="mt-2 cursor-pointer text-xs text-zinc-500 underline underline-offset-2 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400">
                                                            {prices2.length}{' '}
                                                            farklı ödeme
                                                            seçeneği
                                                        </button>
                                                    </PopoverTrigger>
                                                    <PopoverContent
                                                        className="w-80 p-0"
                                                        align="start"
                                                    >
                                                        <div className="p-4">
                                                            <h4 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                                                Tüm Ödeme
                                                                Seçenekleri
                                                            </h4>
                                                            <div className="space-y-3">
                                                                {prices2.map(
                                                                    (
                                                                        price: any,
                                                                    ) => {
                                                                        const currency =
                                                                            price.currency ||
                                                                            'TRY';
                                                                        const displayPrice =
                                                                            price.discounted_price ??
                                                                            price.original_price;
                                                                        const hasDiscount =
                                                                            price.discounted_price !==
                                                                            null;
                                                                        const isMonthlyPayment =
                                                                            price.is_monthly_payment ??
                                                                            false;

                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    price.id
                                                                                }
                                                                                className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800/50"
                                                                            >
                                                                                <div className="flex flex-col">
                                                                                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                                                                                        {getPeriodLabelWithContext(
                                                                                            price.period,
                                                                                            isMonthlyPayment,
                                                                                        )}
                                                                                    </span>
                                                                                    {hasDiscount && (
                                                                                        <span className="mt-0.5 text-xs text-zinc-400 line-through dark:text-zinc-500">
                                                                                            {formatPrice(
                                                                                                price.original_price,
                                                                                                currency,
                                                                                            )}
                                                                                            {isMonthlyPayment &&
                                                                                                price.period !==
                                                                                                    'monthly' &&
                                                                                                ' / ay'}
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                                <div className="flex flex-col items-end">
                                                                                    <span className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                                                                                        {formatPrice(
                                                                                            displayPrice,
                                                                                            currency,
                                                                                        )}
                                                                                        {isMonthlyPayment &&
                                                                                            price.period !==
                                                                                                'monthly' && (
                                                                                                <span className="ml-1 text-xs font-normal text-zinc-500 dark:text-zinc-400">
                                                                                                    /
                                                                                                    ay
                                                                                                </span>
                                                                                            )}
                                                                                    </span>
                                                                                    {hasDiscount && (
                                                                                        <span className="mt-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                                                            İndirimli
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    },
                                                                )}
                                                            </div>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-sm text-zinc-500 dark:text-zinc-400">
                                            Fiyat bilgisi mevcut değil
                                        </div>
                                    )}

                                    <Button
                                        asChild
                                        className="w-full rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        <Link
                                            href={`/platforms/${plan2.platform.slug}/${plan2.plan.slug}`}
                                        >
                                            Detayları Gör
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Comparison Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="space-y-8">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold tracking-wider text-blue-600 uppercase dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            <Sparkles className="h-3.5 w-3.5 fill-blue-600/20" />
                            Özellik Karşılaştırması
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                            Detaylı Özellik Karşılaştırması
                        </h2>
                        <p className="max-w-xl text-zinc-500 dark:text-zinc-400">
                            İki paketin özelliklerini kategori bazında
                            karşılaştırın.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {sortedCategories.map((category) => {
                            const features =
                                featuresByCategory.get(category) || [];
                            if (features.length === 0) return null;

                            return (
                                <Card
                                    key={category}
                                    className="border-zinc-200 shadow-sm dark:border-zinc-800"
                                >
                                    <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/50">
                                        <CardTitle className="text-lg font-semibold">
                                            {categoryLabels[category] ||
                                                category}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b border-zinc-200 dark:border-zinc-700">
                                                        <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                                            Özellik
                                                        </th>
                                                        <th className="min-w-[180px] px-4 py-3 text-center text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                                            {plan1.plan.name}
                                                        </th>
                                                        <th className="min-w-[180px] px-4 py-3 text-center text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                                            {plan2.plan.name}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {features.map((feature) => {
                                                        const plan1Value =
                                                            feature.plans.get(
                                                                plan1.plan.id,
                                                            );
                                                        const plan2Value =
                                                            feature.plans.get(
                                                                plan2.plan.id,
                                                            );
                                                        const displayName =
                                                            plan1Value?.platformLabel ||
                                                            plan2Value?.platformLabel ||
                                                            feature.featureName;

                                                        return (
                                                            <tr
                                                                key={
                                                                    feature.key
                                                                }
                                                                className="border-b border-zinc-100 transition-colors hover:bg-zinc-50/50 dark:border-zinc-800/50 dark:hover:bg-zinc-900/30"
                                                            >
                                                                <td className="px-4 py-3">
                                                                    <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                                                                        {
                                                                            displayName
                                                                        }
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-3 text-center">
                                                                    <div className="flex items-center justify-center">
                                                                        {plan1Value?.isIncluded ? (
                                                                            <div className="flex flex-col items-center gap-1">
                                                                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10">
                                                                                    <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                                                                                </div>
                                                                                {plan1Value.value &&
                                                                                    plan1Value.value !==
                                                                                        'true' &&
                                                                                    plan1Value.value !==
                                                                                        'false' && (
                                                                                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                                                                            {
                                                                                                plan1Value.value
                                                                                            }
                                                                                        </span>
                                                                                    )}
                                                                            </div>
                                                                        ) : (
                                                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500/10">
                                                                                <X className="h-3 w-3 text-red-600 dark:text-red-400" />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-3 text-center">
                                                                    <div className="flex items-center justify-center">
                                                                        {plan2Value?.isIncluded ? (
                                                                            <div className="flex flex-col items-center gap-1">
                                                                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10">
                                                                                    <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                                                                                </div>
                                                                                {plan2Value.value &&
                                                                                    plan2Value.value !==
                                                                                        'true' &&
                                                                                    plan2Value.value !==
                                                                                        'false' && (
                                                                                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                                                                            {
                                                                                                plan2Value.value
                                                                                            }
                                                                                        </span>
                                                                                    )}
                                                                            </div>
                                                                        ) : (
                                                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500/10">
                                                                                <X className="h-3 w-3 text-red-600 dark:text-red-400" />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
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
