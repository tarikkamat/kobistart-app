import LandingLayout from '@/layouts/LandingLayout';
import { Head, Link } from '@inertiajs/react';

interface Campaign {
    id: number;
    title: string;
    description: string;
    longDescription?: string;
    image: string;
    category: string;
    validUntil: string;
    discount: string;
    terms?: string[];
}

interface Props {
    campaign: Campaign;
}

export default function CampaignShow({ campaign }: Props) {
    return (
        <LandingLayout>
            <Head title={`${campaign.title} - Kampanyalar`} />

            <div className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden min-h-screen">
                {/* Background Decorations */}
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary-500/10 dark:bg-primary-500/20 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[120px] -z-10" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                    {/* Back Button */}
                    <div className="mb-8">
                        <Link
                            href="/kampanyalar"
                            className="inline-flex items-center gap-2 text-gray-500 dark:text-indigo-200/60 hover:text-indigo-600 dark:hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Tüm Kampanyalar
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                        {/* Image Side */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/20 order-2 lg:order-1">
                            <img
                                src={campaign.image}
                                alt={campaign.title}
                                className="w-full h-auto object-cover min-h-[400px]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />

                            <div className="absolute bottom-6 left-6 right-6 lg:hidden">
                                <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-600/90 backdrop-blur-md text-white font-bold text-sm mb-2 shadow-lg">
                                    {campaign.category}
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="order-1 lg:order-2 space-y-8">
                            <div>
                                <div className="hidden lg:inline-block px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-200 font-bold text-sm mb-4 border border-indigo-200 dark:border-indigo-500/30">
                                    {campaign.category}
                                </div>

                                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                                    {campaign.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-100/50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-semibold">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        {campaign.discount}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500 dark:text-indigo-200/60">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Son: {campaign.validUntil}
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-indigo-100/80">
                                <p className="text-xl leading-relaxed">
                                    {campaign.description}
                                </p>
                                {campaign.longDescription && (
                                    <p className="mt-4">
                                        {campaign.longDescription}
                                    </p>
                                )}
                            </div>

                            {/* Terms */}
                            {campaign.terms && (
                                <div className="bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Kampanya Şartları
                                    </h3>
                                    <ul className="space-y-3">
                                        {campaign.terms.map((term, index) => (
                                            <li key={index} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                                                {term}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* CTA */}
                            <div className="pt-4">
                                <button className="w-full md:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all duration-300">
                                    Hemen Başvur
                                </button>
                                <p className="mt-3 text-xs text-center md:text-left text-gray-400 dark:text-gray-500">
                                    Başvuru süreci 24 saat içinde tamamlanır.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
