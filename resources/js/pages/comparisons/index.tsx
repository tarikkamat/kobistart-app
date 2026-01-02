import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import {
    destroy as comparisonsDestroy,
    show as comparisonsShow,
} from '@/routes/comparisons';
import { Plan, Platform } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Calendar, ExternalLink, GitCompare, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Comparison {
    id: number;
    plan1: {
        plan: Plan;
        platform: Platform;
    };
    plan2: {
        plan: Plan;
        platform: Platform;
    };
    notes: string | null;
    created_at: string;
    updated_at: string;
}

interface PageProps extends Record<string, unknown> {
    comparisons: Comparison[];
}

export default function ComparisonsIndex() {
    const { comparisons } = usePage<PageProps>().props;

    const handleDeleteComparison = (comparisonId: number) => {
        router.delete(comparisonsDestroy.url({ comparison: comparisonId }), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Karşılaştırma başarıyla silindi');
            },
            onError: () => {
                toast.error('Bir hata oluştu');
            },
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    };

    return (
        <AppLayout>
            <Head title="Karşılaştırmalarım" />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Karşılaştırmalarım
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        Kaydettiğiniz plan karşılaştırmaları
                    </p>
                </div>

                {comparisons.length === 0 ? (
                    <div className="py-20 text-center">
                        <GitCompare className="mx-auto mb-4 h-16 w-16 text-zinc-300 dark:text-zinc-700" />
                        <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                            Henüz karşılaştırma kaydedilmemiş
                        </h3>
                        <p className="mb-6 text-zinc-500 dark:text-zinc-400">
                            Planları karşılaştırarak kaydedebilirsiniz
                        </p>
                        <Button asChild>
                            <Link href="/platforms">Platformları Keşfet</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                        {comparisons.map((comparison) => (
                            <Card
                                key={comparison.id}
                                className="overflow-hidden transition-shadow hover:shadow-lg"
                            >
                                <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/50">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                                            <GitCompare className="h-5 w-5" />
                                            Karşılaştırma #{comparison.id}
                                        </CardTitle>
                                        <Badge
                                            variant="outline"
                                            className="flex items-center gap-1"
                                        >
                                            <Calendar className="h-3 w-3" />
                                            {formatDate(comparison.created_at)}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        {/* Plan 1 */}
                                        <div className="flex items-center gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
                                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-800">
                                                {comparison.plan1.platform
                                                    .logo ? (
                                                    <>
                                                        <img
                                                            src={
                                                                comparison.plan1
                                                                    .platform
                                                                    .logo
                                                            }
                                                            alt={
                                                                comparison.plan1
                                                                    .platform
                                                                    .name
                                                            }
                                                            className="h-full w-full object-contain dark:hidden"
                                                        />
                                                        {comparison.plan1
                                                            .platform
                                                            .dark_logo && (
                                                            <img
                                                                src={
                                                                    comparison
                                                                        .plan1
                                                                        .platform
                                                                        .dark_logo
                                                                }
                                                                alt={
                                                                    comparison
                                                                        .plan1
                                                                        .platform
                                                                        .name
                                                                }
                                                                className="hidden h-full w-full object-contain dark:block"
                                                            />
                                                        )}
                                                    </>
                                                ) : (
                                                    <span className="bg-gradient-to-br from-blue-600 to-violet-600 bg-clip-text text-lg font-bold text-transparent">
                                                        {comparison.plan1.platform.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="mb-1 text-xs text-zinc-500 dark:text-zinc-400">
                                                    {
                                                        comparison.plan1
                                                            .platform.name
                                                    }
                                                </div>
                                                <div className="truncate font-semibold text-zinc-900 dark:text-zinc-50">
                                                    {comparison.plan1.plan.name}
                                                </div>
                                            </div>
                                        </div>

                                        {/* VS Divider */}
                                        <div className="flex items-center gap-2">
                                            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700"></div>
                                            <span className="px-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                                                VS
                                            </span>
                                            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700"></div>
                                        </div>

                                        {/* Plan 2 */}
                                        <div className="flex items-center gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
                                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-800">
                                                {comparison.plan2.platform
                                                    .logo ? (
                                                    <>
                                                        <img
                                                            src={
                                                                comparison.plan2
                                                                    .platform
                                                                    .logo
                                                            }
                                                            alt={
                                                                comparison.plan2
                                                                    .platform
                                                                    .name
                                                            }
                                                            className="h-full w-full object-contain dark:hidden"
                                                        />
                                                        {comparison.plan2
                                                            .platform
                                                            .dark_logo && (
                                                            <img
                                                                src={
                                                                    comparison
                                                                        .plan2
                                                                        .platform
                                                                        .dark_logo
                                                                }
                                                                alt={
                                                                    comparison
                                                                        .plan2
                                                                        .platform
                                                                        .name
                                                                }
                                                                className="hidden h-full w-full object-contain dark:block"
                                                            />
                                                        )}
                                                    </>
                                                ) : (
                                                    <span className="bg-gradient-to-br from-blue-600 to-violet-600 bg-clip-text text-lg font-bold text-transparent">
                                                        {comparison.plan2.platform.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="mb-1 text-xs text-zinc-500 dark:text-zinc-400">
                                                    {
                                                        comparison.plan2
                                                            .platform.name
                                                    }
                                                </div>
                                                <div className="truncate font-semibold text-zinc-900 dark:text-zinc-50">
                                                    {comparison.plan2.plan.name}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 pt-2">
                                            <Button
                                                asChild
                                                className="flex-1"
                                                variant="default"
                                            >
                                                <Link
                                                    href={comparisonsShow.url({
                                                        comparison:
                                                            comparison.id,
                                                    })}
                                                >
                                                    <ExternalLink className="mr-2 h-4 w-4" />
                                                    Detayları Gör
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() =>
                                                    handleDeleteComparison(
                                                        comparison.id,
                                                    )
                                                }
                                                className="flex-shrink-0"
                                            >
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
