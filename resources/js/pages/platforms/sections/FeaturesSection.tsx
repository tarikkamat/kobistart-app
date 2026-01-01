import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { Plan } from '@/types';
import { PlanFeature, FEATURE_CATEGORIES } from '@/types/feature';

interface FeaturesSectionProps {
    plans: Plan[];
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

export default function FeaturesSection({ plans }: FeaturesSectionProps) {
    if (!plans || plans.length === 0) {
        return null;
    }

    // Tüm planlardaki özellikleri topla (feature key bazlı)
    const allFeatureKeys = new Set<string>();
    const featuresByPlan = new Map<number, Map<string, PlanFeature>>();

    plans.forEach(plan => {
        const planFeaturesMap = new Map<string, PlanFeature>();
        const features = plan.features || [];
        features.forEach(pf => {
            if (pf.feature) {
                const key = pf.feature.key;
                allFeatureKeys.add(key);
                planFeaturesMap.set(key, pf);
            }
        });
        featuresByPlan.set(plan.id, planFeaturesMap);
    });

    // Özellikleri kategoriye göre grupla
    const featuresByCategory = new Map<string, Array<{
        key: string;
        featureName: string;
        category: string;
        plans: Map<number, { value: string | null; isIncluded: boolean; platformLabel: string | null }>;
    }>>();

    allFeatureKeys.forEach((key) => {
        // İlk plan'dan feature bilgisini al (tüm planlarda aynı olmalı)
        let featureInfo: { name: string; category: string } | null = null;
        for (const plan of plans) {
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

        // Her plan için değerleri topla
        const planValues = new Map<number, { value: string | null; isIncluded: boolean; platformLabel: string | null }>();
        plans.forEach(plan => {
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

    // Kategorileri sırala (core önce gelsin)
    const sortedCategories = Array.from(featuresByCategory.keys()).sort((a, b) => {
        if (a === FEATURE_CATEGORIES.CORE) return -1;
        if (b === FEATURE_CATEGORIES.CORE) return 1;
        return a.localeCompare(b);
    });

    return (
        <div className="space-y-8">
            <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-100 dark:border-blue-800">
                    Özellikler
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Plan Özellikleri
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 max-w-xl">
                    Tüm planlarda bulunan özellikleri kategori bazında görüntüleyin.
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
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-zinc-200 dark:border-zinc-700">
                                                <th className="text-left py-3 px-4 font-semibold text-sm text-zinc-900 dark:text-zinc-50">
                                                    Özellik
                                                </th>
                                                {plans.map((plan) => (
                                                    <th
                                                        key={plan.id}
                                                        className="text-center py-3 px-4 font-semibold text-sm text-zinc-900 dark:text-zinc-50 min-w-[120px]"
                                                    >
                                                        {plan.name}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {features.map((feature) => {
                                                // Platform label'ı bul (ilk plan'dan)
                                                const firstPlan = plans[0];
                                                const firstPlanValue = feature.plans.get(firstPlan.id);
                                                const displayName = firstPlanValue?.platformLabel || feature.featureName;

                                                return (
                                                    <tr
                                                        key={feature.key}
                                                        className="border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors"
                                                    >
                                                        <td className="py-3 px-4">
                                                            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                                                                {displayName}
                                                            </div>
                                                        </td>
                                                        {plans.map((plan) => {
                                                            const planValue = feature.plans.get(plan.id);
                                                            const isIncluded = planValue?.isIncluded ?? false;
                                                            const value = planValue?.value;

                                                            return (
                                                                <td key={plan.id} className="py-3 px-4 text-center">
                                                                    <div className="flex items-center justify-center">
                                                                        {isIncluded ? (
                                                                            <div className="flex flex-col items-center gap-1">
                                                                                <div className="h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center">
                                                                                    <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                                                                                </div>
                                                                                {value && value !== 'true' && value !== 'false' && (
                                                                                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                                                                        {value}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        ) : (
                                                                            <div className="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center">
                                                                                <X className="h-3 w-3 text-red-600 dark:text-red-400" />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            );
                                                        })}
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
    );
}
