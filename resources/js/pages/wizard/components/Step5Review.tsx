import { Button } from '@/components/ui/button';
import WizardStep from './WizardStep';
import { WizardState } from '@/types/wizard';
import { Edit } from 'lucide-react';

interface Step5ReviewProps {
    state: WizardState;
    onEditStep: (step: number) => void;
}

const businessTypeLabels: Record<string, string> = {
    startup: 'Yeni girişim',
    growing: 'Büyüyen işletme',
    enterprise: 'Kurumsal / B2B',
};

const salesModelLabels: Record<string, string> = {
    b2c: 'B2C (Bireysel Müşteriler)',
    b2b: 'B2B (Kurumsal Müşteriler)',
    both: 'Her İkisi',
};

const formatBudget = (value: number) => {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export default function Step5Review({ state, onEditStep }: Step5ReviewProps) {
    const selectedFeatures = (
        state.featurePriorities?.selectedFeatures || []
    ).map((key) => ({
        key,
        priority: state.featurePriorities?.priorities?.[key] || 'medium',
    }));

    const technicalReqs = Object.entries(state.technicalRequirements || {})
        .filter(([_, value]) => value)
        .map(([key]) => key);

    return (
        <WizardStep
            title="Özet"
            description="Seçimlerinizi gözden geçirin ve gerekirse değiştirin"
        >
            <div className="space-y-6">
                {/* Business Profile */}
                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                    <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4">
                        <h4 className="flex items-center gap-2 text-lg font-semibold">
                            <span className="h-4 w-1.5 rounded-full bg-primary" />
                            İşletme Profili
                        </h4>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEditStep(1)}
                            className="gap-2 hover:bg-white/10 hover:text-primary"
                        >
                            <Edit className="h-4 w-4" />
                            Değiştir
                        </Button>
                    </div>
                    <div className="space-y-3 p-6">
                        <div className="flex items-center justify-between py-1">
                            <span className="text-muted-foreground">
                                İşletme Tipi
                            </span>
                            <span className="font-medium">
                                {state.businessProfile.businessType
                                    ? businessTypeLabels[
                                          state.businessProfile.businessType
                                      ]
                                    : 'Seçilmedi'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between border-t border-white/5 py-1">
                            <span className="text-muted-foreground">
                                Aylık Bütçe
                            </span>
                            <span className="font-medium text-primary">
                                {formatBudget(
                                    state.businessProfile.monthlyBudget,
                                )}
                            </span>
                        </div>
                        <div className="flex items-center justify-between border-t border-white/5 py-1">
                            <span className="text-muted-foreground">
                                Sektör
                            </span>
                            <span className="font-medium">
                                {state.businessProfile.sector || 'Seçilmedi'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Sales Model */}
                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                    <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4">
                        <h4 className="flex items-center gap-2 text-lg font-semibold">
                            <span className="h-4 w-1.5 rounded-full bg-blue-500" />
                            Satış Modeli
                        </h4>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEditStep(2)}
                            className="gap-2 hover:bg-white/10 hover:text-blue-500"
                        >
                            <Edit className="h-4 w-4" />
                            Değiştir
                        </Button>
                    </div>
                    <div className="space-y-3 p-6">
                        <div className="flex items-center justify-between py-1">
                            <span className="text-muted-foreground">
                                Satış Tipi
                            </span>
                            <span className="font-medium">
                                {state.salesModel.model
                                    ? salesModelLabels[state.salesModel.model]
                                    : 'Seçilmedi'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between border-t border-white/5 py-1">
                            <span className="text-muted-foreground">
                                Fiziksel Mağaza
                            </span>
                            <span className="font-medium">
                                {state.salesModel.hasPhysicalStore
                                    ? 'Evet'
                                    : 'Hayır'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between border-t border-white/5 py-1">
                            <span className="text-muted-foreground">
                                Pazaryeri Satışı
                            </span>
                            <span className="font-medium">
                                {state.salesModel.marketplaceSelling
                                    ? 'Evet'
                                    : 'Hayır'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Feature Priorities */}
                    <div className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5">
                        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4">
                            <h4 className="flex items-center gap-2 text-lg font-semibold">
                                <span className="h-4 w-1.5 rounded-full bg-purple-500" />
                                Özellikler
                            </h4>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onEditStep(3)}
                                className="gap-2 hover:bg-white/10 hover:text-purple-500"
                            >
                                <Edit className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex-1 p-6">
                            {selectedFeatures.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {selectedFeatures.map((feature) => (
                                        <div
                                            key={feature.key}
                                            className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-sm text-purple-200"
                                        >
                                            {feature.key}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    Özellik seçilmedi
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Technical Requirements */}
                    <div className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5">
                        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4">
                            <h4 className="flex items-center gap-2 text-lg font-semibold">
                                <span className="h-4 w-1.5 rounded-full bg-orange-500" />
                                Gereksinimler
                            </h4>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onEditStep(4)}
                                className="gap-2 hover:bg-white/10 hover:text-orange-500"
                            >
                                <Edit className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex-1 p-6">
                            {technicalReqs.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {technicalReqs.map((req) => (
                                        <div
                                            key={req}
                                            className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-sm text-orange-200"
                                        >
                                            {req}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    Teknik gereksinim seçilmedi
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </WizardStep>
    );
}
