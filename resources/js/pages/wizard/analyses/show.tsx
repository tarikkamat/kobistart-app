import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    AlertTriangle,
    ArrowLeft,
    ArrowRight,
    Check,
    FileDown,
    Lightbulb,
    Trash2,
    TrendingUp,
} from 'lucide-react';
import { WizardAnalysisDetail } from '@/types/wizard';
import { toast } from 'sonner';

interface PageProps extends Record<string, unknown> {
    analysis: WizardAnalysisDetail;
}

// Circular Progress Component
function CircularProgress({ score }: { score: number }) {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg className="-rotate-90 transform" width="120" height="120">
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted"
                />
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="text-primary transition-all duration-500"
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-3xl font-bold">{score}</div>
                    <div className="text-xs text-muted-foreground">Puan</div>
                </div>
            </div>
        </div>
    );
}

function ConfidenceBadge({
    confidence,
}: {
    confidence: 'high' | 'medium' | 'low';
}) {
    const config = {
        high: {
            label: 'Yüksek',
            variant: 'default' as const,
            className: 'bg-green-500 text-white',
        },
        medium: {
            label: 'Orta',
            variant: 'secondary' as const,
            className: 'bg-yellow-500 text-white',
        },
        low: {
            label: 'Düşük',
            variant: 'outline' as const,
            className: 'bg-orange-500 text-white',
        },
    };

    const { label, className } = config[confidence];

    return <Badge className={className}>{label} Güven</Badge>;
}

