import { Check, Zap } from 'lucide-react';
import { Plan, Platform } from '@/types';
import { Link } from '@inertiajs/react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'; // Helper function to format price with dynamic currency

// Helper function to format price with dynamic currency
const formatPrice = (price: number, currency: string = 'TRY'): string => {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};

// Helper function to get period label
const getPeriodLabel = (period: string): string => {
    const labels: Record<string, string> = {
        monthly: 'Aylık',
        yearly: 'Yıllık',
        two_yearly: '2 Yıllık',
    };
    return labels[period] || period;
};

// Helper function to get period label with pricing context
const getPeriodLabelWithContext = (
    period: string,
    isMonthlyPayment: boolean = false,
): string => {
    if (period === 'monthly') {
        return 'Aylık';
    }

    if (isMonthlyPayment) {
        const labels: Record<string, string> = {
            yearly: 'Yıllık (Aylık Ödeme)',
            two_yearly: '2 Yıllık (Aylık Ödeme)',
        };
        return labels[period] || period;
    }

    const labels: Record<string, string> = {
        yearly: 'Yıllık',
        two_yearly: '2 Yıllık',
    };
    return labels[period] || period;
};

// Helper function to get best price for a plan
const getBestPrice = (plan: Plan) => {
    // Support both camelCase and snake_case from backend
    const prices = plan.planPrices || (plan as any).plan_prices || [];

    if (!prices || prices.length === 0) {
        return null;
    }

    // Find the price with discount, or the lowest original price
    const withDiscount = prices.find((p: any) => p.discounted_price !== null);
    if (withDiscount) {
        return {
            period: withDiscount.period,
            price: withDiscount.discounted_price!,
            originalPrice: withDiscount.original_price,
            hasDiscount: true,
            currency: withDiscount.currency || 'TRY',
        };
    }

    // If no discount, find the lowest original price
    const lowestPrice = prices.reduce((min: any, p: any) =>
        p.original_price < min.original_price ? p : min,
    );

    return {
        period: lowestPrice.period,
        price: lowestPrice.original_price,
        originalPrice: null,
        hasDiscount: false,
        currency: lowestPrice.currency || 'TRY',
    };
};

interface PlansSectionProps {
    plans: Plan[];
    platform: Platform;
}

