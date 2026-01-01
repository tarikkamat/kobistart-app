import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Link, router, usePage } from '@inertiajs/react';
import {
    Heart,
    LayoutGrid,
    LogOut,
    Menu,
    User,
    X,
    HelpCircle,
    GitCompare,
    Building2,
    ShoppingBag,
    Sparkles
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { type SharedData } from '@/types';
import { dashboard, login, logout, register } from '@/routes';
import { index as favoritesIndex } from '@/routes/favorites/index';
import { index as platformsIndex } from '@/routes/platforms/index';
import { index as plansIndex } from '@/routes/plans/index';

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

    const { url, props } = usePage<SharedData>();
    const isHome = url === '/';
    const user = props.auth.user;
    const canRegister = props.canRegister;

    const handleLogout = () => {
        router.post(logout.url());
    };

    const navLinks = [
        { name: 'Tüm Platformlar', href: platformsIndex.url(), icon: Building2 },
        { name: 'E-Ticaret Planları', href: plansIndex.url(), icon: ShoppingBag },
        { name: 'Plan Öneri Sihirbazı', href: plansIndex.url(), icon: Sparkles, highlighted: true },
    ];

    return (
        <header
            className={cn(
                'fixed left-1/2 top-6 z-50 flex h-20 w-[95%] -translate-x-1/2 items-center justify-between rounded-full border px-8 transition-all duration-300 md:w-full md:max-w-7xl lg:max-w-[90%]',
                scrolled
                    ? 'border-white/40 bg-white/60 shadow-lg backdrop-blur-lg dark:border-white/10 dark:bg-slate-900/60'
                    : 'border-transparent bg-transparent',
            )}
        >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 font-bold text-white shadow-md">
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
            <nav className="hidden items-center gap-6 md:flex flex-1 justify-center">
                {navLinks.map((link) => {
                    const IconComponent = link.icon;
                    const isHighlighted = 'highlighted' in link && link.highlighted;

                    if (isHighlighted) {
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="group relative overflow-hidden rounded-full p-[1px] transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                {/* Dönen Elektrik/Işık Hattı */}
                                <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#8b5cf6_50%,#3b82f6_100%)]" />

                                <div className="relative flex h-full items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-gray-900 backdrop-blur-3xl transition-colors group-hover:bg-white/90 dark:bg-slate-900 dark:text-white dark:group-hover:bg-slate-900/90">
                                    {/* Shimmer (İç Parlama) Efekti */}
                                    <div className="absolute inset-0 translate-x-[-100%] animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-blue-400/10" />

                                    {IconComponent && (
                                        <IconComponent className="h-4 w-4 text-blue-600 transition-transform group-hover:rotate-12 dark:text-blue-400" />
                                    )}
                                    <span className="relative">{link.name}</span>

                                    {/* Küçük bir Sparkle (Parıltı) Animasyonu */}
                                    <Sparkles className="absolute -right-1 -top-1 h-3 w-3 animate-bounce text-amber-400 opacity-0 transition-opacity group-hover:opacity-100" />
                                </div>
                            </Link>
                        );
                    }

                    return (
                        <a
                            key={link.name}
                            href={link.href}
                            className={cn(
                                'group flex items-center gap-2 text-sm font-medium transition-all duration-300 whitespace-nowrap',
                                scrolled
                                    ? 'text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400'
                                    : 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400',
                            )}
                        >
                            {IconComponent && (
                                <IconComponent className="h-4 w-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                            )}
                            <span>{link.name}</span>
                        </a>
                    );
                })}
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden items-center gap-3 md:flex flex-shrink-0">
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="default"
                                className="rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                            >
                                <User className="mr-2 h-4 w-4" />
                                Hesabım
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem asChild>
                                <Link href={dashboard()} className="flex items-center">
                                    <LayoutGrid className="mr-2 h-4 w-4" />
                                    Gösterge Panelim
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={favoritesIndex()} className="flex items-center">
                                    <Heart className="mr-2 h-4 w-4" />
                                    Favorilerim
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400">
                                <LogOut className="mr-2 h-4 w-4" />
                                Çıkış Yap
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <>
                        <Button
                            variant="ghost"
                            className="rounded-full"
                            asChild
                        >
                            <Link href={login.url()}>Giriş</Link>
                        </Button>
                        {canRegister && (
                            <Button
                                variant="default"
                                className="rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                                asChild
                            >
                                <Link href={register.url()}>Ücretsiz Hesap Oluştur</Link>
                            </Button>
                        )}
                    </>
                )}
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
                <div className="absolute left-0 right-0 top-24 flex flex-col gap-4 rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-slate-800/95 p-6 shadow-2xl backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-gradient-to-br dark:from-slate-950/95 dark:via-black/95 dark:to-slate-950/95">
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => {
                            const IconComponent = link.icon;
                            const isHighlighted = 'highlighted' in link && link.highlighted;

                            if (isHighlighted) {
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="group relative overflow-hidden rounded-2xl p-[1px] transition-all duration-300 active:scale-95"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#8b5cf6_50%,#3b82f6_100%)]" />
                                        <div className="relative flex w-full items-center gap-3 rounded-2xl bg-slate-900 px-4 py-4 text-lg font-bold text-white backdrop-blur-3xl">
                                            <div className="absolute inset-0 translate-x-[-100%] animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                            {IconComponent && <IconComponent className="h-5 w-5 text-blue-400" />}
                                            <span className="relative">{link.name}</span>
                                            <Sparkles className="ml-auto h-5 w-5 animate-bounce text-amber-400" />
                                        </div>
                                    </Link>
                                );
                            }

                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="flex items-center gap-2 text-lg font-medium text-white transition-colors hover:text-blue-400"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {IconComponent && <IconComponent className="h-5 w-5" />}
                                    {link.name}
                                </a>
                            );
                        })}
                        {user ? (
                            <>
                                <Link
                                    href={dashboard()}
                                    className="mt-4 block rounded-lg px-4 py-2 text-lg font-medium text-white hover:bg-white/10 dark:hover:bg-white/10"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Gösterge Panelim
                                </Link>
                                <Link
                                    href={favoritesIndex()}
                                    className="block rounded-lg px-4 py-2 text-lg font-medium text-white hover:bg-white/10 dark:hover:bg-white/10"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Favorilerim
                                </Link>
                                <Button
                                    className="mt-4 w-full rounded-full bg-red-600 hover:bg-red-700 dark:bg-red-600"
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    Çıkış Yap
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    className="mt-4 w-full rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600"
                                    asChild
                                >
                                    <Link href={login.url()} onClick={() => setIsMenuOpen(false)}>
                                        Giriş
                                    </Link>
                                </Button>
                                {canRegister && (
                                    <Button
                                        variant="outline"
                                        className="mt-2 w-full rounded-full border-white/20 text-white hover:bg-white/10 dark:border-white/20"
                                        asChild
                                    >
                                        <Link href={register.url()} onClick={() => setIsMenuOpen(false)}>
                                            Ücretsiz Hesap Oluştur
                                        </Link>
                                    </Button>
                                )}
                            </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}
