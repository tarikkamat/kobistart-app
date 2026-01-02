import { Button } from '@/components/ui/button';
import { FilterGroup } from '@/types/filter';
import { X } from 'lucide-react';
import FilterGroupComponent from './FilterGroup';

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
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-80 transform border-r border-zinc-200 bg-white transition-transform duration-300 ease-in-out lg:sticky lg:z-auto lg:h-auto dark:border-zinc-800 dark:bg-zinc-900 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} overflow-y-auto`}
            >
                <div className="space-y-6 p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                            Filtrele
                        </h2>
                        <button
                            onClick={onClose}
                            className="rounded-lg p-2 transition-colors hover:bg-zinc-100 lg:hidden dark:hover:bg-zinc-800"
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
                                    className="border-b border-zinc-200 pb-4 last:border-0 dark:border-zinc-800"
                                >
                                    <FilterGroupComponent
                                        group={group}
                                        selectedFilters={selectedFilters}
                                        onFilterChange={onFilterChange}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                                Filtre bulunmamaktadır.
                            </p>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}
