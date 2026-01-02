import { useEffect, useState } from 'react';
import LandingLayout from '@/layouts/LandingLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { Plan, Platform } from '@/types';
import { FilterGroup } from '@/types/filter';
import PlanCard from './sections/PlanCard';
import FilterSidebar from './sections/FilterSidebar';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

interface PageProps extends Record<string, unknown> {
    plans: Plan[];
    filterGroups: FilterGroup[];
}

export default function PlansIndex() {
    const { plans, filterGroups } = usePage<PageProps>().props;
    const [selectedFilters, setSelectedFilters] = useState<number[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

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

    const handleFilterChange = (filterId: number, checked: boolean) => {
        let newFilters: number[];
        if (checked) {
            newFilters = [...selectedFilters, filterId];
        } else {
            newFilters = selectedFilters.filter((id) => id !== filterId);
        }
        setSelectedFilters(newFilters);
        applyFilters(newFilters);
    };

    const handleClearFilters = () => {
        setSelectedFilters([]);
        applyFilters([]);
    };

    const applyFilters = (filterIds: number[]) => {
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
    };

    // Extract platform from plan
    const getPlatformFromPlan = (plan: Plan): Platform | null => {
        if ((plan as any).platform) {
            return (plan as any).platform;
        }
        return null;
    };

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

                        {/* Plans Count */}
                        <div className="mb-6">
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                                    {plans.length}
                                </span>{' '}
                                plan bulundu
                            </p>
                        </div>

                        {/* Plans Grid */}
                        {plans.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {plans.map((plan) => {
                                    const platform = getPlatformFromPlan(plan);
                                    if (!platform) {
                                        return null;
                                    }
                                    return (
                                        <PlanCard
                                            key={plan.id}
                                            plan={plan}
                                            platform={platform}
                                        />
                                    );
                                })}
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
