import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Platform, Comment, User, SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Star, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import { login } from '@/routes';
import commentRoutes from '@/routes/comments';

interface Props {
    platform: Platform;
    comments: (Comment & { user: User })[];
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
            },
        });
    };

    return (
        <div className="space-y-6">
            <Card className="border-none bg-white/40 shadow-sm backdrop-blur-md dark:bg-zinc-900/40">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Yorumlar ({comments.length})</CardTitle>
                        {comments.length > 0 && (
                            <div className="flex items-center gap-1">
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <span className="font-bold text-lg">
                                    {(
                                        comments.reduce((acc, c) => acc + Number(c.rating), 0) /
                                        comments.length
                                    ).toFixed(1)}
                                </span>
                            </div>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4">
                            <Avatar>
                                <AvatarImage src={comment.user.profile_photo_url} />
                                <AvatarFallback>
                                    {comment.user.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-sm">{comment.user.name}</h4>
                                    <div className="flex items-center gap-0.5">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-3 w-3 ${i < Number(comment.rating)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground">{comment.comment}</p>
                                <p className="text-xs text-gray-400">
                                    {new Date(comment.created_at).toLocaleDateString('tr-TR')}
                                </p>
                            </div>
                        </div>
                    ))}

                    {comments.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">
                            Henüz yorum yapılmamış. İlk yorumu siz yapın!
                        </p>
                    )}
                </CardContent>
            </Card>

            {auth.user ? (
                <Card className="border-none bg-white/40 shadow-sm backdrop-blur-md dark:bg-zinc-900/40">
                    <CardHeader>
                        <CardTitle>Yorum Yap</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium">Puanınız</label>
                                <div className="flex gap-2">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <button
                                            type="button"
                                            key={i}
                                            onClick={() => {
                                                setRating(i + 1);
                                                setData('rating', i + 1);
                                            }}
                                            className="focus:outline-none"
                                        >
                                            <Star
                                                className={`h-6 w-6 transition-colors ${i < rating
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300 hover:text-yellow-200'
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <Textarea
                                    placeholder="Denimlerinizi paylaşın..."
                                    value={data.comment}
                                    onChange={(e) => setData('comment', e.target.value)}
                                    className="resize-none bg-white/50 dark:bg-black/20"
                                />
                                {errors.comment && (
                                    <p className="text-sm text-red-500 mt-1">{errors.comment}</p>
                                )}
                            </div>
                            <Button type="submit" disabled={processing}>
                                Gönder
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            ) : (
                <Card className="border-none bg-blue-50/50 dark:bg-blue-900/20">
                    <CardContent className="py-6 text-center">
                        <p className="text-muted-foreground">
                            Yorum yapmak için lütfen{' '}
                            <a href={login.url()} className="font-semibold text-primary hover:underline">
                                giriş yapın
                            </a>
                            .
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
