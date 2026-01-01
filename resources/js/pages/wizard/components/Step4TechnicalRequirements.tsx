import { Label } from '@/components/ui/label';
import { Toggle } from '@/components/ui/toggle';
import WizardStep from './WizardStep';
import { WizardState } from '@/types/wizard';

interface Step4TechnicalRequirementsProps {
    state: WizardState;
    updateState: (updates: Partial<WizardState>) => void;
}

const requirements = [
    {
        id: 'apiAccess',
        label: 'API Erişimi',
        description: 'API üzerinden entegrasyon yapabilme',
    },
    {
        id: 'mobileApp',
        label: 'Mobil Uygulama',
        description: 'Native mobil uygulama desteği',
    },
    {
        id: 'multiLanguage',
        label: 'Çoklu Dil Desteği',
        description: 'Birden fazla dilde içerik yönetimi',
    },
    {
        id: 'marketplaceIntegration',
        label: 'Pazaryeri Entegrasyonu',
        description: 'Pazaryerleri ile otomatik entegrasyon',
    },
];

export default function Step4TechnicalRequirements({
    state,
    updateState,
}: Step4TechnicalRequirementsProps) {
    const handleToggle = (field: keyof typeof state.technicalRequirements, pressed: boolean) => {
        updateState({
            technicalRequirements: {
                ...state.technicalRequirements,
                [field]: pressed,
            },
        });
    };

    return (
        <WizardStep
            title="Teknik Gereksinimler"
            description="İhtiyacınız olan teknik özellikleri belirtin"
        >
            <div className="space-y-4">
                {requirements.map((req) => {
                    const field = req.id as keyof typeof state.technicalRequirements;
                    const value = state.technicalRequirements[field];

                    return (
                        <div
                            key={req.id}
                            className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors"
                        >
                            <div className="flex-1">
                                <Label htmlFor={req.id} className="cursor-pointer font-semibold">
                                    {req.label}
                                </Label>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {req.description}
                                </p>
                            </div>
                            <Toggle
                                id={req.id}
                                pressed={value}
                                onPressedChange={(pressed) => handleToggle(field, pressed)}
                                aria-label={req.label}
                            />
                        </div>
                    );
                })}
            </div>
        </WizardStep>
    );
}

