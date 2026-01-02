import LandingLayout from '@/layouts/LandingLayout';
import { Head, Link } from '@inertiajs/react';

interface Campaign {
    id: number;
    slug: string;
    title: string;
    description: string;
    image: string;
    category: string;
    validUntil: string;
    discount: string;
}

interface Props {
    campaigns: Campaign[];
}

export default function Campaigns({ campaigns }: Props) {
    return (
        <LandingLayout>
            <Head title="Kampanyalar - KobiStart" />

            <div className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
                {/* Background Decorations - Adapted for Light/Dark */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/20 rounded-full blur-[100px] -z-10" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[100px] -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
                                Özel Fırsatlar
                            </span>{' '}
                            ve Kampanyalar
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-indigo-100/80 max-w-2xl mx-auto">
                            İşletmenizi büyütürken bütçenizi koruyan size özel en iyi teklifleri
                            burada bulabilirsiniz.
                        </p>
                    </div>

                    {/* Campaigns Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {campaigns.map((campaign) => (
                            <Link
                                href={`/kampanyalar/${campaign.slug}`}
                                key={campaign.id}
                                className="group relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white dark:hover:bg-white/10 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 block"
                            >
                                <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden">
                                    <img
                                        src={campaign.image}
                                        alt={campaign.title}
                                        className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-indigo-600/90 backdrop-blur-md text-gray-900 dark:text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                        {campaign.category}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                                            {campaign.discount}
                                        </span>
                                        <span className="text-gray-500 dark:text-indigo-200/60 text-xs">
                                            Son: {campaign.validUntil}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                                        {campaign.title}
                                    </h3>

                                    <p className="text-gray-600 dark:text-indigo-100/70 text-sm mb-6 line-clamp-2">
                                        {campaign.description}
                                    </p>

                                    <div className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3">
                                        Detaylı İncele
                                        <svg
                                            className="w-4 h-4 transition-all"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
