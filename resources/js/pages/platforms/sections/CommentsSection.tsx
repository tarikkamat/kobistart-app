import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination } from '@/components/ui/pagination';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { login } from '@/routes';
import commentRoutes from '@/routes/comments';
import { Platform, SharedData } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { MessageSquare, Star, UserCircle2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface PaginatedComment {
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
}

interface PaginatedComments {
    data: PaginatedComment[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    platform: Platform;
    comments: PaginatedComments;
}

export default function CommentsSection({ platform, comments }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [rating, setRating] = useState(5);

    const { data, setData, post, processing, reset, errors } = useForm({
        comment: '',
        rating: 5,
        platform_id: platform.id,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(commentRoutes.store.url(), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setRating(5);
                toast.success('Yorum başarıyla eklendi');
            },
        });
    };

    const averageRating =
        comments.data.length > 0
            ? (
                  comments.data.reduce((acc, c) => acc + Number(c.rating), 0) /
                  comments.data.length
              ).toFixed(1)
            : '0.0';

    return (
        <div className="space-y-12">
            <div className="space-y-6">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="space-y-1">
                        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                            <MessageSquare className="h-6 w-6 text-blue-600" />
                            Kullanıcı Yorumları
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            Bu platformu kullanan işletmelerin deneyimleri.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-2 dark:border-zinc-800 dark:bg-zinc-900/50">
                        <div className="flex items-center gap-1 rounded-xl border border-zinc-100 bg-white px-3 py-1.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-bold text-zinc-900 dark:text-zinc-50">
                                {averageRating}
                            </span>
                        </div>
                        <span className="pr-2 text-sm text-zinc-500 dark:text-zinc-400">
                            {comments.total} Değerlendirme
                        </span>
                    </div>
                </div>

                <div className="space-y-6">
                    {comments.data.map((comment) => (
                        <div
                            key={comment.id}
                            className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                        >
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <Avatar className="h-12 w-12 border-2 border-white shadow-sm dark:border-zinc-800">
                                    <AvatarImage
                                        src={comment.user.profile_photo_url}
                                    />
                                    <AvatarFallback className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                        {comment.user.name
                                            .charAt(0)
                                            .toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-3">
                                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                                        <div>
                                            <h4 className="font-bold text-zinc-900 dark:text-zinc-50">
                                                {comment.user.name}
                                            </h4>
                                            <div className="mt-1 flex items-center gap-0.5">
                                                {Array.from({ length: 5 }).map(
                                                    (_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={cn(
                                                                'h-3.5 w-3.5',
                                                                i <
                                                                    Number(
                                                                        comment.rating,
                                                                    )
                                                                    ? 'fill-yellow-400 text-yellow-400'
                                                                    : 'text-zinc-200 dark:text-zinc-700',
                                                            )}
                                                        />
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                        <time className="text-xs text-zinc-400 tabular-nums">
                                            {new Date(
                                                comment.created_at,
                                            ).toLocaleDateString('tr-TR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </time>
                                    </div>
                                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                                        {comment.comment}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {comments.data.length === 0 && (
                        <div className="rounded-3xl border-2 border-dashed border-zinc-200 py-20 text-center dark:border-zinc-800">
                            <UserCircle2 className="mx-auto mb-4 h-12 w-12 text-zinc-300 dark:text-zinc-700" />
                            <p className="text-zinc-500 dark:text-zinc-400">
                                Henüz yorum yapılmamış. İlk yorumu siz yapın!
                            </p>
                        </div>
                    )}

                    <div className="pt-4">
                        <Pagination
                            currentPage={comments.current_page}
                            lastPage={comments.last_page}
                        />
                    </div>
                </div>
            </div>

            <div className="pt-8">
                {auth.user ? (
                    <Card className="overflow-hidden rounded-3xl border-zinc-200 bg-white/50 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-bold">
                                Deneyimlerini Paylaş
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                        Değerlendirmeniz
                                    </label>
                                    <div className="flex w-fit gap-2 rounded-2xl bg-zinc-50 p-3 dark:bg-zinc-800/50">
                                        {Array.from({ length: 5 }).map(
                                            (_, i) => (
                                                <button
                                                    type="button"
                                                    key={i}
                                                    onClick={() => {
                                                        setRating(i + 1);
                                                        setData(
                                                            'rating',
                                                            i + 1,
                                                        );
                                                    }}
                                                    className="group focus:outline-none"
                                                >
                                                    <Star
                                                        className={cn(
                                                            'h-8 w-8 transition-all',
                                                            i < rating
                                                                ? 'scale-110 fill-yellow-400 text-yellow-400'
                                                                : 'text-zinc-300 group-hover:text-yellow-200 dark:text-zinc-700',
                                                        )}
                                                    />
                                                </button>
                                            ),
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Textarea
                                        placeholder="Platform hakkındaki görüşlerinizi buraya yazın..."
                                        value={data.comment}
                                        onChange={(e) =>
                                            setData('comment', e.target.value)
                                        }
                                        className="min-h-[120px] rounded-2xl border-zinc-200 bg-white transition-all focus:ring-blue-600 dark:border-zinc-800 dark:bg-zinc-900"
                                    />
                                    {errors.comment && (
                                        <p className="text-xs font-medium text-red-500">
                                            {errors.comment}
                                        </p>
                                    )}
                                </div>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="h-12 rounded-2xl bg-blue-600 px-8 font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 disabled:opacity-50"
                                >
                                    Gönder
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="rounded-3xl border border-blue-100 bg-blue-50/50 p-10 text-center dark:border-blue-900/30 dark:bg-blue-900/10">
                        <p className="font-medium text-zinc-600 dark:text-zinc-400">
                            Yorum yapmak için lütfen{' '}
                            <Link
                                href={login.url()}
                                className="font-bold text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
                            >
                                giriş yapın
                            </Link>
                            .
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
