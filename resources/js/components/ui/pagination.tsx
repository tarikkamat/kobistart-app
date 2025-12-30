import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { router } from '@inertiajs/react';

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    onPageChange?: (page: number) => void;
}

export function Pagination({ currentPage, lastPage, onPageChange }: PaginationProps) {
    if (lastPage <= 1) {
        return null;
    }

    const handlePageChange = (page: number) => {
        if (onPageChange) {
            onPageChange(page);
        } else {
            const url = new URL(window.location.href);
            url.searchParams.set('comments_page', page.toString());
            router.get(url.pathname + url.search, {}, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (lastPage <= maxVisible) {
            for (let i = 1; i <= lastPage; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(lastPage);
            } else if (currentPage >= lastPage - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = lastPage - 3; i <= lastPage; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(lastPage);
            }
        }

        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {getPageNumbers().map((page, index) => {
                if (page === '...') {
                    return (
                        <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
                            ...
                        </span>
                    );
                }

                return (
                    <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handlePageChange(page as number)}
                    >
                        {page}
                    </Button>
                );
            })}

            <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}

