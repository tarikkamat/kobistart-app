import { WizardState } from '@/types/wizard';
import WizardStep from './WizardStep';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Building2, Rocket, Store } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
    state: WizardState;
    updateState: (updates: Partial<WizardState>) => void;
}

const businessTypes = [
    {
        id: 'startup',
        title: 'Yeni Girişim',
        description: 'Henüz şirketleşme aşamasındayım',
        icon: Rocket,
    },
    {
        id: 'growing',
        title: 'Büyüyen İşletme',
        description: 'Mevcut işimi e-ticarete taşıyorum',
        icon: Store,
    },
    {
        id: 'enterprise',
        title: 'Büyük Ölçekli',
        description: 'Yüksek hacimli satış yapıyorum',
        icon: Building2,
    },
];

const sectors = [
    'Giyim & Moda',
    'Elektronik',
    'Ev & Yaşam',
    'Kozmetik',
    'Gıda & İçecek',
    'Otomotiv',
    'Diğer',
];

export default function Step1BusinessProfile({ state, updateState }: Props) {
    const handleUpdate = (
        field: keyof WizardState['businessProfile'],
        value: any,
    ) => {
        updateState({
            businessProfile: {
                ...state.businessProfile,
                [field]: value,
            },
        });
    };

    return (
        <WizardStep
            title="İşletme Profili"
            description="İşletmenizi en iyi tanımlayan seçenekleri belirleyin."
        >
            <div className="space-y-8">
                {/* Business Type */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        İşletme Durumu
                    </Label>
                    <RadioGroup
                        value={state.businessProfile.businessType || ''}
                        onValueChange={(value) =>
                            handleUpdate('businessType', value)
                        }
                        className="grid grid-cols-1 gap-4 md:grid-cols-3"
                    >
                        {businessTypes.map((type) => {
                            const isSelected =
                                state.businessProfile.businessType === type.id;
                            return (
                                <div key={type.id}>
                                    <RadioGroupItem
                                        value={type.id}
                                        id={type.id}
                                        className="peer sr-only"
                                    />
                                    <Label
                                        htmlFor={type.id}
                                        className={cn(
                                            'flex h-full cursor-pointer flex-col rounded-lg border-2 p-4 transition-all hover:border-gray-300 dark:hover:border-gray-700',
                                            isSelected
                                                ? 'border-gray-900 bg-gray-50 dark:border-white dark:bg-gray-800'
                                                : 'border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900',
                                        )}
                                    >
                                        <type.icon
                                            className={cn(
                                                'mb-3 h-5 w-5',
                                                isSelected
                                                    ? 'text-gray-900 dark:text-white'
                                                    : 'text-gray-400',
                                            )}
                                        />
                                        <span
                                            className={cn(
                                                'mb-1 block text-sm font-semibold',
                                                isSelected
                                                    ? 'text-gray-900 dark:text-white'
                                                    : 'text-gray-700 dark:text-gray-300',
                                            )}
                                        >
                                            {type.title}
                                        </span>
                                        <span className="text-xs leading-snug text-gray-500 dark:text-gray-400">
                                            {type.description}
                                        </span>
                                    </Label>
                                </div>
                            );
                        })}
                    </RadioGroup>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
                    {/* Sector */}
                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Sektör
                        </Label>
                        <Select
                            value={state.businessProfile.sector || ''}
                            onValueChange={(value) =>
                                handleUpdate('sector', value)
                            }
                        >
                            <SelectTrigger className="h-10 border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                                <SelectValue placeholder="Sektör Seçiniz" />
                            </SelectTrigger>
                            <SelectContent>
                                {sectors.map((sector) => (
                                    <SelectItem
                                        key={sector}
                                        value={sector.toLowerCase()}
                                    >
                                        {sector}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Budget */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Aylık Bütçe Beklentisi
                            </Label>
                            <span className="rounded bg-gray-100 px-2 py-0.5 text-sm font-bold text-gray-900 dark:bg-gray-800 dark:text-white">
                                ${state.businessProfile.monthlyBudget}
                            </span>
                        </div>
                        <div className="px-1">
                            <Slider
                                value={[state.businessProfile.monthlyBudget]}
                                min={20}
                                max={500}
                                step={10}
                                onValueChange={(value) =>
                                    handleUpdate('monthlyBudget', value[0])
                                }
                                className="py-2"
                            />
                        </div>
                        <div className="flex justify-between text-[10px] font-medium tracking-wider text-gray-400 uppercase">
                            <span>$20</span>
                            <span>$500+</span>
                        </div>
                    </div>
                </div>
            </div>
        </WizardStep>
    );
}
