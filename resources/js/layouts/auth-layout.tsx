import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import { Head } from '@inertiajs/react';

export default function AuthLayout({
    children,
    title,
    ...props
}: {
    children: React.ReactNode;
    title: string;
}) {
    return (
        <div className="min-h-screen bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
            <Head>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>
            <AuthLayoutTemplate title={title} {...props}>
                {children}
            </AuthLayoutTemplate>
        </div>
    );
}
