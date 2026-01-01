import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
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
            <div className="grid grid-cols-1 gap-4">
                {requirements.map((req) => {
                    const field = req.id as keyof typeof state.technicalRequirements;
                    const value = state.technicalRequirements[field];

                    return (
                        <div
                            key={req.id}
                            className={cn(
                                "flex items-center justify-between rounded-xl border p-6 transition-all duration-300",
                                value
                                    ? "bg-primary/10 border-primary/30 shadow-[0_0_15px_rgba(var(--primary),0.1)]"
                                    : "bg-white/5 border-white/10 hover:bg-white/10"
                            )}
                        >
                            <div className="flex-1 space-y-1">
                                <Label htmlFor={req.id} className="cursor-pointer text-lg font-semibold">
                                    {req.label}
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    {req.description}
                                </p>
                            </div>
                            <Toggle
                                id={req.id}
                                pressed={value}
                                onPressedChange={(pressed) => handleToggle(field, pressed)}
                                aria-label={req.label}
                                className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground h-10 w-10 p-2 rounded-full"
                            >
                                <div className={cn("w-4 h-4 rounded-full transition-all", value ? "bg-current" : "bg-transparent border-2 border-current")} />
                            </Toggle>
                        </div>
                    );
                })}
            </div>
        </WizardStep>
    );
}

