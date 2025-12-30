import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/10 via-violet-500/5 to-transparent blur-[120px] animate-pulse dark:from-blue-500/20 dark:via-violet-500/10" />
            <div className="absolute top-[20%] right-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-blue-400/10 blur-[100px] animate-float dark:bg-blue-500/20" />
            <div className="absolute bottom-[10%] left-[-5%] -z-10 h-[300px] w-[300px] rounded-full bg-violet-400/10 blur-[80px] animate-float [animation-delay:2s] dark:bg-violet-500/20" />

            <div className="relative z-10 w-full max-w-md">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <Link
                            href={home()}
                            className="group flex flex-col items-center gap-3 font-medium transition-transform duration-300 hover:scale-105"
                        >
                            <span className="sr-only">{title}</span>
                        </Link>

                        {title && (
                            <div className="space-y-3 text-center">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-50 sm:text-3xl">
                                    <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 dark:from-blue-400 dark:via-violet-400 dark:to-blue-400 bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
                                        {title}
                                    </span>
                                </h1>
                            </div>
                        )}
                    </div>
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
