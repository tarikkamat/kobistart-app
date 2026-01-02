import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LandingLayout from '@/layouts/LandingLayout';
import { Plan, Platform } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronLeft, Info, Star, Users } from 'lucide-react';
import CapabilitiesSection from './sections/CapabilitiesSection';
import CommentsSection from './sections/CommentsSection';
import FeaturesSection from './sections/FeaturesSection';
import PlansSection from './sections/PlansSection';
import PlatformHeader from './sections/PlatformHeader';

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

    const averageRating =
        comments.data.length > 0
            ? (
                  comments.data.reduce((acc, c) => acc + Number(c.rating), 0) /
                  comments.data.length
              ).toFixed(1)
            : '0.0';

    return (
        <LandingLayout>
            <Head title={`${platform.name} - KobiStart`} />

            {/* Breadcrumb / Back Navigation */}
            <div className="border-b border-zinc-100 bg-white dark:border-zinc-900 dark:bg-zinc-950">
                <div className="container mx-auto px-4 py-3">
                    <Link
                        href="/platforms"
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Platformlar
                    </Link>
                </div>
            </div>

            <PlatformHeader platform={platform} />

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* Main Content Area (8/12) */}
                    <div className="space-y-16 lg:col-span-8">
                        <section id="plans">
                            <PlansSection plans={plans} platform={platform} />
                        </section>

                        <section id="features">
                            <FeaturesSection plans={plans} />
                        </section>

                        <section id="comments">
                            <CommentsSection
                                platform={platform}
                                comments={comments}
                            />
                        </section>
                    </div>

                    {/* Sidebar Area (4/12) */}
                    <div className="space-y-8 lg:col-span-4">
                        <div className="sticky top-24 space-y-8">
                            {/* Stats Card */}
                            <Card className="overflow-hidden border-zinc-200 shadow-sm dark:border-zinc-800">
                                <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/50">
                                    <CardTitle className="flex items-center gap-2 text-base font-semibold">
                                        <Info className="h-4 w-4 text-blue-600" />
                                        Platform Özeti
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                        <div className="flex items-center justify-between p-4">
                                            <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                                Ortalama Puan
                                            </div>
                                            <span className="font-bold text-zinc-900 dark:text-zinc-50">
                                                {averageRating} / 5.0
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between p-4">
                                            <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                                <Users className="h-4 w-4 text-blue-500" />
                                                Toplam Değerlendirme
                                            </div>
                                            <span className="font-bold text-zinc-900 dark:text-zinc-50">
                                                {comments.total}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between p-4">
                                            <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500/20">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
                                                </div>
                                                Durum
                                            </div>
                                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                Aktif
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <CapabilitiesSection />

                            {/* Help Card */}
                            <Card className="border-none bg-blue-600 text-white shadow-lg shadow-blue-500/20">
                                <CardContent className="space-y-4 p-6">
                                    <h3 className="text-lg font-bold">
                                        Yardıma mı ihtiyacınız var?
                                    </h3>
                                    <p className="text-sm leading-relaxed text-blue-100">
                                        {platform.name} veya diğer platformlar
                                        hakkında merak ettiklerinizi uzman
                                        ekibimize sorabilirsiniz.
                                    </p>
                                    <Button
                                        variant="secondary"
                                        className="w-full bg-white text-blue-600 hover:bg-blue-50"
                                    >
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
