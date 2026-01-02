import { Button } from '@/components/ui/button';
import {
    destroy as favoritesDestroy,
    store as favoritesStore,
} from '@/routes/favorites/index';
import { Platform, SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { ExternalLink, Globe, Heart, ShieldCheck, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface PlatformHeaderProps {
    platform: Platform;
}

export default function PlatformHeader({ platform }: PlatformHeaderProps) {
    const { auth } = usePage<SharedData>().props;
    const isFavorited = platform.is_favorited || false;

    const { post: addFavorite, processing: addingFavorite } = useForm({
        favoritable_type: 'App\\Models\\Platform',
        favoritable_id: platform.id,
    });

    const { delete: removeFavorite, processing: removingFavorite } = useForm({
        favoritable_type: 'App\\Models\\Platform',
        favoritable_id: platform.id,
    });

    const handleToggleFavorite = () => {
        if (isFavorited) {
            removeFavorite(favoritesDestroy.url(), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Favorilerden çıkarıldı');
                },
                onError: () => {
                    toast.error('Bir hata oluştu');
                },
            });
        } else {
            addFavorite(favoritesStore.url(), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Favorilere eklendi');
                },
                onError: () => {
                    toast.error('Bir hata oluştu');
                },
            });
        }
    };

    return (
        <section className="relative overflow-hidden border-b border-zinc-200 bg-white pt-12 pb-16 dark:border-zinc-800 dark:bg-zinc-950">
            {/* Ambient Background Elements */}
            <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/5 via-transparent to-transparent blur-[100px]" />

            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12">
                    {/* Platform Logo Container */}
                    <div className="group relative">
                        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 opacity-25 blur transition duration-1000 group-hover:opacity-40 group-hover:duration-200"></div>
                        <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm md:h-40 md:w-40 dark:border-zinc-800 dark:bg-zinc-900">
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
                                            className="hidden h-full w-full object-contain dark:block"
                                        />
                                    )}
                                </>
                            ) : (
                                <span className="bg-gradient-to-br from-blue-600 to-violet-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                                    {platform.name.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Platform Content Area */}
                    <div className="flex-1 space-y-4 text-center lg:text-left">
                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-zinc-50">
                                    {platform.name}
                                </h1>
                                <div className="flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                    Doğrulanmış Platform
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500 lg:justify-start dark:text-zinc-400">
                                <div className="flex items-center gap-1.5">
                                    <Globe className="h-4 w-4" />
                                    {platform.url
                                        ? new URL(platform.url).hostname
                                        : 'kobis.io'}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Zap className="h-4 w-4 text-yellow-500" />
                                    {platform.plans?.length || 0} Aktif Paket
                                </div>
                            </div>
                        </div>

                        {platform.description ? (
                            <p className="mx-auto max-w-2xl text-lg text-zinc-600 lg:mx-0 dark:text-zinc-300">
                                {platform.description}
                            </p>
                        ) : (
                            <p className="mx-auto max-w-2xl text-lg text-zinc-600 lg:mx-0 dark:text-zinc-300">
                                {platform.name}, işletmenizi büyütmeniz için
                                gereken tüm araçları sunan kapsamlı bir
                                platformdur.
                            </p>
                        )}

                        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start">
                            <Button
                                asChild
                                size="lg"
                                className="rounded-full bg-blue-600 px-8 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700"
                            >
                                <a
                                    href={platform.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Hemen Başvur
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full border-zinc-200 px-8 dark:border-zinc-800"
                                onClick={() =>
                                    document
                                        .getElementById('comments')
                                        ?.scrollIntoView({ behavior: 'smooth' })
                                }
                            >
                                İncelemeler
                            </Button>
                            {auth.user && (
                                <Button
                                    variant={
                                        isFavorited ? 'default' : 'outline'
                                    }
                                    size="lg"
                                    className={`rounded-full border-zinc-200 px-8 dark:border-zinc-800 ${isFavorited ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30' : ''}`}
                                    onClick={handleToggleFavorite}
                                    disabled={
                                        addingFavorite || removingFavorite
                                    }
                                >
                                    <Heart
                                        className={`mr-2 h-4 w-4 ${isFavorited ? 'fill-current' : ''}`}
                                    />
                                    {isFavorited
                                        ? 'Favorilerden Çıkar'
                                        : 'Favorilere Ekle'}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
