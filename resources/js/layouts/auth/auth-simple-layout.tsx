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
            <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-b from-blue-500/10 via-violet-500/5 to-transparent blur-[120px] dark:from-blue-500/20 dark:via-violet-500/10" />
            <div className="animate-float absolute top-[20%] right-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-blue-400/10 blur-[100px] dark:bg-blue-500/20" />
            <div className="animate-float absolute bottom-[10%] left-[-5%] -z-10 h-[300px] w-[300px] rounded-full bg-violet-400/10 blur-[80px] [animation-delay:2s] dark:bg-violet-500/20" />

            <div className="relative z-10 w-full max-w-md">
                <div className="flex flex-col gap-8">
                    <div className="flex animate-in flex-col items-center gap-6 duration-1000 fade-in slide-in-from-bottom-8">
                        <Link
                            href={home()}
                            className="group flex flex-col items-center gap-3 font-medium transition-transform duration-300 hover:scale-105"
                        >
                            <span className="sr-only">{title}</span>
                        </Link>

                        {title && (
                            <div className="space-y-3 text-center">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-slate-50">
                                    <span className="animate-gradient-x bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-[length:200%_auto] bg-clip-text text-transparent dark:from-blue-400 dark:via-violet-400 dark:to-blue-400">
                                        {title}
                                    </span>
                                </h1>
                            </div>
                        )}
                    </div>
                    <div className="animate-in delay-150 duration-1000 fade-in slide-in-from-bottom-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
