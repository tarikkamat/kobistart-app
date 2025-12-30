import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const { url } = usePage();
    const isHome = url === '/';

    const navLinks = [
        { name: 'Nasıl Çalışır', href: isHome ? '#how-it-works' : '/#how-it-works' },
        { name: 'Karşılaştır', href: isHome ? '#comparison' : '/#comparison' },
        { name: 'Tüm Platformlar', href: '/platforms' },
        { name: 'E-Ticaret Planları', href: '/plans' },
    ];

    return (
        <header
            className={cn(
                'fixed left-1/2 top-6 z-50 flex h-16 w-[95%] -translate-x-1/2 items-center justify-between rounded-full border px-6 transition-all duration-300 md:w-full md:max-w-5xl',
                scrolled
                    ? 'border-white/40 bg-white/60 shadow-lg backdrop-blur-lg dark:border-white/10 dark:bg-slate-900/60'
                    : 'border-transparent bg-transparent',
            )}
        >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 font-bold text-white shadow-md">
                    K
                </div>
                <span
                    className={cn(
                        'text-xl font-bold transition-colors',
                        scrolled
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-900 dark:text-white',
                    )}
                >
                    KobiStart
                </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-8 md:flex">
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-blue-400",
                            scrolled
                                ? "text-gray-700 dark:text-gray-200"
                                : "text-gray-600 dark:text-gray-300 dark:hover:text-blue-400"
                        )}
                    >
                        {link.name}
                    </a>
                ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
                <Button
                    variant="default"
                    className="rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                    Platformunu Bul
                </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? (
                    <X className={cn("h-6 w-6", scrolled ? "text-gray-900 dark:text-white" : "text-gray-900 dark:text-white")} />
                ) : (
                    <Menu className={cn("h-6 w-6", scrolled ? "text-gray-900 dark:text-white" : "text-gray-900 dark:text-white")} />
                )}
            </button>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="absolute left-0 right-0 top-20 flex flex-col gap-4 rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-slate-800/95 p-6 shadow-2xl backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-gradient-to-br dark:from-slate-950/95 dark:via-black/95 dark:to-slate-950/95">
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="block text-lg font-medium text-white hover:text-blue-400 dark:text-white dark:hover:text-blue-400"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <Button className="mt-4 w-full rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600">
                            Platformunu Bul
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    );
}
