import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { destroy as favoritesDestroy } from '@/routes/favorites/index';
import { Plan, Platform } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Globe, Heart } from 'lucide-react';
import { toast } from 'sonner';

interface PageProps extends Record<string, unknown> {
    platforms: Platform[];
    plans: Plan[];
}

export default function FavoritesIndex() {
    const { platforms, plans } = usePage<PageProps>().props;

    const handleRemoveFavorite = (
        favoritableType: string,
        favoritableId: number,
    ) => {
        router.delete(favoritesDestroy.url(), {
            data: {
                favoritable_type: favoritableType,
                favoritable_id: favoritableId,
            },
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Favorilerden çıkarıldı');
            },
            onError: () => {
                toast.error('Bir hata oluştu');
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Favorilerim" />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Favorilerim
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        Beğendiğiniz platformlar ve planlar
                    </p>
                </div>

                {platforms.length === 0 && plans.length === 0 ? (
                    <div className="py-20 text-center">
                        <Heart className="mx-auto mb-4 h-16 w-16 text-zinc-300 dark:text-zinc-700" />
                        <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                            Henüz favori eklenmemiş
                        </h3>
                        <p className="mb-6 text-zinc-500 dark:text-zinc-400">
                            Beğendiğiniz platformları favorilerinize ekleyin
                        </p>
                        <Button asChild>
                            <Link href="/platforms">Platformları Keşfet</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {platforms.length > 0 && (
                            <div>
                                <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                                    Platformlar ({platforms.length})
                                </h2>
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {platforms.map((platform) => (
                                        <Card
                                            key={platform.id}
                                            className="overflow-hidden transition-shadow hover:shadow-lg"
                                        >
                                            <CardContent className="p-0">
                                                <Link
                                                    href={`/platforms/${platform.slug}`}
                                                    className="block"
                                                >
                                                    <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-blue-50 to-violet-50 p-6 dark:from-blue-900/20 dark:to-violet-900/20">
                                                        {platform.logo ? (
                                                            <>
                                                                <img
                                                                    src={
                                                                        platform.logo
                                                                    }
                                                                    alt={
                                                                        platform.name
                                                                    }
                                                                    className="h-full w-full object-contain dark:hidden"
                                                                />
                                                                {platform.dark_logo && (
                                                                    <img
                                                                        src={
                                                                            platform.dark_logo
                                                                        }
                                                                        alt={
                                                                            platform.name
                                                                        }
                                                                        className="hidden h-full w-full object-contain dark:block"
                                                                    />
                                                                )}
                                                            </>
                                                        ) : (
                                                            <span className="bg-gradient-to-br from-blue-600 to-violet-600 bg-clip-text text-4xl font-bold text-transparent">
                                                                {platform.name
                                                                    .charAt(0)
                                                                    .toUpperCase()}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="p-4">
                                                        <h3 className="mb-1 font-bold text-zinc-900 dark:text-zinc-50">
                                                            {platform.name}
                                                        </h3>
                                                        <div className="mb-3 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                                                            <Globe className="h-3.5 w-3.5" />
                                                            {platform.url
                                                                ? new URL(
                                                                      platform.url,
                                                                  ).hostname
                                                                : 'kobis.io'}
                                                        </div>
                                                        {platform.description && (
                                                            <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300">
                                                                {
                                                                    platform.description
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </Link>
                                                <div className="px-4 pb-4">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleRemoveFavorite(
                                                                'App\\Models\\Platform',
                                                                platform.id,
                                                            );
                                                        }}
                                                    >
                                                        <Heart className="mr-2 h-4 w-4 fill-current" />
                                                        Favorilerden Çıkar
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {plans.length > 0 && (
                            <div>
                                <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                                    Planlar ({plans.length})
                                </h2>
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {plans.map((plan) => (
                                        <Card
                                            key={plan.id}
                                            className="overflow-hidden transition-shadow hover:shadow-lg"
                                        >
                                            <CardContent className="p-6">
                                                <div className="mb-4 flex items-start justify-between">
                                                    <h3 className="font-bold text-zinc-900 dark:text-zinc-50">
                                                        {plan.name}
                                                    </h3>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleRemoveFavorite(
                                                                'App\\Models\\Plan',
                                                                plan.id,
                                                            )
                                                        }
                                                    >
                                                        <Heart className="h-4 w-4 fill-current text-red-500" />
                                                    </Button>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="w-full"
                                                    onClick={() =>
                                                        handleRemoveFavorite(
                                                            'App\\Models\\Plan',
                                                            plan.id,
                                                        )
                                                    }
                                                >
                                                    Favorilerden Çıkar
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
