import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
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

    const navLinks = [
        { name: 'Nasıl Çalışır', href: '#how-it-works' },
        { name: 'Karşılaştır', href: '#comparison' },
        { name: 'Fiyatlandırma', href: '#pricing' },
    ];

    return (
        <header
            className={cn(
                'fixed left-1/2 top-6 z-50 flex h-16 w-[95%] -translate-x-1/2 items-center justify-between rounded-full border px-6 transition-all duration-300 md:w-full md:max-w-5xl',
                scrolled
                    ? 'border-white/20 bg-white/60 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/60'
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
                            : 'text-gray-900 dark:text-white', // Assuming dark mode text is always visible or handling contrast
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
                        className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
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
                    <X className="h-6 w-6 text-gray-900 dark:text-white" />
                ) : (
                    <Menu className="h-6 w-6 text-gray-900 dark:text-white" />
                )}
            </button>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="absolute left-0 right-0 top-20 flex flex-col gap-4 rounded-3xl border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-black/90">
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="block text-lg font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
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