export default function PlansSection({ plans, platform }: PlansSectionProps) {
    if (!plans || plans.length === 0) {
        return (
            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
                <p className="text-lg text-zinc-500 dark:text-zinc-400">
                    Bu platform için henüz paket bilgisi bulunmamaktadır.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold tracking-wider text-blue-600 uppercase dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        <Zap className="h-3.5 w-3.5 fill-blue-600/20" />
                        Abonelik Planları
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Size Uygun Paketi Seçin
                    </h2>
                    <p className="max-w-xl text-zinc-500 dark:text-zinc-400">
                        İhtiyaçlarınıza en uygun özelliklere sahip paketi
                        seçerek hemen başlayın.
                    </p>
                </div>
            </div>

            <div className="relative">
                <Carousel
                    opts={{
                        align: 'start',
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-6">
                        {plans.map((plan, index) => (
                            <CarouselItem
                                key={plan.id}
                                className="basis-full pl-6 md:basis-1/2 xl:basis-1/3"
                            >
                                <div className="group relative h-full">
                                    <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 blur transition duration-500 group-hover:opacity-10"></div>
                                    <div className="relative flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                                        <div className="mb-8">
                                            <h3 className="mb-1 text-xl font-bold text-zinc-900 dark:text-zinc-50">
                                                {plan.name}
                                            </h3>
                                            <div className="mb-4 h-1 w-8 rounded-full bg-blue-600" />

                                            {/* Price Display */}
                                            {(() => {
                                                const prices =
                                                    plan.planPrices ||
                                                    (plan as any).plan_prices ||
                                                    [];
                                                const bestPrice =
                                                    getBestPrice(plan);
                                                if (!bestPrice) {
                                                    return (
                                                        <div className="text-sm text-zinc-500 dark:text-zinc-400">
                                                            Fiyat bilgisi mevcut
                                                            değil
                                                        </div>
                                                    );
                                                }

                                                return (
                                                    <div className="space-y-2">
                                                        <div className="flex items-baseline gap-2">
                                                            <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                                                                {formatPrice(
                                                                    bestPrice.price,
                                                                    bestPrice.currency,
                                                                )}
                                                            </span>
                                                            <span className="text-sm text-zinc-500 dark:text-zinc-400">
                                                                /{' '}
                                                                {getPeriodLabel(
                                                                    bestPrice.period,
                                                                )}
                                                            </span>
                                                        </div>
                                                        {bestPrice.hasDiscount &&
                                                            bestPrice.originalPrice && (
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-sm text-zinc-400 line-through dark:text-zinc-500">
                                                                        {formatPrice(
                                                                            bestPrice.originalPrice,
                                                                            bestPrice.currency,
                                                                        )}
                                                                    </span>
                                                                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                                        İndirimli
                                                                    </span>
                                                                </div>
                                                            )}
                                                        {prices.length > 1 && (
                                                            <Popover>
                                                                <PopoverTrigger
                                                                    asChild
                                                                >
                                                                    <button className="mt-2 cursor-pointer text-xs text-zinc-500 underline underline-offset-2 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400">
                                                                        {
                                                                            prices.length
                                                                        }{' '}
                                                                        farklı
                                                                        ödeme
                                                                        seçeneği
                                                                    </button>
                                                                </PopoverTrigger>
                                                                <PopoverContent
                                                                    className="w-80 p-0"
                                                                    align="start"
                                                                >
                                                                    <div className="p-4">
                                                                        <h4 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                                                            Tüm
                                                                            Ödeme
                                                                            Seçenekleri
                                                                        </h4>
                                                                        <div className="space-y-3">
                                                                            {prices.map(
                                                                                (
                                                                                    price: any,
                                                                                ) => {
                                                                                    const currency =
                                                                                        price.currency ||
                                                                                        'TRY';
                                                                                    const displayPrice =
                                                                                        price.discounted_price ??
                                                                                        price.original_price;
                                                                                    const hasDiscount =
                                                                                        price.discounted_price !==
                                                                                        null;
                                                                                    const isMonthlyPayment =
                                                                                        price.is_monthly_payment ??
                                                                                        false;

                                                                                    return (
                                                                                        <div
                                                                                            key={
                                                                                                price.id
                                                                                            }
                                                                                            className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800/50"
                                                                                        >
                                                                                            <div className="flex flex-col">
                                                                                                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                                                                                                    {getPeriodLabelWithContext(
                                                                                                        price.period,
                                                                                                        isMonthlyPayment,
                                                                                                    )}
                                                                                                </span>
                                                                                                {hasDiscount && (
                                                                                                    <span className="mt-0.5 text-xs text-zinc-400 line-through dark:text-zinc-500">
                                                                                                        {formatPrice(
                                                                                                            price.original_price,
                                                                                                            currency,
                                                                                                        )}
                                                                                                        {isMonthlyPayment &&
                                                                                                            price.period !==
                                                                                                                'monthly' &&
                                                                                                            ' / ay'}
                                                                                                    </span>
                                                                                                )}
                                                                                                {!hasDiscount &&
                                                                                                    isMonthlyPayment &&
                                                                                                    price.period !==
                                                                                                        'monthly' && (
                                                                                                        <span className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                                                                                                            Aylık
                                                                                                            ödeme
                                                                                                        </span>
                                                                                                    )}
                                                                                            </div>
                                                                                            <div className="flex flex-col items-end">
                                                                                                <span className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                                                                                                    {formatPrice(
                                                                                                        displayPrice,
                                                                                                        currency,
                                                                                                    )}
                                                                                                    {isMonthlyPayment &&
                                                                                                        price.period !==
                                                                                                            'monthly' && (
                                                                                                            <span className="ml-1 text-xs font-normal text-zinc-500 dark:text-zinc-400">
                                                                                                                /
                                                                                                                ay
                                                                                                            </span>
                                                                                                        )}
                                                                                                </span>
                                                                                                {hasDiscount && (
                                                                                                    <span className="mt-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                                                                        İndirimli
                                                                                                    </span>
                                                                                                )}
                                                                                            </div>
                                                                                        </div>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </PopoverContent>
                                                            </Popover>
                                                        )}
                                                    </div>
                                                );
                                            })()}
                                        </div>

                                        <div className="mb-8 flex-1 space-y-4">
                                            {(() => {
                                                const planFeatures =
                                                    plan.features || [];
                                                const displayedFeatures =
                                                    planFeatures
                                                        .filter(
                                                            (pf) =>
                                                                pf.is_included &&
                                                                pf.feature,
                                                        )
                                                        .slice(0, 5); // İlk 5 özelliği göster

                                                if (
                                                    displayedFeatures.length ===
                                                    0
                                                ) {
                                                    return (
                                                        <div className="space-y-3">
                                                            <div className="flex items-start gap-3">
                                                                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                                                                    <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                                                                </div>
                                                                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                                                    Tüm temel
                                                                    özellikler
                                                                </span>
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                return (
                                                    <div className="space-y-3">
                                                        {displayedFeatures.map(
                                                            (pf) => {
                                                                const displayName =
                                                                    pf.platform_label ||
                                                                    pf.feature
                                                                        ?.name ||
                                                                    'Özellik';
                                                                return (
                                                                    <div
                                                                        key={
                                                                            pf.id
                                                                        }
                                                                        className="flex items-start gap-3"
                                                                    >
                                                                        <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                                                                            <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                                                                        </div>
                                                                        <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                                                            {
                                                                                displayName
                                                                            }
                                                                            {pf.value &&
                                                                                pf.value !==
                                                                                    'true' &&
                                                                                pf.value !==
                                                                                    'false' && (
                                                                                    <span className="ml-1 text-xs text-zinc-500 dark:text-zinc-500">
                                                                                        (
                                                                                        {
                                                                                            pf.value
                                                                                        }

                                                                                        )
                                                                                    </span>
                                                                                )}
                                                                        </span>
                                                                    </div>
                                                                );
                                                            },
                                                        )}
                                                        {planFeatures.length >
                                                            5 && (
                                                            <div className="pt-2">
                                                                <span className="text-xs text-zinc-500 italic dark:text-zinc-400">
                                                                    +
                                                                    {planFeatures.length -
                                                                        5}{' '}
                                                                    özellik daha
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })()}
                                        </div>

                                        <Button
                                            asChild
                                            className="w-full rounded-2xl bg-zinc-900 text-white transition-colors hover:bg-blue-600 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-blue-500 dark:hover:text-white"
                                        >
                                            <Link
                                                href={`/platforms/${platform.slug}/${plan.slug}`}
                                            >
                                                Detayları Gör
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="hidden md:block">
                        <CarouselPrevious className="-left-4 border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900" />
                        <CarouselNext className="-right-4 border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900" />
                    </div>
                </Carousel>
            </div>
        </div>
    );
}
