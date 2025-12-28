import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Head } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function LandingLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
            <Head>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <Header />

            <main className="flex flex-col pt-24">
                {children}
            </main>

            <Footer />
        </div>
    );
}
