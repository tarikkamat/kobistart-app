import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Toggle } from '@/components/ui/toggle';
import WizardStep from './WizardStep';
import { WizardState } from '@/types/wizard';

interface Step2SalesModelProps {
    state: WizardState;
    updateState: (updates: Partial<WizardState>) => void;
}

export default function Step2SalesModel({ state, updateState }: Step2SalesModelProps) {
    const handleModelChange = (value: string) => {
        updateState({
            salesModel: {
                ...state.salesModel,
                model: value as 'b2c' | 'b2b' | 'both',
            },
        });
    };

    const handlePhysicalStoreChange = (pressed: boolean) => {
        updateState({
            salesModel: {
                ...state.salesModel,
                hasPhysicalStore: pressed,
            },
        });
    };

    const handleMarketplaceChange = (pressed: boolean) => {
        updateState({
            salesModel: {
                ...state.salesModel,
                marketplaceSelling: pressed,
            },
        });
    };

    return (
        <WizardStep
            title="Satış Modeli"
            description="Satış yapınız hakkında bilgi verin"
        >
            <div className="space-y-8">
                {/* Sales Model */}
                <div className="space-y-4">
                    <Label className="text-base font-semibold">Satış Tipi</Label>
                    <RadioGroup
                        value={state.salesModel.model || ''}
                        onValueChange={handleModelChange}
                    >
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent transition-colors">
                                <RadioGroupItem value="b2c" id="b2c" />
                                <Label htmlFor="b2c" className="flex-1 cursor-pointer font-normal">
                                    B2C (Bireysel Müşteriler)
                                </Label>
                            </div>
                            <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent transition-colors">
                                <RadioGroupItem value="b2b" id="b2b" />
                                <Label htmlFor="b2b" className="flex-1 cursor-pointer font-normal">
                                    B2B (Kurumsal Müşteriler)
                                </Label>
                            </div>
                            <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent transition-colors">
                                <RadioGroupItem value="both" id="both" />
                                <Label htmlFor="both" className="flex-1 cursor-pointer font-normal">
                                    Her İkisi
                                </Label>
                            </div>
                        </div>
                    </RadioGroup>
                </div>

                {/* Physical Store */}
                <div className="space-y-4">
                    <Label className="text-base font-semibold">Fiziksel Mağaza</Label>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <Label htmlFor="physical-store" className="cursor-pointer font-normal">
                            Fiziksel mağazam var
                        </Label>
                        <Toggle
                            id="physical-store"
                            pressed={state.salesModel.hasPhysicalStore}
                            onPressedChange={handlePhysicalStoreChange}
                            aria-label="Fiziksel mağaza"
                        />
                    </div>
                </div>

                {/* Marketplace Selling */}
                <div className="space-y-4">
                    <Label className="text-base font-semibold">Pazaryeri Satışı</Label>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <Label htmlFor="marketplace" className="cursor-pointer font-normal">
                            Pazaryerlerinde satış yapıyorum/yapmak istiyorum
                        </Label>
                        <Toggle
                            id="marketplace"
                            pressed={state.salesModel.marketplaceSelling}
                            onPressedChange={handleMarketplaceChange}
                            aria-label="Pazaryeri satışı"
                        />
                    </div>
                </div>
            </div>
        </WizardStep>
    );
}

