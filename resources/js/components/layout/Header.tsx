import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';
import { useAppearance } from '@/hooks/use-appearance';
import { dashboard, login, logout, register } from '@/routes';
import { index as favoritesIndex } from '@/routes/favorites/index';
import { index as plansIndex } from '@/routes/plans/index';
import { index as platformsIndex } from '@/routes/platforms/index';
import { index as wizardIndex } from '@/routes/wizard/index';
import { type SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import {
    Bell,
    Building2,
    Compass,
    Heart,
    LayoutGrid,
    LogOut,
    Menu,
    Percent,
    Rocket,
    ShoppingBag,
    Sparkles,
    User,
    UserCircle2,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { appearance, updateAppearance } = useAppearance();

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

    const isDark = appearance === 'dark' ||
        (appearance === 'system' &&
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches);

    const toggleTheme = (checked: boolean) => {
        updateAppearance(checked ? 'dark' : 'light');
    };

    // Dummy notifications
    const notifications = [
        {
            id: 1,
            title: 'Yeni Özellik: Plan Karşılaştırma',
            message:
                'Artık farklı e-ticaret planlarını kolayca karşılaştırabilirsiniz!',
            time: '2 saat önce',
            isNew: true,
        },
        {
            id: 2,
            title: 'Güncelleme: Shopify Planları',
            message:
                'Shopify planlarına yeni özellikler eklendi. Detayları inceleyin.',
            time: '5 saat önce',
            isNew: true,
        },
        {
            id: 3,
            title: 'Hoş Geldiniz!',
            message:
                "KobiStart'a hoş geldiniz. Size en uygun planı bulmak için sihirbazı kullanabilirsiniz.",
            time: '1 gün önce',
            isNew: false,
        },
    ];

    const navLinks = [
        {
            name: 'Platformlar',
            href: platformsIndex.url(),
            icon: Building2,
        },
        {
            name: 'Keşfet',
            href: plansIndex.url(),
            icon: Compass,
        },
        {
            name: 'Plan Öneri Sihirbazı',
            href: wizardIndex.url(),
            icon: Sparkles,
            highlighted: true,
        },
        {
            name: 'Kampanyalar',
            href: "/kampanyalar",
            icon: Percent,
        },
        {
            name: 'İşinizi Büyütün',
            href: "#",
            icon: Rocket,
        }

    ];

    return (
        <header
            className={cn(
                'fixed top-6 left-1/2 z-50 flex h-20 w-[90%] -translate-x-1/2 items-center justify-between rounded-full border px-8 transition-all duration-300 md:w-full md:max-w-6xl lg:max-w-[85%]',
                scrolled
                    ? 'border-white/40 bg-white/60 shadow-lg backdrop-blur-lg dark:border-white/10 dark:bg-slate-900/60'
                    : 'border-transparent bg-transparent',
            )}
        >
            {/* Logo */}
            <Link href="/" className="flex flex-shrink-0 items-center gap-2">
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
            <nav className="hidden flex-1 items-center justify-center gap-6 md:flex">
                {navLinks.map((link) => {
                    const IconComponent = link.icon;
                    const isHighlighted =
                        'highlighted' in link && link.highlighted;

                    if (isHighlighted) {
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                prefetch={true}
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
                                    <span className="relative">
                                        {link.name}
                                    </span>

                                    {/* Küçük bir Sparkle (Parıltı) Animasyonu */}
                                    <Sparkles className="absolute -top-1 -right-1 h-3 w-3 animate-bounce text-amber-400 opacity-0 transition-opacity group-hover:opacity-100" />
                                </div>
                            </Link>
                        );
                    }

                    return (
                        <a
                            key={link.name}
                            href={link.href}
                            className={cn(
                                'group flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-all duration-300',
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
            <div className="hidden flex-shrink-0 items-center gap-3 md:flex">
                {/* Dark Mode Toggle */}
                <ThemeToggle
                    checked={isDark}
                    onCheckedChange={toggleTheme}
                    aria-label={isDark ? 'Light mode\'a geç' : 'Dark mode\'a geç'}
                />

                {/* Notifications */}
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative cursor-pointer rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <Bell className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                            {notifications.filter((n) => n.isNew).length >
                                0 && (
                                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                                        {
                                            notifications.filter((n) => n.isNew)
                                                .length
                                        }
                                    </span>
                                )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <div className="px-2 py-1.5 text-sm font-semibold">
                            Bildirimler
                        </div>
                        <DropdownMenuSeparator />
                        <div className="max-h-96 overflow-y-auto">
                            {notifications.map((notification) => (
                                <DropdownMenuItem
                                    key={notification.id}
                                    className="flex cursor-pointer flex-col items-start gap-1 p-3"
                                >
                                    <div className="flex w-full items-start justify-between">
                                        <div className="flex-1">
                                            <div className="text-sm font-medium">
                                                {notification.title}
                                            </div>
                                            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                {notification.message}
                                            </div>
                                            <div className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                                                {notification.time}
                                            </div>
                                        </div>
                                        {notification.isNew && (
                                            <div className="mt-1 ml-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-600" />
                                        )}
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="default"
                                className="rounded-full bg-blue-600 text-sm hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                            >
                                <User className="mr-2 h-4 w-4" />
                                Hesabım
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem asChild>
                                <Link
                                    href={dashboard()}
                                    prefetch={true}
                                    className="flex items-center"
                                >
                                    <LayoutGrid className="mr-2 h-4 w-4" />
                                    Gösterge Panelim
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link
                                    href={favoritesIndex()}
                                    prefetch={true}
                                    className="flex items-center"
                                >
                                    <Heart className="mr-2 h-4 w-4" />
                                    Favorilerim
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="text-red-600 dark:text-red-400"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Çıkış Yap
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <>
                        {canRegister && (
                            <Button
                                variant="default"
                                className="rounded-full bg-blue-600 text-sm hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                                asChild
                            >
                                <Link href={login.url()}>
                                    <UserCircle2 className="mr-2 h-4 w-4" />
                                    Oturum Aç
                                </Link>
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
                    <X
                        className={cn(
                            'h-6 w-6',
                            scrolled
                                ? 'text-gray-900 dark:text-white'
                                : 'text-gray-900 dark:text-white',
                        )}
                    />
                ) : (
                    <Menu
                        className={cn(
                            'h-6 w-6',
                            scrolled
                                ? 'text-gray-900 dark:text-white'
                                : 'text-gray-900 dark:text-white',
                        )}
                    />
                )}
            </button>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="absolute top-24 right-0 left-0 flex flex-col gap-4 rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-slate-800/95 p-6 shadow-2xl backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-gradient-to-br dark:from-slate-950/95 dark:via-black/95 dark:to-slate-950/95">
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => {
                            const IconComponent = link.icon;
                            const isHighlighted =
                                'highlighted' in link && link.highlighted;

                            if (isHighlighted) {
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        prefetch={true}
                                        className="group relative overflow-hidden rounded-2xl p-[1px] transition-all duration-300 active:scale-95"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#8b5cf6_50%,#3b82f6_100%)]" />
                                        <div className="relative flex w-full items-center gap-3 rounded-2xl bg-slate-900 px-4 py-4 text-lg font-bold text-white backdrop-blur-3xl">
                                            <div className="absolute inset-0 translate-x-[-100%] animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                            {IconComponent && (
                                                <IconComponent className="h-5 w-5 text-blue-400" />
                                            )}
                                            <span className="relative">
                                                {link.name}
                                            </span>
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
                                    {IconComponent && (
                                        <IconComponent className="h-5 w-5" />
                                    )}
                                    {link.name}
                                </a>
                            );
                        })}
                        {user ? (
                            <>
                                <Link
                                    href={dashboard()}
                                    prefetch={true}
                                    className="mt-4 block rounded-lg px-4 py-2 text-lg font-medium text-white hover:bg-white/10 dark:hover:bg-white/10"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Gösterge Panelim
                                </Link>
                                <Link
                                    href={favoritesIndex()}
                                    prefetch={true}
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
                                    <Link
                                        href={login.url()}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Giriş
                                    </Link>
                                </Button>
                                {canRegister && (
                                    <Button
                                        variant="outline"
                                        className="mt-2 w-full rounded-full border-white/20 text-white hover:bg-white/10 dark:border-white/20"
                                        asChild
                                    >
                                        <Link
                                            href={register.url()}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Ücretsiz Hesap Oluştur
                                        </Link>
                                    </Button>
                                )}
                            </>
                        )}
                    </nav>
                    {/* Mobile Dark Mode Toggle */}
                    <div className="mt-4 flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                        <span className="text-sm font-medium text-white">
                            Tema
                        </span>
                        <ThemeToggle
                            checked={isDark}
                            onCheckedChange={toggleTheme}
                            aria-label={isDark ? 'Light mode\'a geç' : 'Dark mode\'a geç'}
                        />
                    </div>
                </div>
            )}
        </header>
    );
}