export default function WizardAnalysisShow() {
    const { analysis } = usePage<PageProps>().props;
    const result = analysis.result;
    const primary = result.primary;

    const handleDelete = () => {
        if (!confirm('Bu analizi silmek istediğinize emin misiniz?')) {
            return;
        }

        router.delete(`/wizard/analyses/${analysis.id}`, {
            onSuccess: () => {
                toast.success('Analiz başarıyla silindi');
                router.visit('/wizard/analyses');
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
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    if (!result || !primary) {
        return (
            <AppLayout>
                <Head title="Analiz Detayı" />
                <div className="container mx-auto max-w-4xl px-4 py-12">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="space-y-4 text-center">
                                <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500" />
                                <h2 className="text-xl font-semibold">
                                    Analiz Bulunamadı
                                </h2>
                                <p className="text-muted-foreground">
                                    Bu analiz bulunamadı veya erişim yetkiniz
                                    yok.
                                </p>
                                <Button
                                    onClick={() =>
                                        router.visit('/wizard/analyses')
                                    }
                                    variant="outline"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Analizlere Dön
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Head title="Analiz Detayı - Platform Önerisi" />
            <div className="container mx-auto max-w-4xl px-4 py-12">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <Button
                                variant="ghost"
                                onClick={() => router.visit('/wizard/analyses')}
                                className="mb-4"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Analizlere Dön
                            </Button>
                            <h1 className="text-3xl font-bold">
                                Platform Önerisi
                            </h1>
                            <p className="mt-1 text-muted-foreground">
                                Analiz Tarihi: {formatDate(analysis.created_at)}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" asChild>
                                <Link
                                    href={`/wizard/analyses/${analysis.id}/pdf`}
                                >
                                    <FileDown className="mr-2 h-4 w-4" />
                                    PDF İndir
                                </Link>
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Sil
                            </Button>
                        </div>
                    </div>

                    {/* Platform Card */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    {primary.platform.logo && (
                                        <img
                                            src={primary.platform.logo}
                                            alt={primary.platform.name}
                                            className="h-16 w-auto dark:hidden"
                                        />
                                    )}
                                    {primary.platform.dark_logo && (
                                        <img
                                            src={primary.platform.dark_logo}
                                            alt={primary.platform.name}
                                            className="hidden h-16 w-auto dark:block"
                                        />
                                    )}
                                    <div>
                                        <CardTitle className="text-2xl">
                                            {primary.platform.name}
                                        </CardTitle>
                                        <p className="mt-1 text-muted-foreground">
                                            {primary.platform.description ||
                                                'E-ticaret platformu'}
                                        </p>
                                        {primary.recommendedPlan && (
                                            <p className="mt-2 text-sm font-medium">
                                                Önerilen Plan:{' '}
                                                {primary.recommendedPlan.name} -
                                                $
                                                {
                                                    primary.recommendedPlan
                                                        .monthlyPrice
                                                }
                                                /
                                                {primary.recommendedPlan
                                                    .currency === 'USD'
                                                    ? 'ay'
                                                    : primary.recommendedPlan
                                                          .currency}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <ConfidenceBadge
                                    confidence={primary.confidence}
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-center gap-8 py-4">
                                <CircularProgress score={primary.score} />
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">
                                        Toplam Uyum Skoru
                                    </p>
                                    <p className="text-lg font-semibold">
                                        {primary.score}/100
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Reasons Section */}
                    {primary.reasons && primary.reasons.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <Check className="h-5 w-5 text-green-500" />
                                    Neden Bu Platform?
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {primary.reasons.map((reason, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-3"
                                        >
                                            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                                            <span>{reason}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    )}

                    {/* Warnings Section */}
                    {primary.warnings && primary.warnings.length > 0 && (
                        <Card className="border-yellow-200 bg-yellow-50/50 dark:border-yellow-800 dark:bg-yellow-950/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl text-yellow-900 dark:text-yellow-100">
                                    <AlertTriangle className="h-5 w-5" />
                                    Dikkat Edilmesi Gerekenler
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {primary.warnings.map((warning, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-3 text-yellow-800 dark:text-yellow-200"
                                        >
                                            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                                            <span>{warning}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    )}

                    {/* Secondary Platform & Alternative Scenarios */}
                    {(result.secondary ||
                        (result.alternativeScenarios &&
                            result.alternativeScenarios.length > 0)) && (
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Secondary Platform */}
                            {result.secondary && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <TrendingUp className="h-5 w-5 text-blue-500" />
                                            İkinci Sırada
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            {result.secondary.platform.logo && (
                                                <img
                                                    src={
                                                        result.secondary
                                                            .platform.logo
                                                    }
                                                    alt={
                                                        result.secondary
                                                            .platform.name
                                                    }
                                                    className="h-10 w-auto dark:hidden"
                                                />
                                            )}
                                            {result.secondary.platform
                                                .dark_logo && (
                                                <img
                                                    src={
                                                        result.secondary
                                                            .platform.dark_logo
                                                    }
                                                    alt={
                                                        result.secondary
                                                            .platform.name
                                                    }
                                                    className="hidden h-10 w-auto dark:block"
                                                />
                                            )}
                                            <div>
                                                <div className="font-bold text-gray-900 dark:text-white">
                                                    {
                                                        result.secondary
                                                            .platform.name
                                                    }
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    %{result.secondary.score}{' '}
                                                    Eşleşme
                                                </div>
                                            </div>
                                        </div>
                                        {result.secondary.recommendedPlan && (
                                            <div className="text-sm text-muted-foreground">
                                                Önerilen Plan:{' '}
                                                {
                                                    result.secondary
                                                        .recommendedPlan.name
                                                }{' '}
                                                - $
                                                {
                                                    result.secondary
                                                        .recommendedPlan
                                                        .monthlyPrice
                                                }
                                                /
                                                {result.secondary
                                                    .recommendedPlan
                                                    .currency === 'USD'
                                                    ? 'ay'
                                                    : result.secondary
                                                          .recommendedPlan
                                                          .currency}
                                            </div>
                                        )}
                                        {result.secondary.reasons &&
                                            result.secondary.reasons.length >
                                                0 && (
                                                <div className="space-y-2">
                                                    <p className="text-sm font-semibold">
                                                        Nedenler:
                                                    </p>
                                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                                        {result.secondary.reasons
                                                            .slice(0, 2)
                                                            .map(
                                                                (
                                                                    reason,
                                                                    index,
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="flex items-start gap-2"
                                                                    >
                                                                        <span className="mt-1.5 h-1 w-1 rounded-full bg-blue-500"></span>
                                                                        <span>
                                                                            {
                                                                                reason
                                                                            }
                                                                        </span>
                                                                    </li>
                                                                ),
                                                            )}
                                                    </ul>
                                                </div>
                                            )}
                                        {result.secondary.criticalGaps &&
                                            result.secondary.criticalGaps
                                                .length > 0 && (
                                                <div className="flex items-start gap-1 border-t pt-2 text-xs text-red-500">
                                                    <AlertTriangle className="mt-0.5 h-3 w-3 flex-shrink-0" />
                                                    <div>
                                                        <p className="mb-1 font-semibold">
                                                            Kritik Eksiklikler:
                                                        </p>
                                                        <ul className="space-y-1">
                                                            {result.secondary.criticalGaps.map(
                                                                (
                                                                    gap,
                                                                    index,
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        • {gap}
                                                                    </li>
                                                                ),
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                    </CardContent>
                                </Card>
                            )}

                            {/* Alternative Scenarios */}
                            {result.alternativeScenarios &&
                                result.alternativeScenarios.length > 0 && (
                                    <Card className="relative overflow-hidden">
                                        <div className="absolute -top-4 -right-4 -z-10 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl dark:bg-purple-900/20" />
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <Lightbulb className="h-5 w-5 text-purple-500" />
                                                Alternatif Senaryolar
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {result.alternativeScenarios.map(
                                                (scenario, index) => (
                                                    <div
                                                        key={index}
                                                        className="rounded-lg border border-purple-200 bg-purple-50/50 p-4 dark:border-purple-800 dark:bg-purple-900/10"
                                                    >
                                                        <h4 className="mb-2 text-sm font-semibold text-purple-900 dark:text-purple-100">
                                                            {scenario.scenario}
                                                        </h4>
                                                        <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
                                                            {scenario.impact}
                                                        </p>
                                                        {scenario.newRecommendation && (
                                                            <div className="flex items-center justify-between border-t border-purple-200 pt-2 dark:border-purple-800">
                                                                <div className="flex items-center gap-2">
                                                                    {scenario
                                                                        .newRecommendation
                                                                        .platform
                                                                        .logo && (
                                                                        <img
                                                                            src={
                                                                                scenario
                                                                                    .newRecommendation
                                                                                    .platform
                                                                                    .logo
                                                                            }
                                                                            alt={
                                                                                scenario
                                                                                    .newRecommendation
                                                                                    .platform
                                                                                    .name
                                                                            }
                                                                            className="h-6 w-auto dark:hidden"
                                                                        />
                                                                    )}
                                                                    {scenario
                                                                        .newRecommendation
                                                                        .platform
                                                                        .dark_logo && (
                                                                        <img
                                                                            src={
                                                                                scenario
                                                                                    .newRecommendation
                                                                                    .platform
                                                                                    .dark_logo
                                                                            }
                                                                            alt={
                                                                                scenario
                                                                                    .newRecommendation
                                                                                    .platform
                                                                                    .name
                                                                            }
                                                                            className="hidden h-6 w-auto dark:block"
                                                                        />
                                                                    )}
                                                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                                        {
                                                                            scenario
                                                                                .newRecommendation
                                                                                .platform
                                                                                .name
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <ArrowRight className="h-4 w-4 text-purple-500" />
                                                            </div>
                                                        )}
                                                    </div>
                                                ),
                                            )}
                                        </CardContent>
                                    </Card>
                                )}
                        </div>
                    )}

                    {/* Insights Section */}
                    {result.insights && (
                        <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-900/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl text-blue-900 dark:text-blue-100">
                                    <Lightbulb className="h-5 w-5" />
                                    Öngörüler ve Öneriler
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {result.insights.strengths &&
                                    result.insights.strengths.length > 0 && (
                                        <div>
                                            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-green-800 dark:text-green-300">
                                                <Check className="h-4 w-4" />
                                                Güçlü Yönler
                                            </h4>
                                            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                                {result.insights.strengths.map(
                                                    (strength, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-start gap-2"
                                                        >
                                                            <span className="mt-1.5 h-1 w-1 rounded-full bg-green-500"></span>
                                                            <span>
                                                                {strength}
                                                            </span>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                {result.insights.considerations &&
                                    result.insights.considerations.length >
                                        0 && (
                                        <div>
                                            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-yellow-800 dark:text-yellow-300">
                                                <AlertTriangle className="h-4 w-4" />
                                                Dikkat Edilmesi Gerekenler
                                            </h4>
                                            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                                {result.insights.considerations.map(
                                                    (consideration, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-start gap-2"
                                                        >
                                                            <span className="mt-1.5 h-1 w-1 rounded-full bg-yellow-500"></span>
                                                            <span>
                                                                {consideration}
                                                            </span>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                {result.insights.nextSteps &&
                                    result.insights.nextSteps.length > 0 && (
                                        <div>
                                            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-800 dark:text-blue-300">
                                                <ArrowRight className="h-4 w-4" />
                                                Sonraki Adımlar
                                            </h4>
                                            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                                {result.insights.nextSteps.map(
                                                    (step, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-start gap-2"
                                                        >
                                                            <span className="mt-1.5 h-1 w-1 rounded-full bg-blue-500"></span>
                                                            <span>{step}</span>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                        <Button asChild className="flex-1">
                            <Link href={`/platforms/${primary.platform.slug}`}>
                                Detaylı Karşılaştır
                            </Link>
                        </Button>
                        <Button variant="outline" asChild className="flex-1">
                            <Link href={`/wizard/analyses/${analysis.id}/pdf`}>
                                <FileDown className="mr-2 h-4 w-4" />
                                Sonucu PDF Olarak Al
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.visit('/wizard')}
                            className="flex-1"
                        >
                            <ArrowRight className="mr-2 h-4 w-4" />
                            Yeni Wizard Başlat
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
