import AppLayout from '@/layouts/app-layout';
import { Head, usePage, Link, router } from '@inertiajs/react';
import { Platform, Plan } from '@/types';
import { destroy as comparisonsDestroy, show as comparisonsShow } from '@/routes/comparisons';
import { GitCompare, Trash2, ExternalLink, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
                        Karşılaştırmalarım
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        Kaydettiğiniz plan karşılaştırmaları
                    </p>
                </div>

                {comparisons.length === 0 ? (
                    <div className="text-center py-20">
                        <GitCompare className="h-16 w-16 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                            Henüz karşılaştırma kaydedilmemiş
                        </h3>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                            Planları karşılaştırarak kaydedebilirsiniz
                        </p>
                        <Button asChild>
                            <Link href="/platforms">Platformları Keşfet</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                        {comparisons.map((comparison) => (
                            <Card key={comparison.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                            <GitCompare className="h-5 w-5" />
                                            Karşılaştırma #{comparison.id}
                                        </CardTitle>
                                        <Badge variant="outline" className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {formatDate(comparison.created_at)}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        {/* Plan 1 */}
                                        <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                                            <div className="h-12 w-12 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-2 flex items-center justify-center flex-shrink-0">
                                                {comparison.plan1.platform.logo ? (
                                                    <>
                                                        <img
                                                            src={comparison.plan1.platform.logo}
                                                            alt={comparison.plan1.platform.name}
                                                            className="h-full w-full object-contain dark:hidden"
                                                        />
                                                        {comparison.plan1.platform.dark_logo && (
                                                            <img
                                                                src={comparison.plan1.platform.dark_logo}
                                                                alt={comparison.plan1.platform.name}
                                                                className="h-full w-full object-contain hidden dark:block"
                                                            />
                                                        )}
                                                    </>
                                                ) : (
                                                    <span className="text-lg font-bold bg-gradient-to-br from-blue-600 to-violet-600 bg-clip-text text-transparent">
                                                        {comparison.plan1.platform.name.charAt(0).toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                                                    {comparison.plan1.platform.name}
                                                </div>
                                                <div className="font-semibold text-zinc-900 dark:text-zinc-50 truncate">
                                                    {comparison.plan1.plan.name}
                                                </div>
                                            </div>
                                        </div>

                                        {/* VS Divider */}
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700"></div>
                                            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 px-2">
                                                VS
                                            </span>
                                            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700"></div>
                                        </div>

                                        {/* Plan 2 */}
                                        <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                                            <div className="h-12 w-12 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-2 flex items-center justify-center flex-shrink-0">
                                                {comparison.plan2.platform.logo ? (
                                                    <>
                                                        <img
                                                            src={comparison.plan2.platform.logo}
                                                            alt={comparison.plan2.platform.name}
                                                            className="h-full w-full object-contain dark:hidden"
                                                        />
                                                        {comparison.plan2.platform.dark_logo && (
                                                            <img
                                                                src={comparison.plan2.platform.dark_logo}
                                                                alt={comparison.plan2.platform.name}
                                                                className="h-full w-full object-contain hidden dark:block"
                                                            />
                                                        )}
                                                    </>
                                                ) : (
                                                    <span className="text-lg font-bold bg-gradient-to-br from-blue-600 to-violet-600 bg-clip-text text-transparent">
                                                        {comparison.plan2.platform.name.charAt(0).toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                                                    {comparison.plan2.platform.name}
                                                </div>
                                                <div className="font-semibold text-zinc-900 dark:text-zinc-50 truncate">
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
                                                <Link href={comparisonsShow.url({ comparison: comparison.id })}>
                                                    <ExternalLink className="mr-2 h-4 w-4" />
                                                    Detayları Gör
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleDeleteComparison(comparison.id)}
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

