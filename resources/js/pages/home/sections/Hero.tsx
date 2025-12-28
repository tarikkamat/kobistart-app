import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { ArrowRight, Check, Search, Globe, Zap, BarChart3, ShieldCheck, Sparkles, Command } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
    Command as CommandUI,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

const platforms = [
    { value: 'shopify', label: 'Shopify', color: 'bg-[#96bf48]' },
    { value: 'woocommerce', label: 'WooCommerce', color: 'bg-[#96588a]' },
    { value: 'wix', label: 'Wix', color: 'bg-[#000000]' },
    { value: 'bigcommerce', label: 'BigCommerce', color: 'bg-[#000000]' },
    { value: 'ideasosoft', label: 'Ideasosoft', color: 'bg-[#0057ff]' },
    { value: 'ticimax', label: 'Ticimax', color: 'bg-[#ff0000]' },
    { value: 'magento', label: 'Magento', color: 'bg-[#f46f25]' },
    { value: 'opencart', label: 'OpenCart', color: 'bg-[#239cd3]' },
];

export default function Hero() {
    const [searchValue, setSearchValue] = useState('');
    const [open, setOpen] = useState(false);
    const [isComparing, setIsComparing] = useState(false);
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSelect = (platform: typeof platforms[0]) => {
        if (selectedPlatforms.length >= 2) {
            setSelectedPlatforms([platform.value]);
            setSearchValue(platform.label + ' vs ');
        } else if (selectedPlatforms.length === 1) {
            if (selectedPlatforms[0] === platform.value) return;
            setSelectedPlatforms([...selectedPlatforms, platform.value]);
            setSearchValue(platforms.find(p => p.value === selectedPlatforms[0])?.label + ' vs ' + platform.label);
            setOpen(false);
        } else {
            setSelectedPlatforms([platform.value]);
            setSearchValue(platform.label + ' vs ');
        }
    };

    const handleCompare = () => {
        if (selectedPlatforms.length < 2) return;
        setIsComparing(true);
        setTimeout(() => setIsComparing(false), 2000);
    };

    const clearSearch = () => {
        setSearchValue('');
        setSelectedPlatforms([]);
    };

    useEffect(() => {
        if (searchValue === '') setSelectedPlatforms([]);
    }, [searchValue]);

    return (
        <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-32 bg-slate-50 dark:bg-[#020617]">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-1/2 -z-10 h-[800px] w-[1200px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/10 via-violet-500/5 to-transparent blur-[120px]" />
            <div className="absolute top-[20%] right-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-blue-400/10 blur-[100px] animate-pulse" />
            <div className="absolute bottom-[10%] left-[-5%] -z-10 h-[300px] w-[300px] rounded-full bg-violet-400/10 blur-[80px]" />

            <div className="container mx-auto px-4 text-center">
                {/* AI Badge */}
                <div className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Sparkles className="h-4 w-4 fill-blue-500/20" />
                    Yeni Nesil E-Ticaret Karşılaştırma
                </div>

                <h1 className="mx-auto mb-8 max-w-5xl text-5xl font-extrabold leading-[1.1] tracking-tight text-gray-900 md:text-7xl dark:text-white animate-in fade-in slide-in-from-bottom-6 duration-1000">
                    En Doğru E-Ticaret Kararını <br className="hidden md:block" />
                    <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Saniyeler İçinde Ver.</span>
                </h1>

                <p className="mx-auto mb-16 max-w-2xl text-xl text-gray-600 dark:text-gray-400 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    Binlerce veri noktasını analiz ediyoruz. Sadece platformları yaz ve gerisini bize bırak.
                </p>

                {/* Main Search Experience */}
                <div className="mx-auto max-w-4xl relative">
                    <GlassCard className="p-2 sm:p-4 rounded-[3rem] border-white/40 dark:border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] bg-white/40 dark:bg-white/5 relative z-10 animate-in zoom-in-95 duration-1000 delay-300">
                        <div className="relative group">
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <div className={cn(
                                        "relative flex items-center bg-white dark:bg-slate-900/80 rounded-[2.5rem] p-2 transition-all duration-500 border-2",
                                        open ? "border-blue-500/50 ring-4 ring-blue-500/5" : "border-transparent"
                                    )}>
                                        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 shrink-0 ml-1">
                                            <Search className="h-6 w-6" />
                                        </div>
                                        
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value)}
                                            onFocus={() => setOpen(true)}
                                            placeholder="Örn: Shopify vs WooCommerce"
                                            className="w-full bg-transparent border-none focus:ring-0 text-xl font-medium px-4 py-2 placeholder:text-gray-400 dark:placeholder:text-gray-600"
                                        />

                                        {searchValue && (
                                            <button 
                                                onClick={clearSearch}
                                                className="p-2 mr-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                            >
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        )}

                                        <Button
                                            onClick={handleCompare}
                                            disabled={selectedPlatforms.length < 2 || isComparing}
                                            size="lg"
                                            className={cn(
                                                "h-14 rounded-full px-8 text-lg font-bold transition-all duration-500 shadow-xl",
                                                selectedPlatforms.length >= 2 
                                                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20" 
                                                    : "bg-gray-100 dark:bg-white/5 text-gray-400"
                                            )}
                                        >
                                            {isComparing ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Analiz...
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    Karşılaştır
                                                    <ArrowRight className="h-5 w-5" />
                                                </div>
                                            )}
                                        </Button>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent 
                                    className="w-[calc(var(--radix-popover-trigger-width)-1rem)] p-0 mt-2 rounded-3xl border-white/20 bg-white/95 backdrop-blur-2xl dark:bg-slate-900/95 shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden" 
                                    align="center"
                                    onOpenAutoFocus={(e) => e.preventDefault()}
                                >
                                    <CommandUI className="bg-transparent">
                                        <CommandList className="max-h-[400px]">
                                            <CommandEmpty className="py-12 text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="h-12 w-12 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                                                        <Search className="h-6 w-6 text-gray-300" />
                                                    </div>
                                                    <p className="text-sm text-gray-500">Platform bulunamadı.</p>
                                                </div>
                                            </CommandEmpty>
                                            <CommandGroup heading="Platform Seçin" className="p-3">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    {platforms.map((platform) => (
                                                        <CommandItem
                                                            key={platform.value}
                                                            value={platform.value}
                                                            onSelect={() => handleSelect(platform)}
                                                            className="rounded-2xl flex items-center gap-3 p-4 cursor-pointer aria-selected:bg-blue-500/10 aria-selected:text-blue-600 transition-all border border-transparent hover:border-blue-500/20"
                                                        >
                                                            <div className={cn("h-3 w-3 rounded-full shrink-0", platform.color)} />
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-gray-900 dark:text-white">{platform.label}</span>
                                                                <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Ekosistem Analizi</span>
                                                            </div>
                                                            {selectedPlatforms.includes(platform.value) && (
                                                                <Check className="h-5 w-5 text-blue-600 ml-auto" />
                                                            )}
                                                        </CommandItem>
                                                    ))}
                                                </div>
                                            </CommandGroup>
                                        </CommandList>
                                    </CommandUI>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </GlassCard>

                    {/* Quick Suggestions & Trust */}
                    <div className="mt-12 flex flex-col items-center gap-8 animate-in fade-in duration-1000 delay-500">
                        <div className="flex flex-wrap justify-center gap-3">
                            <span className="text-sm font-semibold text-gray-400 dark:text-gray-500 py-1.5 flex items-center gap-2">
                                <Zap className="h-4 w-4 text-amber-500" />
                                Hızlı Kıyasla:
                            </span>
                            {[
                                { a: 'shopify', b: 'woocommerce', label: 'Shopify vs WooCommerce' },
                                { a: 'ticimax', b: 'ideasosoft', label: 'Ticimax vs Ideasosoft' },
                                { a: 'wix', b: 'shopify', label: 'Wix vs Shopify' }
                            ].map((s, i) => (
                                <button 
                                    key={i}
                                    onClick={() => {
                                        setSelectedPlatforms([s.a, s.b]);
                                        setSearchValue(`${platforms.find(p => p.value === s.a)?.label} vs ${platforms.find(p => p.value === s.b)?.label}`);
                                    }}
                                    className="px-4 py-2 rounded-full text-sm font-bold bg-white/50 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-all border border-gray-200 dark:border-white/5 shadow-sm"
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-8 pt-8 border-t border-gray-200/50 dark:border-white/5 w-full justify-center">
                            <div className="flex items-center gap-2.5">
                                <ShieldCheck className="h-5 w-5 text-green-500" />
                                <span className="text-sm font-bold text-gray-600 dark:text-gray-400">Şeffaf Veri</span>
                            </div>
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
                            <div className="flex items-center gap-2.5">
                                <Globe className="h-5 w-5 text-blue-500" />
                                <span className="text-sm font-bold text-gray-600 dark:text-gray-400">Global Standartlar</span>
                            </div>
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
                            <div className="flex items-center gap-2.5">
                                <BarChart3 className="h-5 w-5 text-violet-500" />
                                <span className="text-sm font-bold text-gray-600 dark:text-gray-400">Anlık Analiz</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
