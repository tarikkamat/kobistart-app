import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { cn } from '@/lib/utils';
import { store } from '@/routes/password/confirm';
import { Form, Head } from '@inertiajs/react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function ConfirmPassword() {
    return (
        <AuthLayout title="Kobistart | Şifrenizi Doğrula">
            <Head title="Şifrenizi Doğrula" />

            <div className="relative w-full max-w-md">
                <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-b from-blue-500/10 via-violet-500/5 to-transparent blur-[120px] dark:from-blue-500/20 dark:via-violet-500/10" />
                <div className="animate-float absolute top-[20%] right-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-blue-400/10 blur-[100px] dark:bg-blue-500/20" />
                <div className="animate-float absolute bottom-[10%] left-[-5%] -z-10 h-[300px] w-[300px] rounded-full bg-violet-400/10 blur-[80px] [animation-delay:2s] dark:bg-violet-500/20" />

                <GlassCard className="relative z-10 animate-in rounded-3xl border-white/40 bg-white/40 p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] duration-1000 fade-in slide-in-from-bottom-8 sm:p-10 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)]">
                    <div className="mb-6 animate-in space-y-2 delay-150 duration-1000 fade-in slide-in-from-bottom-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-slate-50">
                            <span className="animate-gradient-x bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-[length:200%_auto] bg-clip-text text-transparent dark:from-blue-400 dark:via-violet-400 dark:to-blue-400">
                                Şifrenizi Doğrula
                            </span>
                        </h1>
                        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                            Devam etmek için lütfen şifrenizi girin
                        </p>
                    </div>

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="flex flex-col gap-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-6">
                                    <div className="grid animate-in gap-2 delay-200 duration-1000 fade-in slide-in-from-bottom-8">
                                        <Label
                                            htmlFor="password"
                                            className="text-sm font-semibold text-gray-900 dark:text-slate-100"
                                        >
                                            Şifre
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="Şifre"
                                            autoComplete="current-password"
                                            autoFocus
                                            tabIndex={1}
                                            className="h-12 rounded-xl border-2 border-gray-200 bg-white/90 transition-all duration-300 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 dark:border-white/10 dark:bg-slate-900/90"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <Button
                                        type="submit"
                                        className={cn(
                                            'mt-4 h-14 w-full animate-in rounded-full text-lg font-bold shadow-xl transition-all delay-300 duration-500 duration-1000 fade-in slide-in-from-bottom-8 disabled:cursor-not-allowed',
                                            processing
                                                ? 'bg-gray-100 text-gray-400 dark:bg-slate-800 dark:text-gray-500'
                                                : 'bg-blue-600 text-white shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30',
                                        )}
                                        disabled={processing}
                                        data-test="confirm-password-button"
                                    >
                                        {processing ? (
                                            <div className="flex items-center gap-2">
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                Doğrulanıyor...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                Şifrenizi Doğrula
                                                <ArrowRight className="h-5 w-5" />
                                            </div>
                                        )}
                                    </Button>
                                </div>

                                <div className="mt-6 flex animate-in items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-600 duration-700 fade-in slide-in-from-bottom-4 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
                                    <ShieldCheck className="h-4 w-4" />
                                    <span>Güvenli doğrulama</span>
                                </div>
                            </>
                        )}
                    </Form>
                </GlassCard>
            </div>
        </AuthLayout>
    );
}
