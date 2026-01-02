import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';

const planData: Record<string, Record<string, any>> = {
    shopify: {
        Basic: {
            price: '$39',
            fee: '2.0%',
            support: '24/7 Chat',
            custom: 'Restricted',
            speed: 'High',
        },
        Grow: {
            price: '$105',
            fee: '1.0%',
            support: '24/7 Chat',
            custom: 'Moderate',
            speed: 'High',
        },
        Advanced: {
            price: '$399',
            fee: '0.5%',
            support: 'Priority 24/7',
            custom: 'High',
            speed: 'Highest',
        },
        Plus: {
            price: '$2000+',
            fee: '0.15%',
            support: 'Dedicated Manager',
            custom: 'Unlimited',
            speed: 'Enterprise',
        },
    },
    woocommerce: {
        Free: {
            price: 'Free',
            fee: '0%',
            support: 'Community',
            custom: 'Unlimited',
            speed: 'Medium',
        },
        'Hosting Bundle': {
            price: '~$25',
            fee: '0%',
            support: 'Ticket',
            custom: 'Unlimited',
            speed: 'High',
        },
        VIP: {
            price: 'Custom',
            fee: '0%',
            support: 'Dedicated',
            custom: 'Unlimited',
            speed: 'Highest',
        },
    },
    ticimax: {
        Soft: {
            price: '₺15.000',
            fee: '0%',
            support: 'Ticket',
            custom: 'Restricted',
            speed: 'Medium',
        },
        Plus: {
            price: '₺25.000',
            fee: '0%',
            support: 'Live Chat',
            custom: 'Moderate',
            speed: 'High',
        },
        Special: {
            price: '₺45.000',
            fee: '0%',
            support: 'Phone',
            custom: 'High',
            speed: 'High',
        },
        Premium: {
            price: 'Custom',
            fee: '0%',
            support: 'Dedicated',
            custom: 'Unlimited',
            speed: 'Highest',
        },
    },
    ideasosoft: {
        Akıllı: {
            price: '₺14.500',
            fee: '0%',
            support: 'Ticket',
            custom: 'Restricted',
            speed: 'Medium',
        },
        Pro: {
            price: '₺24.500',
            fee: '0%',
            support: 'Live Chat',
            custom: 'Moderate',
            speed: 'High',
        },
        Entegre: {
            price: '₺44.500',
            fee: '0%',
            support: 'Phone',
            custom: 'High',
            speed: 'High',
        },
        Enterprise: {
            price: 'Custom',
            fee: '0%',
            support: 'Dedicated',
            custom: 'Unlimited',
            speed: 'Highest',
        },
    },
};

const defaultData = {
    price: '-',
    fee: '-',
    support: '-',
    custom: '-',
    speed: '-',
};

export default function Comparison({
    selectedItems = [],
}: {
    selectedItems?: { platform: string; plan: string; planSlug?: string }[];
}) {
    const itemsToCompare =
        selectedItems.length > 0
            ? selectedItems
            : [
                  { platform: 'woocommerce', plan: 'Hosting Bundle' },
                  { platform: 'shopify', plan: 'Basic' },
                  { platform: 'bigcommerce', plan: 'Standard' },
              ];

    const getPlanValue = (
        item: { platform: string; plan: string },
        key: string,
    ) => {
        return (
            planData[item.platform]?.[item.plan]?.[key] ||
            defaultData[key as keyof typeof defaultData] ||
            '-'
        );
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-purple-50/50 via-violet-50/30 to-slate-50/50 py-20 dark:from-purple-950/20 dark:via-violet-950/10 dark:to-transparent">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/4 -z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-purple-500/10 blur-[120px] dark:bg-purple-500/5" />
            <div className="absolute right-1/4 bottom-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[100px] dark:bg-violet-500/5" />
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                        Şeffaf Paket Karşılaştırması
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                        Seçtiğiniz paketlerin özelliklerini yan yana getirdik.
                        Gerçek maliyetleri ve limitleri görün.
                    </p>
                </div>

                <div className="mx-auto max-w-5xl overflow-x-auto pb-4">
                    <GlassCard className="min-w-[800px] border-slate-200 bg-white p-0 dark:border-white/10 dark:bg-transparent">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-white/10">
                                    <th className="w-[20%] p-4 font-medium text-gray-500">
                                        Özellik
                                    </th>
                                    {itemsToCompare.map((item, idx) => (
                                        <th
                                            key={idx}
                                            className={cn(
                                                'p-4 font-bold text-gray-900 dark:text-white',
                                                idx === 0 &&
                                                    'bg-blue-50 dark:bg-blue-900/20',
                                            )}
                                        >
                                            <span className="capitalize">
                                                {item.platform}
                                            </span>
                                            <span className="block text-xs font-normal text-blue-600 dark:text-blue-400">
                                                {item.plan}{' '}
                                                {idx === 0 && '• Senin Seçimin'}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-white/10">
                                <tr>
                                    <td className="p-4 font-medium text-gray-900 dark:text-white">
                                        Aylık Maliyet
                                    </td>
                                    {itemsToCompare.map((item, idx) => (
                                        <td
                                            key={idx}
                                            className={cn(
                                                'p-4 font-bold',
                                                idx === 0
                                                    ? 'bg-blue-50/50 text-green-600 dark:bg-blue-900/10'
                                                    : 'text-gray-600 dark:text-gray-400',
                                            )}
                                        >
                                            {getPlanValue(item, 'price')}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-gray-900 dark:text-white">
                                        İşlem Komisyonu
                                    </td>
                                    {itemsToCompare.map((item, idx) => (
                                        <td
                                            key={idx}
                                            className={cn(
                                                'p-4',
                                                idx === 0
                                                    ? 'bg-blue-50/50 font-bold text-green-600 dark:bg-blue-900/10'
                                                    : 'text-gray-600 dark:text-gray-400',
                                            )}
                                        >
                                            {getPlanValue(item, 'fee')}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-gray-900 dark:text-white">
                                        Destek Seviyesi
                                    </td>
                                    {itemsToCompare.map((item, idx) => (
                                        <td
                                            key={idx}
                                            className={cn(
                                                'p-4',
                                                idx === 0
                                                    ? 'bg-blue-50/50 font-medium dark:bg-blue-900/10'
                                                    : 'text-gray-600 dark:text-gray-400',
                                            )}
                                        >
                                            {getPlanValue(item, 'support')}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-gray-900 dark:text-white">
                                        Özelleştirme
                                    </td>
                                    {itemsToCompare.map((item, idx) => (
                                        <td
                                            key={idx}
                                            className={cn(
                                                'p-4',
                                                idx === 0
                                                    ? 'bg-blue-50/50 font-bold dark:bg-blue-900/10'
                                                    : 'text-gray-600 dark:text-gray-400',
                                            )}
                                        >
                                            {getPlanValue(item, 'custom')}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="p-4 font-medium text-gray-900 dark:text-white">
                                        Performans / Hız
                                    </td>
                                    {itemsToCompare.map((item, idx) => (
                                        <td
                                            key={idx}
                                            className={cn(
                                                'p-4',
                                                idx === 0
                                                    ? 'bg-blue-50/50 font-medium text-blue-600 dark:bg-blue-900/10 dark:text-blue-400'
                                                    : 'text-gray-600 dark:text-gray-400',
                                            )}
                                        >
                                            {getPlanValue(item, 'speed')}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </GlassCard>
                </div>
            </div>
        </section>
    );
}
