import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import AuthLayout from '@/layouts/auth-layout';
import { logout } from '@/routes';
import { send } from '@/routes/verification';
import { Form, Head } from '@inertiajs/react';
import { ArrowRight, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <AuthLayout
            title="Kobistart | E-Posta Doğrula"
        >
            <Head title="E-Posta Doğrula" />

            <div className="relative w-full max-w-md">
                <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/10 via-violet-500/5 to-transparent blur-[120px] animate-pulse dark:from-blue-500/20 dark:via-violet-500/10" />
                <div className="absolute top-[20%] right-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-blue-400/10 blur-[100px] animate-float dark:bg-blue-500/20" />
                <div className="absolute bottom-[10%] left-[-5%] -z-10 h-[300px] w-[300px] rounded-full bg-violet-400/10 blur-[80px] animate-float [animation-delay:2s] dark:bg-violet-500/20" />

                <GlassCard className="relative z-10 p-8 sm:p-10 rounded-3xl border-white/40 dark:border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] bg-white/40 dark:bg-white/5 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="mb-6 space-y-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-50 sm:text-3xl">
                            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 dark:from-blue-400 dark:via-violet-400 dark:to-blue-400 bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
                                E-Posta Doğrula
                            </span>
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            Hesabınızı doğrulamak için e-posta adresinize gönderilen bağlantıyı kontrol edin
                        </p>
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="mb-6 flex items-center justify-center gap-2 rounded-xl bg-green-50 dark:bg-green-500/10 px-4 py-3 text-sm font-medium text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Yeni bir doğrulama bağlantısı e-posta adresinize gönderildi</span>
                        </div>
                    )}

                    <Form {...send.form()} className="flex flex-col gap-6">
                        {({ processing }) => (
                            <>
                                <Button
                                    type="submit"
                                    className={cn(
                                        "w-full h-14 rounded-full text-lg font-bold transition-all duration-500 shadow-xl disabled:cursor-not-allowed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200",
                                        processing
                                            ? "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-500"
                                            : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20 hover:shadow-blue-500/30"
                                    )}
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <div className="flex items-center gap-2">
                                            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Gönderiliyor...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-5 w-5" />
                                            E-Posta Doğrulama Bağlantısını Tekrar Gönder
                                            <ArrowRight className="h-5 w-5" />
                                        </div>
                                    )}
                                </Button>

                                <div className="text-center text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                                    Veya,{' '}
                                    <TextLink
                                        href={logout()}
                                        className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                    >
                                        çıkış yap
                                    </TextLink>
                                </div>
                            </>
                        )}
                    </Form>

                    <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-blue-50 dark:bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Güvenli e-posta doğrulama</span>
                    </div>
                </GlassCard>
            </div>
        </AuthLayout>
    );
}
