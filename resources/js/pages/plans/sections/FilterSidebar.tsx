import { FilterGroup } from '@/types/filter';
import FilterGroupComponent from './FilterGroup';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FilterSidebarProps {
    filterGroups: FilterGroup[];
    selectedFilters: number[];
    onFilterChange: (filterId: number, checked: boolean) => void;
    onClearFilters: () => void;
    isOpen: boolean;
    onClose: () => void;
}

export default function FilterSidebar({
    filterGroups,
    selectedFilters,
    onFilterChange,
    onClearFilters,
    isOpen,
    onClose,
}: FilterSidebarProps) {
    const hasActiveFilters = selectedFilters.length > 0;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:sticky top-0 left-0 h-full lg:h-auto
                    w-80 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800
                    z-50 lg:z-auto
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    overflow-y-auto
                `}
            >
                <div className="p-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                            Filtrele
                        </h2>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5 text-zinc-500" />
                        </button>
                    </div>

                    {/* Clear Filters Button */}
                    {hasActiveFilters && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onClearFilters}
                            className="w-full"
                        >
                            Filtreleri Temizle ({selectedFilters.length})
                        </Button>
                    )}

                    {/* Filter Groups */}
                    <div className="space-y-4">
                        {filterGroups.length > 0 ? (
                            filterGroups.map((group) => (
                                <div
                                    key={group.id}
                                    className="pb-4 border-b border-zinc-200 dark:border-zinc-800 last:border-0"
                                >
                                    <FilterGroupComponent
                                        group={group}
                                        selectedFilters={selectedFilters}
                                        onFilterChange={onFilterChange}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center py-8">
                                Filtre bulunmamaktadır.
                            </p>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}

