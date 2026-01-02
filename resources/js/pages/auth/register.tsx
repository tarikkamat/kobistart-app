import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export default function Register() {
    return (
        <AuthLayout title="Kobistart | Hesap Oluştur">
            <Head title="Hesap Oluştur" />

            <div className="relative w-full max-w-md">
                <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-b from-blue-500/10 via-violet-500/5 to-transparent blur-[120px] dark:from-blue-500/20 dark:via-violet-500/10" />
                <div className="animate-float absolute top-[20%] right-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-blue-400/10 blur-[100px] dark:bg-blue-500/20" />
                <div className="animate-float absolute bottom-[10%] left-[-5%] -z-10 h-[300px] w-[300px] rounded-full bg-violet-400/10 blur-[80px] [animation-delay:2s] dark:bg-violet-500/20" />

                <GlassCard className="relative z-10 animate-in rounded-3xl border-white/40 bg-white/40 p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] duration-1000 fade-in slide-in-from-bottom-8 sm:p-10 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)]">
                    <Form
                        {...store.form()}
                        resetOnSuccess={['password', 'password_confirmation']}
                        disableWhileProcessing
                        className="flex flex-col gap-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-6">
                                    <div className="grid animate-in gap-2 delay-200 duration-1000 fade-in slide-in-from-bottom-8">
                                        <Label
                                            htmlFor="name"
                                            className="text-sm font-semibold text-gray-900 dark:text-slate-100"
                                        >
                                            Ad Soyad
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            name="name"
                                            placeholder="Adınız ve Soyadınız"
                                            className="h-12 rounded-xl border-2 border-gray-200 bg-white/90 transition-all duration-300 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 dark:border-white/10 dark:bg-slate-900/90"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid animate-in gap-2 delay-300 duration-1000 fade-in slide-in-from-bottom-8">
                                        <Label
                                            htmlFor="email"
                                            className="text-sm font-semibold text-gray-900 dark:text-slate-100"
                                        >
                                            E-Posta
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            tabIndex={2}
                                            autoComplete="email"
                                            name="email"
                                            placeholder="ornek@kobistart.com"
                                            className="h-12 rounded-xl border-2 border-gray-200 bg-white/90 transition-all duration-300 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 dark:border-white/10 dark:bg-slate-900/90"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid animate-in gap-2 delay-400 duration-1000 fade-in slide-in-from-bottom-8">
                                        <Label
                                            htmlFor="password"
                                            className="text-sm font-semibold text-gray-900 dark:text-slate-100"
                                        >
                                            Şifre
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            tabIndex={3}
                                            autoComplete="new-password"
                                            name="password"
                                            placeholder="Şifre"
                                            className="h-12 rounded-xl border-2 border-gray-200 bg-white/90 transition-all duration-300 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 dark:border-white/10 dark:bg-slate-900/90"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="grid animate-in gap-2 delay-500 duration-1000 fade-in slide-in-from-bottom-8">
                                        <Label
                                            htmlFor="password_confirmation"
                                            className="text-sm font-semibold text-gray-900 dark:text-slate-100"
                                        >
                                            Şifre Tekrar
                                        </Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            required
                                            tabIndex={4}
                                            autoComplete="new-password"
                                            name="password_confirmation"
                                            placeholder="Şifre Tekrar"
                                            className="h-12 rounded-xl border-2 border-gray-200 bg-white/90 transition-all duration-300 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 dark:border-white/10 dark:bg-slate-900/90"
                                        />
                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className={cn(
                                            'mt-4 h-14 w-full animate-in rounded-full text-lg font-bold shadow-xl transition-all delay-600 duration-500 duration-1000 fade-in slide-in-from-bottom-8 disabled:cursor-not-allowed',
                                            processing
                                                ? 'bg-gray-100 text-gray-400 dark:bg-slate-800 dark:text-gray-500'
                                                : 'bg-blue-600 text-white shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30',
                                        )}
                                        tabIndex={5}
                                        disabled={processing}
                                        data-test="register-user-button"
                                    >
                                        {processing ? (
                                            <div className="flex items-center gap-2">
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                Hesap oluşturuluyor...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                Hesap Oluştur
                                                <ArrowRight className="h-5 w-5" />
                                            </div>
                                        )}
                                    </Button>
                                </div>

                                <div className="animate-in text-center text-sm text-muted-foreground delay-700 duration-1000 fade-in slide-in-from-bottom-8">
                                    Zaten hesabınız var mı?{' '}
                                    <TextLink
                                        href={login()}
                                        tabIndex={6}
                                        className="font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        Giriş yap
                                    </TextLink>
                                </div>
                            </>
                        )}
                    </Form>
                </GlassCard>
            </div>
        </AuthLayout>
    );
}
