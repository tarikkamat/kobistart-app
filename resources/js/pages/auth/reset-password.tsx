import { update } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlassCard } from '@/components/ui/glass-card';
import AuthLayout from '@/layouts/auth-layout';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    return (
        <AuthLayout
            title="Kobistart | Şifremi Sıfırla"
        >
            <Head title="Şifremi Sıfırla" />

            <div className="relative w-full max-w-md">
                <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/10 via-violet-500/5 to-transparent blur-[120px] animate-pulse dark:from-blue-500/20 dark:via-violet-500/10" />
                <div className="absolute top-[20%] right-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-blue-400/10 blur-[100px] animate-float dark:bg-blue-500/20" />
                <div className="absolute bottom-[10%] left-[-5%] -z-10 h-[300px] w-[300px] rounded-full bg-violet-400/10 blur-[80px] animate-float [animation-delay:2s] dark:bg-violet-500/20" />

                <GlassCard className="relative z-10 p-8 sm:p-10 rounded-3xl border-white/40 dark:border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] bg-white/40 dark:bg-white/5 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="mb-6 space-y-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-50 sm:text-3xl">
                            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 dark:from-blue-400 dark:via-violet-400 dark:to-blue-400 bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
                                Şifremi Sıfırla
                            </span>
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            Yeni şifrenizi belirleyin
                        </p>
                    </div>

                    <Form
                        {...update.form()}
                        transform={(data) => ({ ...data, token, email })}
                        resetOnSuccess={['password', 'password_confirmation']}
                        className="flex flex-col gap-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-6">
                                    <div className="grid gap-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                                        <Label htmlFor="email" className="text-sm font-semibold text-gray-900 dark:text-slate-100">
                                            E-Posta
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            value={email}
                                            readOnly
                                            className="h-12 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                                        <Label htmlFor="password" className="text-sm font-semibold text-gray-900 dark:text-slate-100">
                                            Şifre
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            autoComplete="new-password"
                                            autoFocus
                                            tabIndex={1}
                                            placeholder="Yeni şifre"
                                            className="h-12 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all duration-300"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="grid gap-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
                                        <Label htmlFor="password_confirmation" className="text-sm font-semibold text-gray-900 dark:text-slate-100">
                                            Şifre Tekrar
                                        </Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            autoComplete="new-password"
                                            tabIndex={2}
                                            placeholder="Yeni şifre tekrar"
                                            className="h-12 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all duration-300"
                                        />
                                        <InputError message={errors.password_confirmation} />
                                    </div>

                                    <Button
                                        type="submit"
                                        className={cn(
                                            "mt-4 w-full h-14 rounded-full text-lg font-bold transition-all duration-500 shadow-xl disabled:cursor-not-allowed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500",
                                            processing
                                                ? "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-500"
                                                : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20 hover:shadow-blue-500/30"
                                        )}
                                        disabled={processing}
                                        data-test="reset-password-button"
                                    >
                                        {processing ? (
                                            <div className="flex items-center gap-2">
                                                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Sıfırlanıyor...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                Şifremi Sıfırla
                                                <ArrowRight className="h-5 w-5" />
                                            </div>
                                        )}
                                    </Button>
                                </div>

                                <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-blue-50 dark:bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600">
                                    <ShieldCheck className="h-4 w-4" />
                                    <span>Güvenli şifre sıfırlama</span>
                                </div>
                            </>
                        )}
                    </Form>
                </GlassCard>
            </div>
        </AuthLayout>
    );
}
