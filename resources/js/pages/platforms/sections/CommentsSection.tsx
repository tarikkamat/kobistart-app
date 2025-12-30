import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Pagination } from '@/components/ui/pagination';
import { Platform, SharedData } from '@/types';
import { useForm, usePage, Link } from '@inertiajs/react';
import { MessageSquare, Star, UserCircle2 } from 'lucide-react';
import { useState } from 'react';
import { login } from '@/routes';
import commentRoutes from '@/routes/comments';
import { cn } from '@/lib/utils';
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

    const averageRating = comments.data.length > 0
        ? (comments.data.reduce((acc, c) => acc + Number(c.rating), 0) / comments.data.length).toFixed(1)
        : '0.0';

    return (
        <div className="space-y-12">
        <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                            <MessageSquare className="h-6 w-6 text-blue-600" />
                            Kullanıcı Yorumları
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            Bu platformu kullanan işletmelerin deneyimleri.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900/50 p-2 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center gap-1 bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-700">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-bold text-zinc-900 dark:text-zinc-50">{averageRating}</span>
                        </div>
                        <span className="text-sm text-zinc-500 dark:text-zinc-400 pr-2">
                            {comments.total} Değerlendirme
                                </span>
                    </div>
                </div>

                <div className="space-y-6">
                    {comments.data.map((comment) => (
                        <div
                            key={comment.id}
                            className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Avatar className="h-12 w-12 border-2 border-white dark:border-zinc-800 shadow-sm">
                                <AvatarImage src={comment.user.profile_photo_url} />
                                    <AvatarFallback className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                                    {comment.user.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                                <div className="flex-1 space-y-3">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <div>
                                            <h4 className="font-bold text-zinc-900 dark:text-zinc-50">{comment.user.name}</h4>
                                            <div className="flex items-center gap-0.5 mt-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                        className={cn(
                                                            "h-3.5 w-3.5",
                                                            i < Number(comment.rating)
                                                                ? "fill-yellow-400 text-yellow-400"
                                                                : "text-zinc-200 dark:text-zinc-700"
                                                        )}
                                            />
                                        ))}
                                            </div>
                                        </div>
                                        <time className="text-xs text-zinc-400 tabular-nums">
                                            {new Date(comment.created_at).toLocaleDateString('tr-TR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </time>
                                    </div>
                                    <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm">
                                        {comment.comment}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {comments.data.length === 0 && (
                        <div className="py-20 text-center rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                            <UserCircle2 className="h-12 w-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
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
                    <Card className="rounded-3xl border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-bold">Deneyimlerini Paylaş</CardTitle>
                    </CardHeader>
                    <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Değerlendirmeniz</label>
                                    <div className="flex gap-2 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 w-fit">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <button
                                            type="button"
                                            key={i}
                                            onClick={() => {
                                                setRating(i + 1);
                                                setData('rating', i + 1);
                                            }}
                                                className="focus:outline-none group"
                                        >
                                            <Star
                                                    className={cn(
                                                        "h-8 w-8 transition-all",
                                                        i < rating
                                                            ? "fill-yellow-400 text-yellow-400 scale-110"
                                                            : "text-zinc-300 dark:text-zinc-700 group-hover:text-yellow-200"
                                                    )}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                                <div className="space-y-2">
                                <Textarea
                                        placeholder="Platform hakkındaki görüşlerinizi buraya yazın..."
                                    value={data.comment}
                                    onChange={(e) => setData('comment', e.target.value)}
                                        className="min-h-[120px] rounded-2xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:ring-blue-600 transition-all"
                                />
                                {errors.comment && (
                                        <p className="text-xs font-medium text-red-500">{errors.comment}</p>
                                )}
                            </div>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="h-12 rounded-2xl px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
                                >
                                Gönder
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            ) : (
                    <div className="p-10 text-center rounded-3xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
                        <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                            Yorum yapmak için lütfen{' '}
                            <Link href={login.url()} className="text-blue-600 dark:text-blue-400 font-bold hover:underline underline-offset-4">
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
