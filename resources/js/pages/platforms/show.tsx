import LandingLayout from '@/layouts/LandingLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { Platform, Plan } from '@/types';
import PlatformHeader from './sections/PlatformHeader';
import PlansSection from './sections/PlansSection';
import CapabilitiesSection from './sections/CapabilitiesSection';
import FeaturesSection from './sections/FeaturesSection';
import CommentsSection from './sections/CommentsSection';
import { ChevronLeft, Info, Star, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PaginatedComments {
    data: Array<{
        id: number;
        user_id: number;
        platform_id: number;
        comment: string;
        rating: number;
        status: boolean;
        created_at: string;
        updated_at: string;
        user: {
            id: number;
            name: string;
            email: string;
            profile_photo_url?: string;
        };
    }>;
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface PageProps extends Record<string, unknown> {
    platform: Platform;
    plans: Plan[];
    comments: PaginatedComments;
}

export default function PlatformShow() {
    const { platform, plans, comments } = usePage<PageProps>().props;

    const averageRating = comments.data.length > 0
        ? (comments.data.reduce((acc, c) => acc + Number(c.rating), 0) / comments.data.length).toFixed(1)
        : '0.0';

    return (
        <LandingLayout>
            <Head title={`${platform.name} - KobiStart`} />

            {/* Breadcrumb / Back Navigation */}
            <div className="bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900">
                <div className="container mx-auto px-4 py-3">
                    <Link
                        href="/platforms"
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Platformlar
                    </Link>
                </div>
            </div>

            <PlatformHeader platform={platform} />

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content Area (8/12) */}
                    <div className="lg:col-span-8 space-y-16">
                        <section id="plans">
                        <PlansSection plans={plans} platform={platform} />
                        </section>

                        <section id="features">
                        <FeaturesSection plans={plans} />
                        </section>

                        <section id="comments">
                        <CommentsSection platform={platform} comments={comments} />
                        </section>
                    </div>

                    {/* Sidebar Area (4/12) */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="sticky top-24 space-y-8">
                            {/* Stats Card */}
                            <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                                <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
                                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                                        <Info className="h-4 w-4 text-blue-600" />
                                        Platform Özeti
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                        <div className="p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                Ortalama Puan
                                            </div>
                                            <span className="font-bold text-zinc-900 dark:text-zinc-50">{averageRating} / 5.0</span>
                                        </div>
                                        <div className="p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                                <Users className="h-4 w-4 text-blue-500" />
                                                Toplam Değerlendirme
                                            </div>
                                            <span className="font-bold text-zinc-900 dark:text-zinc-50">{comments.total}</span>
                                        </div>
                                        <div className="p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                                <div className="h-4 w-4 rounded-full bg-green-500/20 flex items-center justify-center">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
                                                </div>
                                                Durum
                                            </div>
                                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                                                Aktif
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                        <CapabilitiesSection />

                            {/* Help Card */}
                            <Card className="bg-blue-600 border-none shadow-lg shadow-blue-500/20 text-white">
                                <CardContent className="p-6 space-y-4">
                                    <h3 className="font-bold text-lg">Yardıma mı ihtiyacınız var?</h3>
                                    <p className="text-blue-100 text-sm leading-relaxed">
                                        {platform.name} veya diğer platformlar hakkında merak ettiklerinizi uzman ekibimize sorabilirsiniz.
                                    </p>
                                    <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-blue-50">
                                        Danışmanla Görüş
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
