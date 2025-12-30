import { GlassCard } from '@/components/ui/glass-card';
import { Check, Sparkles } from 'lucide-react';
import { Plan } from '@/types';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

interface PlansSectionProps {
    plans: Plan[];
}

export default function PlansSection({ plans }: PlansSectionProps) {
    if (!plans || plans.length === 0) {
        return (
            <section className="py-20 bg-slate-50 dark:bg-transparent">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Bu platform için henüz paket bilgisi bulunmamaktadır.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-slate-50 dark:bg-transparent">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 backdrop-blur-sm">
                        <Sparkles className="h-4 w-4 fill-blue-500/20" />
                        Paket Seçenekleri
                    </div>
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                        Mevcut Paketler
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                        Platformun sunduğu tüm paket seçeneklerini inceleyin ve ihtiyacınıza en uygun olanı seçin.
                    </p>
                </div>

                <div className="relative px-8 md:px-12">
                    <Carousel
                        opts={{
                            align: "start",
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {plans.map((plan, index) => (
                                <CarouselItem key={plan.id} className="pl-4 basis-1/3 min-w-0">
                                    <GlassCard
                                        className="border-slate-200 bg-white dark:border-white/10 dark:bg-transparent hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-8 duration-1000"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="flex flex-col h-full">
                                            {/* Plan Name */}
                                            <div className="mb-4">
                                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                                    {plan.name}
                                                </h3>
                                                <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full" />
                                            </div>

                                            {/* Plan Features Placeholder */}
                                            <div className="flex-1 mb-6">
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                                        <Check className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                                                        <span>Detaylı bilgi için platformu ziyaret edin</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Plan Status */}
                                            <div className="pt-4 border-t border-gray-200/50 dark:border-white/10">
                                                <div className="flex items-center justify-between">
                                                    <span className={plan.status
                                                        ? "text-sm font-semibold text-green-600 dark:text-green-400"
                                                        : "text-sm font-semibold text-gray-400 dark:text-gray-500"
                                                    }>
                                                        {plan.status ? 'Aktif' : 'Pasif'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-0 md:-left-12" />
                        <CarouselNext className="right-0 md:-right-12" />
                    </Carousel>
                </div>
            </div>
        </section>
    );
}

