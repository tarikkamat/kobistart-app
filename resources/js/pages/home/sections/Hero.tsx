import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { ArrowRight, Check, ChevronsUpDown, Zap, BarChart3, ShieldCheck, Search, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
    Command,
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

function PlatformSelector({
    placeholder,
    value,
    setValue,
    label,
}: {
    placeholder: string;
    value: string;
    setValue: (val: string) => void;
    label: string;
}) {
    const [open, setOpen] = useState(false);
    const selectedPlatform = platforms.find((p) => p.value === value);

    return (
        <div className="group relative w-full">
            <label className="mb-2.5 block text-xs font-bold tracking-wider uppercase text-gray-400 dark:text-gray-500 ml-1 transition-colors group-hover:text-blue-500">
                {label}
            </label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            "w-full justify-between h-16 rounded-2xl border-white/20 bg-white/40 text-lg transition-all duration-300 backdrop-blur-md hover:border-blue-500/50 hover:bg-white/60 dark:border-white/5 dark:bg-white/5 dark:hover:bg-white/10 shadow-sm",
                            value && "border-blue-500/30 ring-2 ring-blue-500/5"
                        )}
                    >
                        <div className="flex items-center gap-3 overflow-hidden">
                            {selectedPlatform ? (
                                <>
                                    <div className={cn("h-3 w-3 rounded-full shrink-0 animate-pulse", selectedPlatform.color)} />
                                    <span className="truncate font-semibold text-gray-900 dark:text-white">
                                        {selectedPlatform.label}
                                    </span>
                                </>
                            ) : (
                                <span className="text-gray-400 dark:text-gray-500">{placeholder}</span>
                            )}
                        </div>
                        <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 opacity-40 transition-transform group-hover:scale-110" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 rounded-2xl border-white/20 bg-white/90 backdrop-blur-2xl dark:bg-black/90 shadow-2xl overflow-hidden" align="start">
                    <Command className="bg-transparent">
                        <div className="flex items-center border-b border-white/10 px-3">
                            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                            <CommandInput placeholder="Platform ara..." className="h-12 bg-transparent border-none focus:ring-0" />
                        </div>
                        <CommandList className="max-h-[300px]">
                            <CommandEmpty className="py-6 text-center text-sm text-gray-500">Platform bulunamadı.</CommandEmpty>
                            <CommandGroup className="p-2">
                                {platforms.map((platform) => (
                                    <CommandItem
                                        key={platform.value}
                                        value={platform.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? '' : currentValue);
                                            setOpen(false);
                                        }}
                                        className="rounded-xl flex items-center gap-3 p-3 cursor-pointer aria-selected:bg-blue-500/10 aria-selected:text-blue-600 transition-colors"
                                    >
                                        <div className={cn("h-2.5 w-2.5 rounded-full shrink-0", platform.color)} />
                                        <span className="flex-1 font-medium">{platform.label}</span>
                                        {value === platform.value && <Check className="h-4 w-4 text-blue-500" />}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default function Hero() {
    const [platformA, setPlatformA] = useState('');
    const [platformB, setPlatformB] = useState('');
    const [isComparing, setIsComparing] = useState(false);

    const handleCompare = () => {
        if (!platformA || !platformB) return;
        setIsComparing(true);
        // Simulate analysis
        setTimeout(() => setIsComparing(false), 2000);
    };

    return (
        <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-32 bg-slate-50 dark:bg-[#020617]">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-1/2 -z-10 h-[800px] w-[1200px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/10 via-violet-500/5 to-transparent blur-[120px]" />
            <div className="absolute top-[20%] right-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-blue-400/10 blur-[100px] animate-pulse" />
            <div className="absolute bottom-[10%] left-[-5%] -z-10 h-[300px] w-[300px] rounded-full bg-violet-400/10 blur-[80px]" />

            <div className="container mx-auto px-4 text-center">
                {/* Badge */}
                <div className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    AI Destekli Karşılaştırma 2.0
                </div>

                <h1 className="mx-auto mb-8 max-w-5xl text-5xl font-extrabold leading-[1.1] tracking-tight text-gray-900 md:text-7xl dark:text-white animate-in fade-in slide-in-from-bottom-6 duration-1000">
                    E-Ticaretin Geleceğini <br className="hidden md:block" />
                    <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Verilerle Karşılaştır.</span>
                </h1>

                <p className="mx-auto mb-16 max-w-2xl text-xl text-gray-600 dark:text-gray-400 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    Sadece özellikler değil; gizli maliyetler, hız testleri ve senin için en doğru kâr marjı analizi.
                </p>

                {/* Main Interaction Hub */}
                <div className="mx-auto max-w-5xl relative">
                    {/* Floating Decorative Elements */}
                    <div className="absolute -top-12 -left-8 hidden lg:block animate-bounce [animation-duration:3s]">
                        <GlassCard className="p-3 flex items-center gap-2 rounded-2xl border-white/40 dark:border-white/10 shadow-xl bg-white/50 dark:bg-white/5">
                            <div className="h-8 w-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-600">
                                <Zap className="h-4 w-4" />
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Hız Analizi</p>
                                <p className="text-xs font-semibold">98.4ms Yanıt</p>
                            </div>
                        </GlassCard>
                    </div>

                    <div className="absolute -bottom-8 -right-8 hidden lg:block animate-bounce [animation-duration:4s]">
                        <GlassCard className="p-3 flex items-center gap-2 rounded-2xl border-white/40 dark:border-white/10 shadow-xl bg-white/50 dark:bg-white/5">
                            <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-600">
                                <BarChart3 className="h-4 w-4" />
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Maliyet Tahmini</p>
                                <p className="text-xs font-semibold">%12 Tasarruf</p>
                            </div>
                        </GlassCard>
                    </div>

                    <GlassCard className="p-3 sm:p-6 rounded-[2.5rem] border-white/40 dark:border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] bg-white/40 dark:bg-white/5 relative z-10 animate-in zoom-in-95 duration-1000 delay-300">
                        <div className="bg-white/80 dark:bg-[#0f172a]/50 rounded-[2rem] p-6 sm:p-10 border border-white/20 dark:border-white/5 shadow-inner">
                            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-4 lg:gap-8">
                                
                                {/* Platform A Selector */}
                                <div className="flex-1 w-full">
                                    <PlatformSelector
                                        label="Kıyaslanan Platform"
                                        placeholder="Platform seçin..."
                                        value={platformA}
                                        setValue={setPlatformA}
                                    />
                                </div>

                                {/* Dynamic VS Element */}
                                <div className="relative flex items-center justify-center">
                                    <div className={cn(
                                        "h-16 w-16 rounded-full flex items-center justify-center text-xl font-black tracking-tighter transition-all duration-500 shadow-2xl z-10",
                                        platformA && platformB 
                                            ? "bg-gradient-to-br from-blue-600 to-violet-600 text-white scale-110 ring-8 ring-blue-500/10" 
                                            : "bg-gray-100 dark:bg-white/5 text-gray-400 scale-100"
                                    )}>
                                        VS
                                    </div>
                                    <div className={cn(
                                        "absolute inset-0 h-16 w-16 rounded-full bg-blue-500/20 blur-xl transition-opacity duration-500",
                                        platformA && platformB ? "opacity-100 animate-pulse" : "opacity-0"
                                    )} />
                                </div>

                                {/* Platform B Selector */}
                                <div className="flex-1 w-full">
                                    <PlatformSelector
                                        label="Rakip Platform"
                                        placeholder="Platform seçin..."
                                        value={platformB}
                                        setValue={setPlatformB}
                                    />
                                </div>

                                {/* Action Button */}
                                <div className="w-full md:w-auto md:pt-6">
                                    <Button
                                        onClick={handleCompare}
                                        disabled={!platformA || !platformB || isComparing}
                                        size="lg"
                                        className={cn(
                                            "w-full md:w-auto h-16 rounded-2xl text-lg font-bold px-10 transition-all duration-500 shadow-lg",
                                            platformA && platformB 
                                                ? "bg-gray-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-100 shadow-blue-500/20" 
                                                : "bg-gray-100 dark:bg-white/5 text-gray-400 pointer-events-none"
                                        )}
                                    >
                                        {isComparing ? (
                                            <div className="flex items-center gap-2">
                                                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Analiz Ediliyor...
                                            </div>
                                        ) : (
                                            <>
                                                Karşılaştır
                                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {/* Trust Signals & Suggestions */}
                            <div className="mt-10 pt-8 border-t border-gray-200/50 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
                                    <span className="flex items-center gap-1.5 text-green-600 dark:text-green-500">
                                        <ShieldCheck className="h-4 w-4" />
                                        Güncel Veri
                                    </span>
                                    <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-700" />
                                    <span className="flex items-center gap-1.5">
                                        <Globe className="h-4 w-4" />
                                        12+ Global Platform
                                    </span>
                                </div>

                                <div className="flex flex-wrap justify-center gap-3">
                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 py-1.5">Popüler:</span>
                                    <button 
                                        onClick={() => { setPlatformA('shopify'); setPlatformB('woocommerce') }}
                                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors border border-blue-200/50 dark:border-blue-500/20"
                                    >
                                        Shopify vs WooCommerce
                                    </button>
                                    <button 
                                        onClick={() => { setPlatformA('ticimax'); setPlatformB('ideasosoft') }}
                                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-500/20 transition-colors border border-violet-200/50 dark:border-violet-500/20"
                                    >
                                        Ticimax vs Ideasosoft
                                    </button>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Performance Indicators */}
                    <div className="mt-12 flex justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {['99.9% Güven', 'Şeffaf Veri', 'Anlık Analiz'].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm font-bold tracking-tight text-gray-600 dark:text-gray-400">
                                <Check className="h-4 w-4 text-blue-500" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
