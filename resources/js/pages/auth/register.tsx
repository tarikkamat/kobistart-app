import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlassCard } from '@/components/ui/glass-card';
import AuthLayout from '@/layouts/auth-layout';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Register() {
    return (
        <AuthLayout
            title="Kobistart | Hesap Oluştur"
        >
            <Head title="Hesap Oluştur" />

            <div className="relative w-full max-w-md">
                <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/10 via-violet-500/5 to-transparent blur-[120px] animate-pulse dark:from-blue-500/20 dark:via-violet-500/10" />
                <div className="absolute top-[20%] right-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-blue-400/10 blur-[100px] animate-float dark:bg-blue-500/20" />
                <div className="absolute bottom-[10%] left-[-5%] -z-10 h-[300px] w-[300px] rounded-full bg-violet-400/10 blur-[80px] animate-float [animation-delay:2s] dark:bg-violet-500/20" />

                <GlassCard className="relative z-10 p-8 sm:p-10 rounded-3xl border-white/40 dark:border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] bg-white/40 dark:bg-white/5 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <Form
                        {...store.form()}
                        resetOnSuccess={['password', 'password_confirmation']}
                        disableWhileProcessing
                        className="flex flex-col gap-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-6">
                                    <div className="grid gap-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                                        <Label htmlFor="name" className="text-sm font-semibold text-gray-900 dark:text-slate-100">
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
                                            className="h-12 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all duration-300"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                                        <Label htmlFor="email" className="text-sm font-semibold text-gray-900 dark:text-slate-100">
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
                                            className="h-12 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all duration-300"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
                                        <Label htmlFor="password" className="text-sm font-semibold text-gray-900 dark:text-slate-100">
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
                                            className="h-12 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all duration-300"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="grid gap-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                                        <Label htmlFor="password_confirmation" className="text-sm font-semibold text-gray-900 dark:text-slate-100">
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
                                            className="h-12 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all duration-300"
                                        />
                                        <InputError message={errors.password_confirmation} />
                                    </div>

                                    <Button
                                        type="submit"
                                        className={cn(
                                            "mt-4 w-full h-14 rounded-full text-lg font-bold transition-all duration-500 shadow-xl disabled:cursor-not-allowed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600",
                                            processing
                                                ? "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-500"
                                                : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20 hover:shadow-blue-500/30"
                                        )}
                                        tabIndex={5}
                                        disabled={processing}
                                        data-test="register-user-button"
                                    >
                                        {processing ? (
                                            <div className="flex items-center gap-2">
                                                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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

                                <div className="text-center text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
                                    Zaten hesabınız var mı?{' '}
                                    <TextLink
                                        href={login()}
                                        tabIndex={6}
                                        className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
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
