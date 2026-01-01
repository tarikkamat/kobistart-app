import { WizardState, SalesModel } from '@/types/wizard';
import WizardStep from './WizardStep';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Briefcase, ShoppingBag, Store, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
    state: WizardState;
    updateState: (updates: Partial<WizardState>) => void;
}

const salesModels = [
    {
        id: 'b2c',
        title: 'B2C (Perakende)',
        description: 'Son tüketiciye satış',
        icon: ShoppingBag,
    },
    {
        id: 'b2b',
        title: 'B2B (Toptan)',
        description: 'Kurumsal satış',
        icon: Briefcase,
    },
    {
        id: 'both',
        title: 'Hibrit',
        description: 'Hem perakende hem toptan',
        icon: Globe,
    },
];

export default function Step2SalesModel({ state, updateState }: Props) {
    const handleUpdate = (field: keyof SalesModel, value: any) => {
        updateState({
            salesModel: {
                ...state.salesModel,
                [field]: value,
            },
        });
    };

    return (
        <WizardStep
            title="Satış Modeli"
            description="İş modelinizi belirleyin."
        >
            <div className="space-y-8">
                {/* Sales Model */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Satış Yöntemi
                    </Label>
                    <RadioGroup
                        value={state.salesModel.model || ''}
                        onValueChange={(value) => handleUpdate('model', value)}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                        {salesModels.map((model) => {
                            const isSelected = state.salesModel.model === model.id;
                            return (
                                <div key={model.id}>
                                    <RadioGroupItem
                                        value={model.id}
                                        id={model.id}
                                        className="peer sr-only"
                                    />
                                    <Label
                                        htmlFor={model.id}
                                        className={cn(
                                            "flex flex-col h-full cursor-pointer rounded-lg border-2 p-4 transition-all hover:border-gray-300 dark:hover:border-gray-700",
                                            isSelected
                                                ? "border-gray-900 bg-gray-50 dark:border-white dark:bg-gray-800"
                                                : "border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900"
                                        )}
                                    >
                                        <model.icon className={cn(
                                            "mb-3 h-5 w-5",
                                            isSelected ? "text-gray-900 dark:text-white" : "text-gray-400"
                                        )} />
                                        <span className={cn(
                                            "font-semibold text-sm block mb-1",
                                            isSelected ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"
                                        )}>
                                            {model.title}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
                                            {model.description}
                                        </span>
                                    </Label>
                                </div>
                            );
                        })}
                    </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                        <div className="space-y-0.5">
                            <Label className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <Store className="h-4 w-4 text-gray-500" />
                                Fiziksel Mağaza
                            </Label>
                            <p className="text-xs text-gray-500">
                                Halihazırda mağazanız var mı?
                            </p>
                        </div>
                        <Switch
                            checked={state.salesModel.hasPhysicalStore}
                            onCheckedChange={(checked) => handleUpdate('hasPhysicalStore', checked)}
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                        <div className="space-y-0.5">
                            <Label className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <Globe className="h-4 w-4 text-gray-500" />
                                Pazaryeri Satışı
                            </Label>
                            <p className="text-xs text-gray-500">
                                Trendyol, Hepsiburada vb.
                            </p>
                        </div>
                        <Switch
                            checked={state.salesModel.sellsOnMarketplaces}
                            onCheckedChange={(checked) => handleUpdate('sellsOnMarketplaces', checked)}
                        />
                    </div>
                </div>
            </div>
        </WizardStep>
    );
}

