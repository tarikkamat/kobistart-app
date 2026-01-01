import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import WizardStep from './WizardStep';
import { WizardState } from '@/types/wizard';
import { FEATURE_KEYS, FEATURE_CATEGORIES } from '@/types/feature';

interface Step3FeaturePrioritiesProps {
    state: WizardState;
    updateState: (updates: Partial<WizardState>) => void;
}

// Feature labels mapping (simplified subset for wizard)
const featureLabels: Record<string, string> = {
    // Core
    [FEATURE_KEYS.ONLINE_STORE]: 'Online Mağaza',
    [FEATURE_KEYS.ANALYTICS]: 'Analitik',
    [FEATURE_KEYS.INVENTORY_LOCATIONS]: 'Envanter Yönetimi',
    [FEATURE_KEYS.SALES_CHANNELS]: 'Satış Kanalları',
    
    // Payment
    [FEATURE_KEYS.PAYMENT_GATEWAYS]: 'Ödeme Geçitleri',
    [FEATURE_KEYS.ZERO_TRANSACTION_FEE]: '%0 İşlem Ücreti',
    
    // Marketing
    [FEATURE_KEYS.ADVANCED_SEO]: 'Gelişmiş SEO',
    [FEATURE_KEYS.EMAIL_CAMPAIGNS]: 'E-posta Kampanyaları',
    [FEATURE_KEYS.DISCOUNT_CODES]: 'İndirim Kodları',
    [FEATURE_KEYS.MARKETING_AUTOMATION]: 'Pazarlama Otomasyonu',
    
    // Integration
    [FEATURE_KEYS.MARKETPLACE_INTEGRATIONS]: 'Pazaryeri Entegrasyonları',
    [FEATURE_KEYS.ERP_INTEGRATION]: 'ERP Entegrasyonu',
    [FEATURE_KEYS.E_INVOICE_INTEGRATION]: 'E-Fatura Entegrasyonu',
    
    // B2B
    [FEATURE_KEYS.B2B_SALES]: 'B2B Satış',
    [FEATURE_KEYS.WHOLESALE_SALES]: 'Toptan Satış',
    
    // Mobile
    [FEATURE_KEYS.NATIVE_MOBILE_APP]: 'Native Mobil Uygulama',
    [FEATURE_KEYS.SMS_LOGIN]: 'SMS ile Giriş',
};

const categoryLabels: Record<string, string> = {
    [FEATURE_CATEGORIES.CORE]: 'Temel Özellikler',
    [FEATURE_CATEGORIES.PAYMENT]: 'Ödeme',
    [FEATURE_CATEGORIES.MARKETING]: 'Pazarlama',
    [FEATURE_CATEGORIES.INTEGRATION]: 'Entegrasyonlar',
    [FEATURE_CATEGORIES.B2B]: 'B2B',
    [FEATURE_CATEGORIES.MOBILE]: 'Mobil',
};

// Feature groups by category
const featuresByCategory: Record<string, string[]> = {
    [FEATURE_CATEGORIES.CORE]: [
        FEATURE_KEYS.ONLINE_STORE,
        FEATURE_KEYS.ANALYTICS,
        FEATURE_KEYS.INVENTORY_LOCATIONS,
        FEATURE_KEYS.SALES_CHANNELS,
    ],
    [FEATURE_CATEGORIES.PAYMENT]: [
        FEATURE_KEYS.PAYMENT_GATEWAYS,
        FEATURE_KEYS.ZERO_TRANSACTION_FEE,
    ],
    [FEATURE_CATEGORIES.MARKETING]: [
        FEATURE_KEYS.ADVANCED_SEO,
        FEATURE_KEYS.EMAIL_CAMPAIGNS,
        FEATURE_KEYS.DISCOUNT_CODES,
        FEATURE_KEYS.MARKETING_AUTOMATION,
    ],
    [FEATURE_CATEGORIES.INTEGRATION]: [
        FEATURE_KEYS.MARKETPLACE_INTEGRATIONS,
        FEATURE_KEYS.ERP_INTEGRATION,
        FEATURE_KEYS.E_INVOICE_INTEGRATION,
    ],
    [FEATURE_CATEGORIES.B2B]: [
        FEATURE_KEYS.B2B_SALES,
        FEATURE_KEYS.WHOLESALE_SALES,
    ],
    [FEATURE_CATEGORIES.MOBILE]: [
        FEATURE_KEYS.NATIVE_MOBILE_APP,
        FEATURE_KEYS.SMS_LOGIN,
    ],
};

const priorityOptions = [
    { value: '1', label: '1 - En Az Önemli' },
    { value: '2', label: '2' },
    { value: '3', label: '3 - Orta' },
    { value: '4', label: '4' },
    { value: '5', label: '5 - En Önemli' },
];

export default function Step3FeaturePriorities({ state, updateState }: Step3FeaturePrioritiesProps) {
    const handleFeatureToggle = (featureKey: string, checked: boolean) => {
        const currentPriorities = state.featurePriorities || {};
        updateState({
            featurePriorities: {
                ...currentPriorities,
                [featureKey]: {
                    selected: checked,
                    priority: currentPriorities[featureKey]?.priority || 3,
                },
            },
        });
    };

    const handlePriorityChange = (featureKey: string, priority: string) => {
        const currentPriorities = state.featurePriorities || {};
        updateState({
            featurePriorities: {
                ...currentPriorities,
                [featureKey]: {
                    selected: currentPriorities[featureKey]?.selected || true,
                    priority: parseInt(priority, 10),
                },
            },
        });
    };

    return (
        <WizardStep
            title="Özellik Öncelikleri"
            description="Size önemli olan özellikleri seçin ve öncelik verin"
        >
            <div className="space-y-8">
                {Object.entries(featuresByCategory).map(([category, features]) => (
                    <div key={category} className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            {categoryLabels[category] || category}
                        </h3>
                        <div className="space-y-3 pl-4">
                            {features.map((featureKey) => {
                                const featureState = state.featurePriorities[featureKey] || {
                                    selected: false,
                                    priority: 3,
                                };
                                
                                return (
                                    <div
                                        key={featureKey}
                                        className="flex items-center gap-4 rounded-lg border p-4 hover:bg-accent/50 transition-colors"
                                    >
                                        <Checkbox
                                            checked={featureState.selected}
                                            onCheckedChange={(checked) =>
                                                handleFeatureToggle(featureKey, checked as boolean)
                                            }
                                        />
                                        <Label className="flex-1 cursor-pointer font-normal">
                                            {featureLabels[featureKey] || featureKey}
                                        </Label>
                                        {featureState.selected && (
                                            <Select
                                                value={featureState.priority.toString()}
                                                onValueChange={(value) =>
                                                    handlePriorityChange(featureKey, value)
                                                }
                                            >
                                                <SelectTrigger className="w-40">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {priorityOptions.map((option) => (
                                                        <SelectItem
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </WizardStep>
    );
}

