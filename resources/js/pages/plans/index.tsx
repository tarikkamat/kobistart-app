import { useState, useEffect } from 'react';
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
            const filterIds = filtersParam.split(',').map(Number).filter(Boolean);
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
        router.get(`/plans${queryString ? `?${queryString}` : ''}`, {}, {
            preserveState: true,
            preserveScroll: true,
        });
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
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-100 dark:border-blue-800 mb-4">
                        E-Ticaret Planları
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
                        Tüm E-Ticaret Planları
                    </h1>
                    <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
                        Platformların sunduğu tüm planları karşılaştırın ve ihtiyacınıza en uygun olanı seçin.
                    </p>
                </div>

                {/* Mobile Filter Button */}
                <div className="lg:hidden mb-6">
                    <Button
                        variant="outline"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="w-full"
                    >
                        <Filter className="h-4 w-4 mr-2" />
                        Filtrele
                        {selectedFilters.length > 0 && (
                            <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white rounded-full text-xs">
                                {selectedFilters.length}
                            </span>
                        )}
                    </Button>
                </div>

                <div className="flex gap-8">
                    {/* Filter Sidebar */}
                    <div className="hidden lg:block lg:w-80 flex-shrink-0">
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
                            <div className="mb-6 flex flex-wrap gap-2 items-center">
                                <span className="text-sm text-zinc-600 dark:text-zinc-400">Aktif Filtreler:</span>
                                {selectedFilters.map((filterId) => {
                                    // Find filter item name
                                    let filterName = '';
                                    for (const group of filterGroups) {
                                        const item = group.filter_items?.find((item) => item.id === filterId);
                                        if (item) {
                                            filterName = item.name;
                                            break;
                                        }
                                    }
                                    return (
                                        <button
                                            key={filterId}
                                            onClick={() => handleFilterChange(filterId, false)}
                                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
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
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                            <div className="rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-12 text-center">
                                <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-4">
                                    Seçtiğiniz filtrelerle eşleşen plan bulunamadı.
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

