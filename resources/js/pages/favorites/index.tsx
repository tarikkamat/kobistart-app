import AppLayout from '@/layouts/app-layout';
import { Head, usePage, Link, router } from '@inertiajs/react';
import { Platform, Plan } from '@/types';
import { destroy as favoritesDestroy } from '@/routes/favorites/index';
import { Heart, ExternalLink, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';

interface PageProps extends Record<string, unknown> {
    platforms: Platform[];
    plans: Plan[];
}

export default function FavoritesIndex() {
    const { platforms, plans } = usePage<PageProps>().props;

    const handleRemoveFavorite = (favoritableType: string, favoritableId: number) => {
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
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
                        Favorilerim
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        Beğendiğiniz platformlar ve planlar
                    </p>
                </div>

                {platforms.length === 0 && plans.length === 0 ? (
                    <div className="text-center py-20">
                        <Heart className="h-16 w-16 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                            Henüz favori eklenmemiş
                        </h3>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-6">
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
                                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
                                    Platformlar ({platforms.length})
                                </h2>
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {platforms.map((platform) => (
                                        <Card key={platform.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                            <CardContent className="p-0">
                                                <Link href={`/platforms/${platform.slug}`} className="block">
                                                    <div className="relative h-48 bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 flex items-center justify-center p-6">
                                                        {platform.logo ? (
                                                            <>
                                                                <img
                                                                    src={platform.logo}
                                                                    alt={platform.name}
                                                                    className="h-full w-full object-contain dark:hidden"
                                                                />
                                                                {platform.dark_logo && (
                                                                    <img
                                                                        src={platform.dark_logo}
                                                                        alt={platform.name}
                                                                        className="h-full w-full object-contain hidden dark:block"
                                                                    />
                                                                )}
                                                            </>
                                                        ) : (
                                                            <span className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-violet-600 bg-clip-text text-transparent">
                                                                {platform.name.charAt(0).toUpperCase()}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="p-4">
                                                        <h3 className="font-bold text-zinc-900 dark:text-zinc-50 mb-1">
                                                            {platform.name}
                                                        </h3>
                                                        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                                                            <Globe className="h-3.5 w-3.5" />
                                                            {platform.url ? new URL(platform.url).hostname : 'kobis.io'}
                                                        </div>
                                                        {platform.description && (
                                                            <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">
                                                                {platform.description}
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
                                                            handleRemoveFavorite('App\\Models\\Platform', platform.id);
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
                                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
                                    Planlar ({plans.length})
                                </h2>
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {plans.map((plan) => (
                                        <Card key={plan.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between mb-4">
                                                    <h3 className="font-bold text-zinc-900 dark:text-zinc-50">
                                                        {plan.name}
                                                    </h3>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleRemoveFavorite('App\\Models\\Plan', plan.id)}
                                                    >
                                                        <Heart className="h-4 w-4 fill-current text-red-500" />
                                                    </Button>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="w-full"
                                                    onClick={() => handleRemoveFavorite('App\\Models\\Plan', plan.id)}
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

