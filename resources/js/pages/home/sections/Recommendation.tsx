import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { AlertCircle, ArrowRight, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

export default function Recommendation() {
    return (
        <section className="relative py-20 overflow-hidden">
            <div className="absolute right-0 top-1/2 -z-10 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-blue-100/50 blur-[120px] dark:bg-blue-900/10" />

            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-900/30 dark:text-blue-300">
                        <Zap className="h-3 w-3 fill-current" />
                        KobiStart Farkı
                    </div>
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                        Sadece <span className="italic">ne</span> olduğunu değil, <span className="italic">neden</span> olduğunu görün.
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                        Bir platformun neden sizin özel kısıtlamalarınıza uyduğunu tam olarak vurguluyoruz.
                    </p>
                </div>

                <div className="mx-auto max-w-5xl">
                    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
                        {/* Main Recommendation */}
                        <GlassCard className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-900/20">
                            <div className="mb-6 flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-200 text-white shadow-xl dark:bg-white dark:text-black">
                                        <img
                                            src="/images/platforms/woocommerce-logo.svg"
                                            alt="WooCommerce"
                                            className="h-8 w-8 object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">WooCommerce</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="flex items-center rounded-md bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                                ★ %92 Eşleşme
                                            </span>
                                            <span className="text-sm text-gray-500">Teknik Kullanıcılar İçin En İyisi</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden text-right sm:block">
                                    <div className="text-sm font-medium text-gray-500">Tahmini Maliyet</div>
                                    <div className="text-xl font-bold text-gray-900 dark:text-white">$25<span className="text-sm font-normal text-gray-500">/ay</span></div>
                                </div>
                            </div>

                            <div className="mb-8 grid gap-4">
                                <div className="rounded-xl border border-green-200 bg-green-50/50 p-4 dark:border-green-900/50 dark:bg-green-900/10">
                                    <h4 className="flex items-center gap-2 font-semibold text-green-800 dark:text-green-300">
                                        <CheckCircle2 className="h-4 w-4" />
                                        Neden size uygun?
                                    </h4>
                                    <ul className="mt-2 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1 w-1 rounded-full bg-green-500"></span>
                                            Zaten WordPress barındırma hizmetiniz var, bu da ayda yaklaşık 30$ tasarruf sağlar.
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1 w-1 rounded-full bg-green-500"></span>
                                            Tam kod özelleştirme erişimi talep ettiniz.
                                        </li>
                                    </ul>
                                </div>

                                <div className="rounded-xl border border-yellow-200 bg-yellow-50/50 p-4 dark:border-yellow-900/50 dark:bg-yellow-900/10">
                                    <h4 className="flex items-center gap-2 font-semibold text-yellow-800 dark:text-yellow-300">
                                        <AlertCircle className="h-4 w-4" />
                                        Dikkat edilmesi gerekenler
                                    </h4>
                                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                        Manuel güvenlik güncellemeleri gerektirir. Teknik becerilerinizi "Orta" olarak işaretlediğiniz için bir bakım eklentisi kullanmayı düşünün.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-gray-200 pt-6 dark:border-white/10">
                                <Button variant="link" className="px-0 text-blue-600 dark:text-blue-400">
                                    Tam Analizi Görüntüle
                                </Button>
                                <Button className="bg-gray-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200">
                                    Platform Seç
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                        </GlassCard>

                        {/* Comparative Insight & Next Best */}
                        <div className="flex flex-col gap-6">
                            <GlassCard className="relative overflow-hidden">
                                <div className="absolute -right-4 -top-4 -z-10 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl dark:bg-purple-900/20" />

                                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                                    Ya Şöyle Olsaydı?
                                </h4>
                                <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                                    Bütçenizi <strong className="text-gray-900 dark:text-white">aylık 50$</strong>'a çıkarırsanız, daha iyi entegre ödemeler nedeniyle <strong className="text-blue-600 dark:text-blue-400">Shopify</strong> 1 numaralı tercih haline gelir.
                                </p>
                                <Button variant="outline" size="sm" className="w-full justify-between dark:bg-transparent">
                                    Değişiklikleri Simüle Et <ArrowRight className="h-3 w-3" />
                                </Button>
                            </GlassCard>

                            <GlassCard>
                                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                                    İkinci Sırada
                                </h4>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
                                        B
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900 dark:text-white">BigCommerce</div>
                                        <div className="text-xs text-gray-500">%85 Eşleşme</div>
                                    </div>
                                </div>
                                <div className="mt-3 text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    Kritik entegrasyon eksik: Klaviyo
                                </div>
                            </GlassCard>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
