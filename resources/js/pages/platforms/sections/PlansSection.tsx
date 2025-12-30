import { GlassCard } from '@/components/ui/glass-card';
import { Check, Sparkles, Zap } from 'lucide-react';
import { Plan } from '@/types';
import type { PlanPrice } from '@/types/platform';
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
} from '@/components/ui/popover';

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
const getPeriodLabelWithContext = (period: string, isMonthlyPayment: boolean = false): string => {
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
    const prices = (plan.planPrices || (plan as any).plan_prices) || [];

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
        p.original_price < min.original_price ? p : min
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
}

export default function PlansSection({ plans }: PlansSectionProps) {
    if (!plans || plans.length === 0) {
        return (
            <div className="rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-12 text-center">
                <p className="text-lg text-zinc-500 dark:text-zinc-400">
                            Bu platform için henüz paket bilgisi bulunmamaktadır.
                        </p>
                    </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-100 dark:border-blue-800">
                        <Zap className="h-3.5 w-3.5 fill-blue-600/20" />
                        Abonelik Planları
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Size Uygun Paketi Seçin
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-xl">
                        İhtiyaçlarınıza en uygun özelliklere sahip paketi seçerek hemen başlayın.
                    </p>
                </div>
                </div>

            <div className="relative">
                    <Carousel
                        opts={{
                            align: "start",
                        }}
                        className="w-full"
                    >
                    <CarouselContent className="-ml-6">
                            {plans.map((plan, index) => (
                            <CarouselItem key={plan.id} className="pl-6 basis-full md:basis-1/2 xl:basis-1/3">
                                <div className="group h-full relative">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-violet-600 rounded-3xl blur opacity-0 group-hover:opacity-10 transition duration-500"></div>
                                    <div className="relative h-full flex flex-col p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300">
                                        <div className="mb-8">
                                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
                                                    {plan.name}
                                                </h3>
                                            <div className="h-1 w-8 bg-blue-600 rounded-full mb-4" />

                                            {/* Price Display */}
                                            {(() => {
                                                const prices = (plan.planPrices || (plan as any).plan_prices) || [];
                                                const bestPrice = getBestPrice(plan);
                                                if (!bestPrice) {
                                                    return (
                                                        <div className="text-sm text-zinc-500 dark:text-zinc-400">
                                                            Fiyat bilgisi mevcut değil
                                                        </div>
                                                    );
                                                }

                                                return (
                                                    <div className="space-y-2">
                                                        <div className="flex items-baseline gap-2">
                                                            <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                                                                {formatPrice(bestPrice.price, bestPrice.currency)}
                                                            </span>
                                                            <span className="text-sm text-zinc-500 dark:text-zinc-400">
                                                                / {getPeriodLabel(bestPrice.period)}
                                                            </span>
                                                        </div>
                                                        {bestPrice.hasDiscount && bestPrice.originalPrice && (
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-sm text-zinc-400 dark:text-zinc-500 line-through">
                                                                    {formatPrice(bestPrice.originalPrice, bestPrice.currency)}
                                                                </span>
                                                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                                                                    İndirimli
                                                                </span>
                                                            </div>
                                                        )}
                                                        {prices.length > 1 && (
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <button className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 hover:text-blue-600 dark:hover:text-blue-400 underline underline-offset-2 cursor-pointer transition-colors">
                                                                        {prices.length} farklı ödeme seçeneği
                                                                    </button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-80 p-0" align="start">
                                                                    <div className="p-4">
                                                                        <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 mb-3">
                                                                            Tüm Ödeme Seçenekleri
                                                                        </h4>
                                                                        <div className="space-y-3">
                                                                            {prices.map((price: any) => {
                                                                                const currency = price.currency || 'TRY';
                                                                                const displayPrice = price.discounted_price ?? price.original_price;
                                                                                const hasDiscount = price.discounted_price !== null;
                                                                                const isMonthlyPayment = price.is_monthly_payment ?? false;

                                                                                return (
                                                                                    <div
                                                                                        key={price.id}
                                                                                        className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700"
                                                                                    >
                                                                                        <div className="flex flex-col">
                                                                                            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                                                                                                {getPeriodLabelWithContext(price.period, isMonthlyPayment)}
                                                                                            </span>
                                                                                            {hasDiscount && (
                                                                                                <span className="text-xs text-zinc-400 dark:text-zinc-500 line-through mt-0.5">
                                                                                                    {formatPrice(price.original_price, currency)}
                                                                                                    {isMonthlyPayment && price.period !== 'monthly' && ' / ay'}
                                                                                                </span>
                                                                                            )}
                                                                                            {!hasDiscount && isMonthlyPayment && price.period !== 'monthly' && (
                                                                                                <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                                                                    Aylık ödeme
                                                                                                </span>
                                                                                            )}
                                                                                        </div>
                                                                                        <div className="flex flex-col items-end">
                                                                                            <span className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                                                                                                {formatPrice(displayPrice, currency)}
                                                                                                {isMonthlyPayment && price.period !== 'monthly' && (
                                                                                                    <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400 ml-1">
                                                                                                        / ay
                                                                                                    </span>
                                                                                                )}
                                                                                            </span>
                                                                                            {hasDiscount && (
                                                                                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 mt-1">
                                                                                                    İndirimli
                                                                                                </span>
                                                                                            )}
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                </PopoverContent>
                                                            </Popover>
                                                        )}
                                                    </div>
                                                );
                                            })()}
                                            </div>

                                        <div className="flex-1 space-y-4 mb-8">
                                                <div className="space-y-3">
                                                <div className="flex items-start gap-3">
                                                    <div className="mt-1 h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                                                    </div>
                                                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Tüm temel özellikler</span>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <div className="mt-1 h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                                                    </div>
                                                    <span className="text-sm text-zinc-600 dark:text-zinc-400">7/24 Teknik destek</span>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <div className="mt-1 h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                                            </div>
                                                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Gelişmiş raporlama</span>
                                                </div>
                                            </div>
                                        </div>

                                        <Button className="w-full rounded-2xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-colors">
                                            Detayları Gör
                                        </Button>
                                    </div>
                                </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    <div className="hidden md:block">
                        <CarouselPrevious className="-left-4 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800" />
                        <CarouselNext className="-right-4 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800" />
                    </div>
                    </Carousel>
                </div>
            </div>
    );
}
