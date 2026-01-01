import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import WizardStep from './WizardStep';
import { WizardState } from '@/types/wizard';

interface Step1BusinessProfileProps {
    state: WizardState;
    updateState: (updates: Partial<WizardState>) => void;
}

const sectors = [
    'Moda & Giyim',
    'Elektronik',
    'Gıda & İçecek',
    'Kozmetik & Kişisel Bakım',
    'Kitap & Kırtasiye',
    'Oyuncak & Hobi',
    'Spor & Outdoor',
    'Ev & Yaşam',
    'Mobilya & Dekorasyon',
    'Sağlık & Wellness',
    'Otomotiv',
    'Diğer',
];

export default function Step1BusinessProfile({ state, updateState }: Step1BusinessProfileProps) {
    const handleBusinessTypeChange = (value: string) => {
        updateState({
            businessProfile: {
                ...state.businessProfile,
                businessType: value as 'startup' | 'growing' | 'enterprise',
            },
        });
    };

    const handleBudgetChange = (values: number[]) => {
        updateState({
            businessProfile: {
                ...state.businessProfile,
                monthlyBudget: values[0],
            },
        });
    };

    const handleSectorChange = (value: string) => {
        updateState({
            businessProfile: {
                ...state.businessProfile,
                sector: value,
            },
        });
    };

    const formatBudget = (value: number) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <WizardStep
            title="İşletme Profili"
            description="İşletmeniz hakkında temel bilgileri paylaşın"
        >
            <div className="space-y-8">
                {/* Business Type */}
                <div className="space-y-4">
                    <Label className="text-base font-semibold">İşletme Tipi</Label>
                    <RadioGroup
                        value={state.businessProfile.businessType || ''}
                        onValueChange={handleBusinessTypeChange}
                    >
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent transition-colors">
                                <RadioGroupItem value="startup" id="startup" />
                                <Label htmlFor="startup" className="flex-1 cursor-pointer font-normal">
                                    Yeni girişim
                                </Label>
                            </div>
                            <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent transition-colors">
                                <RadioGroupItem value="growing" id="growing" />
                                <Label htmlFor="growing" className="flex-1 cursor-pointer font-normal">
                                    Büyüyen işletme
                                </Label>
                            </div>
                            <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent transition-colors">
                                <RadioGroupItem value="enterprise" id="enterprise" />
                                <Label htmlFor="enterprise" className="flex-1 cursor-pointer font-normal">
                                    Kurumsal / B2B
                                </Label>
                            </div>
                        </div>
                    </RadioGroup>
                </div>

                {/* Monthly Budget */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label className="text-base font-semibold">Aylık Bütçe</Label>
                        <span className="text-lg font-bold text-primary">
                            {formatBudget(state.businessProfile.monthlyBudget)}
                        </span>
                    </div>
                    <Slider
                        value={[state.businessProfile.monthlyBudget]}
                        onValueChange={handleBudgetChange}
                        min={0}
                        max={50000}
                        step={500}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>₺0</span>
                        <span>₺50.000+</span>
                    </div>
                </div>

                {/* Sector */}
                <div className="space-y-4">
                    <Label htmlFor="sector" className="text-base font-semibold">
                        Sektör
                    </Label>
                    <Select
                        value={state.businessProfile.sector || ''}
                        onValueChange={handleSectorChange}
                    >
                        <SelectTrigger id="sector" className="w-full">
                            <SelectValue placeholder="Sektör seçin" />
                        </SelectTrigger>
                        <SelectContent>
                            {sectors.map((sector) => (
                                <SelectItem key={sector} value={sector}>
                                    {sector}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </WizardStep>
    );
}

