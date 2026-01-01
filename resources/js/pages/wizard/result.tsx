import { Head, Link, router } from '@inertiajs/react';
import LandingLayout from '@/layouts/LandingLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, AlertTriangle, FileDown, RotateCcw } from 'lucide-react';
import { Platform } from '@/types';
import wizardRoutes from '@/routes/wizard';

// Mock platform data
const mockPlatform: Platform = {
    id: 1,
    name: 'Shopify',
    description: 'Shopify, dünyanın en popüler e-ticaret platformlarından biridir. Kolay kullanımı ve güçlü özellikleri ile küçük işletmelerden büyük kurumsal şirketlere kadar her kesime hitap eder.',
    slug: 'shopify',
    url: 'https://www.shopify.com',
    logo: '/images/shopify-logo-black.png',
    dark_logo: '/images/shopify-logo-white.png',
    favicon: null,
    status: true,
    order: 1,
    color: '#95BF47',
    is_local: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
};

interface ResultData {
    platform: Platform;
    score: number;
    confidence: 'high' | 'medium' | 'low';
    reasons: string[];
    warnings: string[];
}

const mockResult: ResultData = {
    platform: mockPlatform,
    score: 87,
    confidence: 'high',
    reasons: [
        'Seçtiğiniz özelliklerin %90\'ı ile uyumlu',
        'Bütçenize uygun fiyatlandırma seçenekleri',
        'İhtiyacınız olan teknik gereksinimleri karşılıyor',
        'Sektörünüz için optimize edilmiş çözümler',
    ],
    warnings: [
        'Başlangıç kurulumu için ekstra zaman ayırmanız gerekebilir',
    ],
};

// Circular Progress Component
function CircularProgress({ score }: { score: number }) {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg
                className="transform -rotate-90"
                width="120"
                height="120"
            >
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

function ConfidenceBadge({ confidence }: { confidence: 'high' | 'medium' | 'low' }) {
    const config = {
        high: { label: 'Yüksek', variant: 'default' as const, className: 'bg-green-500 text-white' },
        medium: { label: 'Orta', variant: 'secondary' as const, className: 'bg-yellow-500 text-white' },
        low: { label: 'Düşük', variant: 'outline' as const, className: 'bg-orange-500 text-white' },
    };

    const { label, className } = config[confidence];

    return (
        <Badge className={className}>
            {label} Güven
        </Badge>
    );
}

export default function WizardResult() {
    const result = mockResult;

    return (
        <LandingLayout>
            <Head title="Wizard Sonucu - Platform Önerisi" />
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold">Platform Önerisi</h1>
                        <p className="text-muted-foreground">
                            Size özel analiz sonucu hazırlandı
                        </p>
                    </div>

                    {/* Platform Card */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    {result.platform.logo && (
                                        <img
                                            src={result.platform.logo}
                                            alt={result.platform.name}
                                            className="h-16 w-auto dark:hidden"
                                        />
                                    )}
                                    {result.platform.dark_logo && (
                                        <img
                                            src={result.platform.dark_logo}
                                            alt={result.platform.name}
                                            className="h-16 w-auto hidden dark:block"
                                        />
                                    )}
                                    <div>
                                        <CardTitle className="text-2xl">
                                            {result.platform.name}
                                        </CardTitle>
                                        <p className="text-muted-foreground mt-1">
                                            {result.platform.description}
                                        </p>
                                    </div>
                                </div>
                                <ConfidenceBadge confidence={result.confidence} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-center gap-8 py-4">
                                <CircularProgress score={result.score} />
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">
                                        Toplam Uyum Skoru
                                    </p>
                                    <p className="text-lg font-semibold">
                                        {result.score}/100
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Reasons Section */}
                    {result.reasons.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500" />
                                    Neden Bu Platform?
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {result.reasons.map((reason, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span>{reason}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    )}

                    {/* Warnings Section */}
                    {result.warnings.length > 0 && (
                        <Card className="border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-950/20">
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center gap-2 text-yellow-900 dark:text-yellow-100">
                                    <AlertTriangle className="h-5 w-5" />
                                    Dikkat Edilmesi Gerekenler
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {result.warnings.map((warning, index) => (
                                        <li key={index} className="flex items-start gap-3 text-yellow-800 dark:text-yellow-200">
                                            <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                            <span>{warning}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button asChild className="flex-1">
                            <Link href={`/platforms/${result.platform.slug}`}>
                                Detaylı Karşılaştır
                            </Link>
                        </Button>
                        <Button variant="outline" disabled className="flex-1">
                            <FileDown className="h-4 w-4 mr-2" />
                            Sonucu PDF Olarak Al
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.visit(wizardRoutes.index.url())}
                            className="flex-1"
                        >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Yeni Wizard Başlat
                        </Button>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}

