import { useEffect, useMemo, useState, useCallback } from 'react';
import LandingLayout from '@/layouts/LandingLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plan, Platform } from '@/types';
import { FilterGroup } from '@/types/filter';
import FilterSidebar from './sections/FilterSidebar';
import { Button } from '@/components/ui/button';
import { Filter, X, Check } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
    type ColumnDef,
} from '@tanstack/react-table';

interface PageProps extends Record<string, unknown> {
    plans: Plan[];
    filterGroups: FilterGroup[];
}

interface PlanWithPlatform extends Plan {
    platform: Platform;
}

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

type BadgeType = 'discounted' | 'campaign' | 'kobistart-choice';

export default function PlansIndex() {
    const { plans, filterGroups } = usePage<PageProps>().props;
    const [selectedFilters, setSelectedFilters] = useState<number[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedBadges, setSelectedBadges] = useState<BadgeType[]>([]);

    // Get filters from URL params on mount
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const filtersParam = urlParams.get('filters');
        if (filtersParam) {
            const filterIds = filtersParam
                .split(',')
                .map(Number)
                .filter(Boolean);
            setSelectedFilters(filterIds);
        }
    }, []);

    const applyFilters = useCallback((filterIds: number[]) => {
        const params = new URLSearchParams();
        if (filterIds.length > 0) {
            params.set('filters', filterIds.join(','));
        }
        const queryString = params.toString();
        router.get(
            `/plans${queryString ? `?${queryString}` : ''}`,
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    }, []);

    const handleFilterChange = useCallback((filterId: number, checked: boolean) => {
        let newFilters: number[];
        if (checked) {
            newFilters = [...selectedFilters, filterId];
        } else {
            newFilters = selectedFilters.filter((id) => id !== filterId);
        }
        setSelectedFilters(newFilters);
        applyFilters(newFilters);
    }, [selectedFilters, applyFilters]);

    const handleClearFilters = useCallback(() => {
        setSelectedFilters([]);
        applyFilters([]);
    }, [applyFilters]);

    const handleBadgeToggle = (badgeType: BadgeType) => {
        setSelectedBadges((prev) => {
            if (prev.includes(badgeType)) {
                return prev.filter((b) => b !== badgeType);
            } else {
                return [...prev, badgeType];
            }
        });
    };

    // Memoize badge counts
    const badgeCounts = useMemo(() => {
        const discountedPlansCount = plans.filter((plan) => {
            const prices = plan.planPrices || (plan as any).plan_prices || [];
            return prices.some((p: any) => p.discounted_price !== null);
        }).length;

        const campaignPlansCount = plans.filter((plan) => {
            return (plan as any).is_featured || (plan as any).is_featured === true;
        }).length;

        const kobistartChoiceCount = plans.filter((plan) => {
            return (plan as any).is_kobistart_choice || (plan as any).is_kobistart_choice === true;
        }).length;

        return { discountedPlansCount, campaignPlansCount, kobistartChoiceCount };
    }, [plans]);

    // Filter plans based on selected badges
    const filteredPlansByBadges = useMemo(() => {
        if (selectedBadges.length === 0) {
            return plans;
        }

        return plans.filter((plan) => {
            const prices = plan.planPrices || (plan as any).plan_prices || [];
            const hasDiscount = prices.some((p: any) => p.discounted_price !== null);
            const isFeatured = (plan as any).is_featured || (plan as any).is_featured === true;
            const isKobistartChoice = (plan as any).is_kobistart_choice || (plan as any).is_kobistart_choice === true;

            return selectedBadges.some((badge) => {
                if (badge === 'discounted') return hasDiscount;
                if (badge === 'campaign') return isFeatured;
                if (badge === 'kobistart-choice') return isKobistartChoice;
                return false;
            });
        });
    }, [plans, selectedBadges]);

    // Extract platform from plan and prepare table data
    const tableData = useMemo(() => {
        return filteredPlansByBadges
            .map((plan) => {
                const platform = (plan as any).platform;
                if (!platform) {
                    return null;
                }
                return {
                    ...plan,
                    platform,
                } as PlanWithPlatform;
            })
            .filter((item): item is PlanWithPlatform => item !== null);
    }, [filteredPlansByBadges]);

    // Define table columns
    const columnHelper = createColumnHelper<PlanWithPlatform>();

    const columns = useMemo(
        () => [
            columnHelper.accessor('platform', {
                header: 'Platform',
                cell: (info) => {
                    const platform = info.getValue();
                    return (
                        <div className="flex items-center gap-3">
                            {platform.logo ? (
                                <OptimizedImage
                                    src={platform.logo}
                                    alt={platform.name}
                                    className="h-8 w-auto object-contain"
                                    loading="lazy"
                                />
                            ) : (
                                <span className="font-medium text-zinc-900 dark:text-zinc-50">
                                    {platform.name}
                                </span>
                            )}
                        </div>
                    );
                },
            }),
            columnHelper.accessor('name', {
                header: 'Plan Adı',
                cell: (info) => {
                    return (
                        <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                            {info.getValue()}
                        </span>
                    );
                },
            }),
            columnHelper.accessor((row) => row, {
                id: 'price',
                header: 'Fiyat',
                cell: (info) => {
                    const plan = info.getValue();
                    const bestPrice = getBestPrice(plan);
                    if (!bestPrice) {
                        return (
                            <span className="text-sm text-zinc-500 dark:text-zinc-400">
                                Fiyat bilgisi yok
                            </span>
                        );
                    }
                    return (
                        <div className="space-y-1">
                            <div className="flex items-baseline gap-2">
                                <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                                    {formatPrice(
                                        bestPrice.price,
                                        bestPrice.currency,
                                    )}
                                </span>
                                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                    / {getPeriodLabel(bestPrice.period)}
                                </span>
                            </div>
                            {bestPrice.hasDiscount &&
                                bestPrice.originalPrice && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-zinc-400 line-through dark:text-zinc-500">
                                            {formatPrice(
                                                bestPrice.originalPrice,
                                                bestPrice.currency,
                                            )}
                                        </span>
                                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                            İndirimli
                                        </span>
                                    </div>
                                )}
                        </div>
                    );
                },
            }),
            columnHelper.accessor((row) => row, {
                id: 'features',
                header: 'Özellikler',
                cell: (info) => {
                    const plan = info.getValue();
                    const planFeatures = plan.features || [];
                    const includedFeatures = planFeatures.filter(
                        (pf: any) => pf.is_included && pf.feature,
                    );
                    const displayedFeatures = includedFeatures.slice(0, 3);

                    if (displayedFeatures.length === 0) {
                        return (
                            <div className="flex items-center gap-2">
                                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                                    <Check className="h-2.5 w-2.5 text-green-600 dark:text-green-400" />
                                </div>
                                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Tüm temel özellikler
                                </span>
                            </div>
                        );
                    }

                    return (
                        <div className="space-y-1.5">
                            {displayedFeatures.map((pf: any) => {
                                const displayName =
                                    pf.platform_label ||
                                    pf.feature?.name ||
                                    'Özellik';
                                return (
                                    <div
                                        key={pf.id}
                                        className="flex items-center gap-2"
                                    >
                                        <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                                            <Check className="h-2.5 w-2.5 text-green-600 dark:text-green-400" />
                                        </div>
                                        <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                            {displayName}
                                            {pf.value &&
                                                pf.value !== 'true' &&
                                                pf.value !== 'false' && (
                                                    <span className="ml-1 text-xs text-zinc-500 dark:text-zinc-500">
                                                        ({pf.value})
                                                    </span>
                                                )}
                                        </span>
                                    </div>
                                );
                            })}
                            {includedFeatures.length > 3 && (
                                <span className="text-xs text-zinc-500 italic dark:text-zinc-400">
                                    +{includedFeatures.length - 3} özellik daha
                                </span>
                            )}
                        </div>
                    );
                },
            }),
            columnHelper.accessor((row) => row, {
                id: 'actions',
                header: 'İşlemler',
                cell: (info) => {
                    const plan = info.getValue();
                    const platform = plan.platform;
                    return (
                        <Button
                            asChild
                            size="sm"
                            className="rounded-xl bg-zinc-900 text-white transition-colors hover:bg-blue-600 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-blue-500 dark:hover:text-white"
                        >
                            <Link
                                href={`/platforms/${platform.slug}/${plan.slug}`}
                            >
                                Detayları Gör
                            </Link>
                        </Button>
                    );
                },
            }),
        ] as ColumnDef<PlanWithPlatform>[],
        [columnHelper],
    );

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <LandingLayout>
            <Head title="E-Ticaret Planları - KobiStart" />

            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="mb-8">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold tracking-wider text-blue-600 uppercase dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        E-Ticaret Planları
                    </div>
                    <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Tüm E-Ticaret Planları
                    </h1>
                    <p className="max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">
                        Platformların sunduğu tüm planları karşılaştırın ve
                        ihtiyacınıza en uygun olanı seçin.
                    </p>
                </div>

                {/* Mobile Filter Button */}
                <div className="mb-6 lg:hidden">
                    <Button
                        variant="outline"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="w-full"
                    >
                        <Filter className="mr-2 h-4 w-4" />
                        Filtrele
                        {selectedFilters.length > 0 && (
                            <span className="ml-2 rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                                {selectedFilters.length}
                            </span>
                        )}
                    </Button>
                </div>

                <div className="flex gap-8">
                    {/* Filter Sidebar */}
                    <div className="hidden flex-shrink-0 lg:block lg:w-80">
                        <FilterSidebar
                            filterGroups={filterGroups}
                            selectedFilters={selectedFilters}
                            onFilterChange={handleFilterChange}
                            onClearFilters={handleClearFilters}
                            isOpen={isFilterOpen}
                            onClose={() => setIsFilterOpen(false)}
                        />
                    </div>

                    {/* Mobile Filter Sidebar */}
                    <div className="lg:hidden">
                        <FilterSidebar
                            filterGroups={filterGroups}
                            selectedFilters={selectedFilters}
                            onFilterChange={handleFilterChange}
                            onClearFilters={handleClearFilters}
                            isOpen={isFilterOpen}
                            onClose={() => setIsFilterOpen(false)}
                        />
                    </div>

                    {/* Plans Grid */}
                    <div className="flex-1">
                        {/* Active Filters */}
                        {selectedFilters.length > 0 && (
                            <div className="mb-6 flex flex-wrap items-center gap-2">
                                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Aktif Filtreler:
                                </span>
                                {selectedFilters.map((filterId) => {
                                    // Find filter item name
                                    let filterName = '';
                                    for (const group of filterGroups) {
                                        const item = group.filter_items?.find(
                                            (item) => item.id === filterId,
                                        );
                                        if (item) {
                                            filterName = item.name;
                                            break;
                                        }
                                    }
                                    return (
                                        <button
                                            key={filterId}
                                            onClick={() =>
                                                handleFilterChange(
                                                    filterId,
                                                    false,
                                                )
                                            }
                                            className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 transition-colors hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                                        >
                                            {filterName}
                                            <X className="h-3 w-3" />
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {/* Badges */}
                        <div className="mb-6 flex flex-wrap items-center gap-3">
                            {(() => {
                                const { discountedPlansCount, campaignPlansCount, kobistartChoiceCount } = badgeCounts;
                                const isDiscountedSelected = selectedBadges.includes('discounted');
                                const isCampaignSelected = selectedBadges.includes('campaign');
                                const isKobistartChoiceSelected = selectedBadges.includes('kobistart-choice');

                                return (
                                    <>
                                        {discountedPlansCount > 0 && (
                                            <button
                                                onClick={() => handleBadgeToggle('discounted')}
                                                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all hover:scale-105 cursor-pointer ${
                                                    isDiscountedSelected
                                                        ? 'border-green-500 bg-green-500 text-white dark:border-green-400 dark:bg-green-600 dark:text-white'
                                                        : 'border-green-100 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                }`}
                                            >
                                                <span>İndirimli Planlar</span>
                                                <span className={`rounded-full px-2 py-0.5 text-xs ${
                                                    isDiscountedSelected
                                                        ? 'bg-green-600 text-white dark:bg-green-700'
                                                        : 'bg-green-200 dark:bg-green-800'
                                                }`}>
                                                    {discountedPlansCount}
                                                </span>
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleBadgeToggle('campaign')}
                                            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all hover:scale-105 cursor-pointer ${
                                                isCampaignSelected
                                                    ? 'border-orange-500 bg-orange-500 text-white dark:border-orange-400 dark:bg-orange-600 dark:text-white'
                                                    : 'border-orange-100 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                                            }`}
                                        >
                                            <span>Kampanyalı Planlar</span>
                                            {campaignPlansCount > 0 && (
                                                <span className={`rounded-full px-2 py-0.5 text-xs ${
                                                    isCampaignSelected
                                                        ? 'bg-orange-600 text-white dark:bg-orange-700'
                                                        : 'bg-orange-200 dark:bg-orange-800'
                                                }`}>
                                                    {campaignPlansCount}
                                                </span>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => handleBadgeToggle('kobistart-choice')}
                                            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all hover:scale-105 cursor-pointer ${
                                                isKobistartChoiceSelected
                                                    ? 'border-blue-500 bg-blue-500 text-white dark:border-blue-400 dark:bg-blue-600 dark:text-white'
                                                    : 'border-blue-100 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                            }`}
                                        >
                                            <span>KobiStart Seçimi</span>
                                            {kobistartChoiceCount > 0 && (
                                                <span className={`rounded-full px-2 py-0.5 text-xs ${
                                                    isKobistartChoiceSelected
                                                        ? 'bg-blue-600 text-white dark:bg-blue-700'
                                                        : 'bg-blue-200 dark:bg-blue-800'
                                                }`}>
                                                    {kobistartChoiceCount}
                                                </span>
                                            )}
                                        </button>
                                    </>
                                );
                            })()}
                        </div>

                        {/* Plans Count */}
                        <div className="mb-6">
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                                    {filteredPlansByBadges.length}
                                </span>{' '}
                                plan bulundu
                            </p>
                        </div>

                        {/* Plans Table */}
                        {filteredPlansByBadges.length > 0 ? (
                            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
                                            {table.getHeaderGroups().map((headerGroup) => (
                                                <tr key={headerGroup.id}>
                                                    {headerGroup.headers.map((header) => (
                                                        <th
                                                            key={header.id}
                                                            className="px-6 py-4 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-50"
                                                        >
                                                            {header.isPlaceholder
                                                                ? null
                                                                : flexRender(
                                                                      header.column.columnDef.header,
                                                                      header.getContext(),
                                                                  )}
                                                        </th>
                                                    ))}
                                                </tr>
                                            ))}
                                        </thead>
                                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                            {table.getRowModel().rows.map((row) => (
                                                <tr
                                                    key={row.id}
                                                    className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                                                >
                                                    {row.getVisibleCells().map((cell) => (
                                                        <td
                                                            key={cell.id}
                                                            className="px-6 py-4"
                                                        >
                                                            {flexRender(
                                                                cell.column.columnDef.cell,
                                                                cell.getContext(),
                                                            )}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
                                <p className="mb-4 text-lg text-zinc-500 dark:text-zinc-400">
                                    Seçtiğiniz filtrelerle eşleşen plan
                                    bulunamadı.
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={handleClearFilters}
                                >
                                    Filtreleri Temizle
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
