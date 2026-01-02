import { Button } from '@/components/ui/button';
import {
    Command as CommandUI,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { GlassCard } from '@/components/ui/glass-card';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Platform } from '@/types';
import { router } from '@inertiajs/react';
import {
    ArrowRight,
    Check,
    Eye,
    GitCompare,
    Rocket,
    Search,
    ShoppingBag,
    Sparkles,
    TrendingUp,
    Trophy,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Hero({
    selectedItems,
    setSelectedItems,
    platforms,
}: {
    selectedItems: { platform: string; plan: string; planSlug: string }[];
    setSelectedItems: (
        items: { platform: string; plan: string; planSlug: string }[],
    ) => void;
    platforms: Platform[];
}) {
    const [searchValue, setSearchValue] = useState('');
    const [open, setOpen] = useState(false);
    const [isComparing, setIsComparing] = useState(false);
    const [currentStep, setCurrentStep] = useState<
        'actions' | 'platform' | 'plan'
    >('actions');
    const [tempPlatform, setTempPlatform] = useState<Platform | null>(null);
    const [showCompareButton, setShowCompareButton] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Platform araması için filtreleme
    const filteredPlatforms = platforms.filter((platform) => {
        // Eğer platform seçim adımındaysak ve searchValue seçili item formatındaysa (vs içeriyorsa veya parantez içinde plan adı varsa)
        // tüm platformları göster, filtreleme yapma
        if (currentStep === 'platform') {
            const hasSelectedItemFormat =
                searchValue.includes(' vs ') || searchValue.includes('(');
            if (hasSelectedItemFormat) {
                return true;
            }
        }

        // Normal arama filtrelemesi
        if (!searchValue.trim()) return true;
        const searchLower = searchValue.toLowerCase().trim();
        return (
            platform.name.toLowerCase().includes(searchLower) ||
            platform.slug.toLowerCase().includes(searchLower)
        );
    });

    // Typing Effect Logic
    const [placeholder, setPlaceholder] = useState('');
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const phrases = [
        'Kobistart ile e-ticaret yolculuğuna başla',
        'Kobistart ile paketleri karşılaştır',
        'Kobistart ile paketleri görüntüle',
        'Kobistart ile en uygun teklifi bul',
        'Kobistart ile işimi büyütmek istiyorum',
        'Kobistart ile işletme satın almak istiyorum',
    ];

    useEffect(() => {
        const currentPhrase = phrases[placeholderIndex];
        const typingSpeed = isDeleting ? 30 : 70;
        const nextActionDelay = isDeleting
            ? charIndex === 0
                ? 500
                : typingSpeed
            : charIndex === currentPhrase.length
              ? 2000
              : typingSpeed;

        const timeout = setTimeout(() => {
            if (!isDeleting && charIndex < currentPhrase.length) {
                setPlaceholder((prev) => prev + currentPhrase[charIndex]);
                setCharIndex((prev) => prev + 1);
            } else if (isDeleting && charIndex > 0) {
                setPlaceholder((prev) => prev.slice(0, -1));
                setCharIndex((prev) => prev - 1);
            } else if (!isDeleting && charIndex === currentPhrase.length) {
                setIsDeleting(true);
            } else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setPlaceholderIndex((prev) => (prev + 1) % phrases.length);
            }
        }, nextActionDelay);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, placeholderIndex]);

    const handleSelect = (platform: Platform) => {
        setTempPlatform(platform);
        setCurrentStep('plan');
    };

    const handlePlanSelect = (planSlug: string) => {
        if (!tempPlatform) return;

        const plan = tempPlatform.plans?.find((p) => p.slug === planSlug);
        if (!plan) return;

        const newItem = {
            platform: tempPlatform.slug,
            plan: plan.name,
            planSlug: plan.slug,
        };

        let newItems;
        if (selectedItems.length >= 2) {
            newItems = [newItem];
        } else if (selectedItems.length === 1) {
            newItems = [...selectedItems, newItem];
        } else {
            newItems = [newItem];
        }

        setSelectedItems(newItems);

        const displayValue = newItems
            .map((item) => {
                const p = platforms.find((p) => p.slug === item.platform);
                return `${p?.name} (${item.plan})`;
            })
            .join(' vs ');

        setSearchValue(displayValue + (newItems.length === 1 ? ' vs ' : ''));

        setCurrentStep('platform');
        setTempPlatform(null);

        if (newItems.length === 2) {
            setShowCompareButton(true);
            setOpen(false);
        }
    };

    const handleCompare = () => {
        if (selectedItems.length < 2) return;
        setIsComparing(true);

        // Build comparison URL: /compare/{platform-slug}-{plan-slug}-vs-{platform-slug}-{plan-slug}
        const comparison = selectedItems
            .map((item) => `${item.platform}-${item.planSlug}`)
            .join('-vs-');

        router.visit(`/compare/${comparison}`, {
            onFinish: () => setIsComparing(false),
        });
    };

    const clearSearch = () => {
        setSearchValue('');
        setSelectedItems([]);
        setCurrentStep('actions');
        setTempPlatform(null);
        setShowCompareButton(false);
    };

    useEffect(() => {
        if (searchValue === '') {
            setSelectedItems([]);
            setCurrentStep('actions');
            setTempPlatform(null);
            setShowCompareButton(false);
        }
    }, [searchValue]);

    const handleActionSelect = (action: string) => {
        if (action === 'Paketleri karşılaştır') {
            setCurrentStep('platform');
        }
        // Diğer aksiyonlar için ileride işlemler eklenebilir
    };

    return (
        <section
            id="comparison"
            className="relative overflow-hidden bg-slate-50/50 pt-24 pb-20 lg:pt-32 lg:pb-32 dark:bg-slate-950/50"
        >
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-1/2 -z-10 h-[800px] w-[1200px] -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-b from-blue-500/10 via-violet-500/5 to-transparent blur-[120px] dark:from-blue-500/20 dark:via-violet-500/10" />
            <div className="animate-float absolute top-[20%] right-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-blue-400/10 blur-[100px] dark:bg-blue-500/20" />
            <div className="animate-float absolute bottom-[10%] left-[-5%] -z-10 h-[300px] w-[300px] rounded-full bg-violet-400/10 blur-[80px] [animation-delay:2s] dark:bg-violet-500/20" />

            <div className="container mx-auto px-4 text-center">
                {/* AI Badge */}
                <div className="mb-6 inline-flex animate-in items-center gap-2.5 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-sm font-semibold text-blue-600 backdrop-blur-sm duration-700 fade-in slide-in-from-bottom-4 dark:text-blue-400">
                    <Sparkles className="h-4 w-4 fill-blue-500/20" />
                    Yeni Nesil E-Ticaret Partneriniz
                </div>

                <h1 className="mx-auto mb-6 max-w-5xl font-display text-3xl leading-[1.1] font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-slate-50">
                    <span className="inline-block animate-in duration-1000 fill-mode-both fade-in slide-in-from-bottom-8">
                        En Doğru E-Ticaret
                    </span>
                    <br className="hidden md:block" />
                    <span className="inline-block animate-in delay-150 duration-1000 fill-mode-both fade-in slide-in-from-bottom-12">
                        Kararını
                    </span>{' '}
                    <span className="relative inline-block animate-in delay-300 duration-1000 fill-mode-both fade-in slide-in-from-bottom-16">
                        <span className="animate-gradient-x bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-[length:200%_auto] bg-clip-text text-transparent dark:from-blue-400 dark:via-violet-400 dark:to-blue-400">
                            Saniyeler İçinde Ver.
                        </span>
                        <span className="absolute -bottom-2 left-0 h-1.5 w-full scale-x-0 bg-gradient-to-r from-blue-600 to-violet-600 transition-transform delay-700 duration-1000 group-hover:scale-x-100 dark:from-blue-400 dark:to-violet-400" />
                    </span>
                </h1>

                <p className="mx-auto mb-10 max-w-2xl animate-in text-xl leading-relaxed text-gray-600 delay-200 duration-1000 fade-in slide-in-from-bottom-8 dark:text-gray-400">
                    Binlerce veri noktasını analiz ediyoruz. Sadece platformları
                    yaz ve gerisini bize bırak.
                </p>

                {/* Main Search Experience */}
                <div className="relative mx-auto max-w-4xl">
                    <GlassCard className="relative z-10 animate-in rounded-[3rem] border-white/40 bg-white/40 p-2 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] delay-300 duration-1000 zoom-in-95 sm:p-4 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)]">
                        <div className="group relative">
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <div
                                        className={cn(
                                            'relative flex items-center rounded-[2.5rem] border-2 bg-white/90 p-2 transition-all duration-500 focus:outline-none dark:bg-slate-900/90',
                                            open
                                                ? 'border-blue-500/50 ring-4 ring-blue-500/5'
                                                : 'border-transparent',
                                        )}
                                    >
                                        <div className="ml-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                            <Search className="h-6 w-6" />
                                        </div>

                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={searchValue}
                                            onChange={(e) =>
                                                setSearchValue(e.target.value)
                                            }
                                            onFocus={() => setOpen(true)}
                                            onClick={(e) => e.stopPropagation()}
                                            placeholder={placeholder}
                                            className="w-full border-none bg-transparent px-4 py-2 text-xl font-medium text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:outline-none dark:text-white dark:placeholder:text-gray-600"
                                        />

                                        {searchValue && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    clearSearch();
                                                }}
                                                className="mr-2 p-2 text-gray-400 transition-colors hover:text-gray-600 focus:outline-none dark:hover:text-gray-200"
                                            >
                                                <svg
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        )}

                                        {showCompareButton && (
                                            <Button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCompare();
                                                }}
                                                disabled={
                                                    selectedItems.length < 2 ||
                                                    isComparing
                                                }
                                                size="lg"
                                                className={cn(
                                                    'h-14 rounded-full px-8 text-lg font-bold shadow-xl transition-all duration-500 disabled:cursor-not-allowed',
                                                    selectedItems.length >= 2
                                                        ? 'bg-blue-600 text-white shadow-blue-500/20 hover:bg-blue-700'
                                                        : 'border border-transparent bg-gray-100 text-gray-400 dark:border-white/5 dark:bg-slate-800 dark:text-gray-500',
                                                )}
                                            >
                                                {isComparing ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                        Analiz...
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        Karşılaştır
                                                        <ArrowRight className="h-5 w-5" />
                                                    </div>
                                                )}
                                            </Button>
                                        )}
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="mt-2 w-[calc(var(--radix-popover-trigger-width)-1rem)] overflow-hidden rounded-3xl border-white/20 bg-white/95 p-0 shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-2xl dark:bg-slate-900/95"
                                    align="center"
                                    onOpenAutoFocus={(e) => e.preventDefault()}
                                >
                                    <CommandUI
                                        className="bg-transparent"
                                        shouldFilter={false}
                                    >
                                        <CommandList className="max-h-[400px]">
                                            {currentStep === 'actions' ? (
                                                <CommandGroup
                                                    heading="Kobistart ile"
                                                    className="p-3"
                                                >
                                                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                                        <CommandItem
                                                            value="E-ticaret yolculuğuna başla"
                                                            disabled
                                                            className="flex cursor-not-allowed items-center gap-3 rounded-2xl border border-transparent p-4 opacity-60 transition-all"
                                                        >
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/10">
                                                                <Rocket className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                            </div>
                                                            <div className="flex flex-1 flex-col">
                                                                <span className="font-bold text-gray-900 dark:text-slate-100">
                                                                    E-ticaret
                                                                    yolculuğuna
                                                                    başla
                                                                </span>
                                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                    Çok yakında
                                                                </span>
                                                            </div>
                                                        </CommandItem>
                                                        <CommandItem
                                                            value="Paketleri karşılaştır"
                                                            onSelect={() =>
                                                                handleActionSelect(
                                                                    'Paketleri karşılaştır',
                                                                )
                                                            }
                                                            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-transparent p-4 transition-all hover:border-blue-500/20 aria-selected:bg-blue-500/10 aria-selected:text-blue-600 dark:aria-selected:bg-blue-500/20 dark:aria-selected:text-blue-400"
                                                        >
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-50 dark:bg-violet-500/10">
                                                                <GitCompare className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-gray-900 dark:text-slate-100">
                                                                    Paketleri
                                                                    karşılaştır
                                                                </span>
                                                            </div>
                                                        </CommandItem>
                                                        <CommandItem
                                                            value="Paketleri görüntüle"
                                                            disabled
                                                            className="flex cursor-not-allowed items-center gap-3 rounded-2xl border border-transparent p-4 opacity-60 transition-all"
                                                        >
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 dark:bg-green-500/10">
                                                                <Eye className="h-5 w-5 text-green-600 dark:text-green-400" />
                                                            </div>
                                                            <div className="flex flex-1 flex-col">
                                                                <span className="font-bold text-gray-900 dark:text-slate-100">
                                                                    Paketleri
                                                                    görüntüle
                                                                </span>
                                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                    Çok yakında
                                                                </span>
                                                            </div>
                                                        </CommandItem>
                                                        <CommandItem
                                                            value="En uygun teklifi bul"
                                                            disabled
                                                            className="flex cursor-not-allowed items-center gap-3 rounded-2xl border border-transparent p-4 opacity-60 transition-all"
                                                        >
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-500/10">
                                                                <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                                            </div>
                                                            <div className="flex flex-1 flex-col">
                                                                <span className="font-bold text-gray-900 dark:text-slate-100">
                                                                    En uygun
                                                                    teklifi bul
                                                                </span>
                                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                    Çok yakında
                                                                </span>
                                                            </div>
                                                        </CommandItem>
                                                        <CommandItem
                                                            value="İşimi büyütmek istiyorum"
                                                            disabled
                                                            className="flex cursor-not-allowed items-center gap-3 rounded-2xl border border-transparent p-4 opacity-60 transition-all"
                                                        >
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10">
                                                                <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                                            </div>
                                                            <div className="flex flex-1 flex-col">
                                                                <span className="font-bold text-gray-900 dark:text-slate-100">
                                                                    İşimi
                                                                    büyütmek
                                                                    istiyorum
                                                                </span>
                                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                    Çok yakında
                                                                </span>
                                                            </div>
                                                        </CommandItem>
                                                        <CommandItem
                                                            value="İşletme satın almak istiyorum"
                                                            disabled
                                                            className="flex cursor-not-allowed items-center gap-3 rounded-2xl border border-transparent p-4 opacity-60 transition-all"
                                                        >
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-500/10">
                                                                <ShoppingBag className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                                            </div>
                                                            <div className="flex flex-1 flex-col">
                                                                <span className="font-bold text-gray-900 dark:text-slate-100">
                                                                    İşletme
                                                                    satın almak
                                                                    istiyorum
                                                                </span>
                                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                    Çok yakında
                                                                </span>
                                                            </div>
                                                        </CommandItem>
                                                    </div>
                                                </CommandGroup>
                                            ) : currentStep === 'platform' ? (
                                                <>
                                                    {filteredPlatforms.length ===
                                                        0 && (
                                                        <CommandEmpty className="py-12 text-center">
                                                            <div className="flex flex-col items-center gap-3">
                                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 dark:bg-white/5">
                                                                    <Search className="h-6 w-6 text-gray-300" />
                                                                </div>
                                                                <p className="text-sm text-gray-500">
                                                                    Platform
                                                                    bulunamadı.
                                                                </p>
                                                            </div>
                                                        </CommandEmpty>
                                                    )}
                                                    <CommandGroup
                                                        heading="Platform Seçin"
                                                        className="p-3"
                                                    >
                                                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                                            {filteredPlatforms.map(
                                                                (platform) => (
                                                                    <CommandItem
                                                                        key={
                                                                            platform.id
                                                                        }
                                                                        value={
                                                                            platform.slug
                                                                        }
                                                                        onSelect={() =>
                                                                            handleSelect(
                                                                                platform,
                                                                            )
                                                                        }
                                                                        className="flex cursor-pointer items-center gap-3 rounded-2xl border border-transparent p-4 transition-all hover:border-blue-500/20 aria-selected:bg-blue-500/10 aria-selected:text-blue-600 dark:aria-selected:bg-blue-500/20 dark:aria-selected:text-blue-400"
                                                                    >
                                                                        {platform.favicon ? (
                                                                            <img
                                                                                src={
                                                                                    platform.favicon
                                                                                }
                                                                                alt={
                                                                                    platform.name
                                                                                }
                                                                                className="h-6 w-6 shrink-0 object-contain"
                                                                            />
                                                                        ) : (
                                                                            <div className="h-3 w-3 shrink-0 rounded-full bg-gray-400" />
                                                                        )}
                                                                        <div className="flex flex-col">
                                                                            <span className="font-bold text-gray-900 dark:text-slate-100">
                                                                                {
                                                                                    platform.name
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                        {selectedItems.some(
                                                                            (
                                                                                item,
                                                                            ) =>
                                                                                item.platform ===
                                                                                platform.slug,
                                                                        ) && (
                                                                            <Check className="ml-auto h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                                        )}
                                                                    </CommandItem>
                                                                ),
                                                            )}
                                                        </div>
                                                        <button
                                                            onClick={() =>
                                                                setCurrentStep(
                                                                    'actions',
                                                                )
                                                            }
                                                            className="mt-4 w-full p-2 text-xs text-blue-600 hover:underline dark:text-blue-400"
                                                        >
                                                            ← İşlemlere Dön
                                                        </button>
                                                    </CommandGroup>
                                                </>
                                            ) : (
                                                <>
                                                    {tempPlatform &&
                                                        (!tempPlatform.plans ||
                                                            tempPlatform.plans
                                                                .length ===
                                                                0) && (
                                                            <CommandEmpty className="py-12 text-center">
                                                                <div className="flex flex-col items-center gap-3">
                                                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 dark:bg-white/5">
                                                                        <Search className="h-6 w-6 text-gray-300" />
                                                                    </div>
                                                                    <p className="text-sm text-gray-500">
                                                                        Paket
                                                                        bulunamadı.
                                                                    </p>
                                                                </div>
                                                            </CommandEmpty>
                                                        )}
                                                    <CommandGroup
                                                        heading={`${tempPlatform?.name} Paketi Seçin`}
                                                        className="p-3"
                                                    >
                                                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                                            {tempPlatform?.plans?.map(
                                                                (plan) => (
                                                                    <CommandItem
                                                                        key={
                                                                            plan.id
                                                                        }
                                                                        value={
                                                                            plan.slug
                                                                        }
                                                                        onSelect={() =>
                                                                            handlePlanSelect(
                                                                                plan.slug,
                                                                            )
                                                                        }
                                                                        className="flex cursor-pointer items-center gap-3 rounded-2xl border border-transparent p-4 transition-all hover:border-blue-500/20 aria-selected:bg-blue-500/10 aria-selected:text-blue-600 dark:aria-selected:bg-blue-500/20 dark:aria-selected:text-blue-400"
                                                                    >
                                                                        <div className="flex flex-col">
                                                                            <span className="font-bold text-gray-900 dark:text-slate-100">
                                                                                {
                                                                                    plan.name
                                                                                }
                                                                            </span>
                                                                            <span className="text-[10px] tracking-tighter text-gray-500 uppercase">
                                                                                Plan
                                                                                Özellikleri
                                                                            </span>
                                                                        </div>
                                                                        {selectedItems.some(
                                                                            (
                                                                                item,
                                                                            ) =>
                                                                                item.platform ===
                                                                                    tempPlatform.slug &&
                                                                                item.plan ===
                                                                                    plan.name,
                                                                        ) && (
                                                                            <Check className="ml-auto h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                                        )}
                                                                    </CommandItem>
                                                                ),
                                                            )}
                                                        </div>
                                                        <button
                                                            onClick={() =>
                                                                setCurrentStep(
                                                                    'platform',
                                                                )
                                                            }
                                                            className="mt-4 w-full p-2 text-xs text-blue-600 hover:underline dark:text-blue-400"
                                                        >
                                                            ← Platform Seçimine
                                                            Dön
                                                        </button>
                                                    </CommandGroup>
                                                </>
                                            )}
                                        </CommandList>
                                    </CommandUI>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </section>
    );
}
