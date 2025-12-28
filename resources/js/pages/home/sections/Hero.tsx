import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { ArrowRight, Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
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
    { value: 'shopify', label: 'Shopify' },
    { value: 'woocommerce', label: 'WooCommerce' },
    { value: 'wix', label: 'Wix' },
    { value: 'bigcommerce', label: 'BigCommerce' },
    { value: 'ideasosoft', label: 'Ideasosoft' },
    { value: 'ticimax', label: 'Ticimax' },
    { value: 'magento', label: 'Magento' },
    { value: 'opencart', label: 'OpenCart' },
];

function PlatformSelector({
    placeholder,
    value,
    setValue,
}: {
    placeholder: string;
    value: string;
    setValue: (val: string) => void;
}) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between h-14 rounded-xl border-white/30 bg-white/50 text-base backdrop-blur-md hover:bg-white/70 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                >
                    {value
                        ? platforms.find((framework) => framework.value === value)
                            ?.label
                        : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0 rounded-xl border-white/20 bg-white/80 backdrop-blur-xl dark:bg-black/80">
                <Command>
                    <CommandInput placeholder="Platform ara..." />
                    <CommandList>
                        <CommandEmpty>Platform bulunamadı.</CommandEmpty>
                        <CommandGroup>
                            {platforms.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(
                                            currentValue === value
                                                ? ''
                                                : currentValue,
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            value === framework.value
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                        )}
                                    />
                                    {framework.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default function Hero() {
    const [platformA, setPlatformA] = useState('');
    const [platformB, setPlatformB] = useState('');

    return (
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
            {/* Background Blobs */}
            <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[120px] dark:bg-blue-900/20" />
            <div className="absolute top-20 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[100px] dark:bg-violet-900/20" />

            <div className="container mx-auto px-4 text-center">
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/40 px-3 py-1 text-sm font-medium backdrop-blur-md dark:border-white/10 dark:bg-white/10">
                    <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
                    <span className="text-gray-800 dark:text-gray-200">
                        Canlı Karşılaştırma Motoru
                    </span>
                </div>

                <h1 className="mx-auto mb-6 max-w-5xl text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl dark:text-white">
                    Hangi E-Ticaret Platformu? <br className="hidden md:block" />
                    <span className="kobi-gradient-text">Yan yana karşılaştır.</span>
                </h1>

                <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                    Sadece özellik listesi değil. Gizli maliyetler, komisyonlar ve senin iş modeline uygunluk analizi.
                </p>

                {/* Comparison Tool Widget */}
                <div className="mx-auto max-w-4xl relative z-10">
                    <GlassCard className="p-2 sm:p-4 rounded-[2rem] border-white/40 dark:border-white/10 shadow-2xl bg-white/30 dark:bg-black/30">
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto] gap-4 items-center bg-white/60 dark:bg-white/5 rounded-3xl p-4 sm:p-8 border border-white/40 dark:border-white/10">

                            {/* Input 1 */}
                            <div className="w-full">
                                <label className="mb-2 block text-sm font-medium text-gray-500 text-left ml-1">Platform A</label>
                                <PlatformSelector
                                    placeholder="Seçiniz..."
                                    value={platformA}
                                    setValue={setPlatformA}
                                />
                            </div>

                            {/* VS Badge */}
                            <div className="flex items-center justify-center my-2 md:my-0">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 ring-4 ring-white/30 dark:ring-black/30">
                                    VS
                                </div>
                            </div>

                            {/* Input 2 */}
                            <div className="w-full">
                                <label className="mb-2 block text-sm font-medium text-gray-500 text-left ml-1">Platform B</label>
                                <PlatformSelector
                                    placeholder="Seçiniz..."
                                    value={platformB}
                                    setValue={setPlatformB}
                                />
                            </div>

                            {/* Action Button */}
                            <div className="w-full md:w-auto mt-2 md:mt-6">
                                <Button
                                    size="lg"
                                    className="w-full h-14 rounded-xl bg-gray-900 text-white hover:bg-black shadow-xl text-base px-8 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                >
                                    Karşılaştır
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Quick Suggestions */}
                        <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-gray-500">
                            <span className="opacity-70">Popüler:</span>
                            <button onClick={() => { setPlatformA('shopify'); setPlatformB('woocommerce') }} className="hover:text-blue-600 underline decoration-dotted underline-offset-2">Shopify vs WooCommerce</button>
                            <span className="opacity-30">•</span>
                            <button onClick={() => { setPlatformA('ticimax'); setPlatformB('ideasosoft') }} className="hover:text-blue-600 underline decoration-dotted underline-offset-2">Ticimax vs Ideasosoft</button>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </section>
    );
}
