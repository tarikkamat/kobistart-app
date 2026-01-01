import { useState } from 'react';
import { FilterGroup, FilterItem } from '@/types/filter';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterGroupProps {
    group: FilterGroup;
    selectedFilters: number[];
    onFilterChange: (filterId: number, checked: boolean) => void;
}

export default function FilterGroupComponent({ group, selectedFilters, onFilterChange }: FilterGroupProps) {
    const [isOpen, setIsOpen] = useState(true);
    const filterItems = group.filter_items || [];

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-3">
            <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                <div>
                    <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">
                        {group.name}
                    </h3>
                    {group.description && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            {group.description}
                        </p>
                    )}
                </div>
                {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-zinc-500" />
                ) : (
                    <ChevronDown className="h-4 w-4 text-zinc-500" />
                )}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
                {filterItems.length > 0 ? (
                    filterItems.map((item: FilterItem) => (
                        <div key={item.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={`filter-${item.id}`}
                                checked={selectedFilters.includes(item.id)}
                                onCheckedChange={(checked) => onFilterChange(item.id, checked as boolean)}
                            />
                            <label
                                htmlFor={`filter-${item.id}`}
                                className="text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer flex-1"
                            >
                                {item.name}
                            </label>
                        </div>
                    ))
                ) : (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 italic">
                        Bu grupta filtre bulunmamaktadır.
                    </p>
                )}
            </CollapsibleContent>
        </Collapsible>
    );
}

