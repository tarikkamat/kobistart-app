import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import AuthLayout from '@/layouts/auth-layout';
import { cn } from '@/lib/utils';
import { logout } from '@/routes';
import { send } from '@/routes/verification';
import { Form, Head } from '@inertiajs/react';
import { ArrowRight, CheckCircle2, Mail, ShieldCheck } from 'lucide-react';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <AuthLayout title="Kobistart | E-Posta Doğrula">
            <Head title="E-Posta Doğrula" />

            <div className="relative w-full max-w-md">
                <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-b from-blue-500/10 via-violet-500/5 to-transparent blur-[120px] dark:from-blue-500/20 dark:via-violet-500/10" />
                <div className="animate-float absolute top-[20%] right-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-blue-400/10 blur-[100px] dark:bg-blue-500/20" />
                <div className="animate-float absolute bottom-[10%] left-[-5%] -z-10 h-[300px] w-[300px] rounded-full bg-violet-400/10 blur-[80px] [animation-delay:2s] dark:bg-violet-500/20" />

                <GlassCard className="relative z-10 animate-in rounded-3xl border-white/40 bg-white/40 p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] duration-1000 fade-in slide-in-from-bottom-8 sm:p-10 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)]">
                    <div className="mb-6 animate-in space-y-2 delay-150 duration-1000 fade-in slide-in-from-bottom-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-slate-50">
                            <span className="animate-gradient-x bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-[length:200%_auto] bg-clip-text text-transparent dark:from-blue-400 dark:via-violet-400 dark:to-blue-400">
                                E-Posta Doğrula
                            </span>
                        </h1>
                        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                            Hesabınızı doğrulamak için e-posta adresinize
                            gönderilen bağlantıyı kontrol edin
                        </p>
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="mb-6 flex animate-in items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-600 duration-700 fade-in slide-in-from-bottom-4 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>
                                Yeni bir doğrulama bağlantısı e-posta adresinize
                                gönderildi
                            </span>
                        </div>
                    )}

                    <Form {...send.form()} className="flex flex-col gap-6">
                        {({ processing }) => (
                            <>
                                <Button
                                    type="submit"
                                    className={cn(
                                        'h-14 w-full animate-in rounded-full text-lg font-bold shadow-xl transition-all delay-200 duration-500 duration-1000 fade-in slide-in-from-bottom-8 disabled:cursor-not-allowed',
                                        processing
                                            ? 'bg-gray-100 text-gray-400 dark:bg-slate-800 dark:text-gray-500'
                                            : 'bg-blue-600 text-white shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30',
                                    )}
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <div className="flex items-center gap-2">
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Gönderiliyor...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-5 w-5" />
                                            E-Posta Doğrulama Bağlantısını
                                            Tekrar Gönder
                                            <ArrowRight className="h-5 w-5" />
                                        </div>
                                    )}
                                </Button>

                                <div className="animate-in text-center text-sm text-muted-foreground delay-300 duration-1000 fade-in slide-in-from-bottom-8">
                                    Veya,{' '}
                                    <TextLink
                                        href={logout()}
                                        className="font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        çıkış yap
                                    </TextLink>
                                </div>
                            </>
                        )}
                    </Form>

                    <div className="mt-6 flex animate-in items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-600 delay-400 duration-700 fade-in slide-in-from-bottom-4 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Güvenli e-posta doğrulama</span>
                    </div>
                </GlassCard>
            </div>
        </AuthLayout>
    );
}
