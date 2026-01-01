import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    const selectedFeatures = (state.featurePriorities?.selectedFeatures || []).map((key) => ({
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
                <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                        <h4 className="font-semibold text-lg flex items-center gap-2">
                            <span className="w-1.5 h-4 bg-primary rounded-full" />
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
                    <div className="p-6 space-y-3">
                        <div className="flex justify-between items-center py-1">
                            <span className="text-muted-foreground">İşletme Tipi</span>
                            <span className="font-medium">
                                {state.businessProfile.businessType
                                    ? businessTypeLabels[state.businessProfile.businessType]
                                    : 'Seçilmedi'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-t border-white/5">
                            <span className="text-muted-foreground">Aylık Bütçe</span>
                            <span className="font-medium text-primary">{formatBudget(state.businessProfile.monthlyBudget)}</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-t border-white/5">
                            <span className="text-muted-foreground">Sektör</span>
                            <span className="font-medium">{state.businessProfile.sector || 'Seçilmedi'}</span>
                        </div>
                    </div>
                </div>

                {/* Sales Model */}
                <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                        <h4 className="font-semibold text-lg flex items-center gap-2">
                            <span className="w-1.5 h-4 bg-blue-500 rounded-full" />
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
                    <div className="p-6 space-y-3">
                        <div className="flex justify-between items-center py-1">
                            <span className="text-muted-foreground">Satış Tipi</span>
                            <span className="font-medium">
                                {state.salesModel.model
                                    ? salesModelLabels[state.salesModel.model]
                                    : 'Seçilmedi'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-t border-white/5">
                            <span className="text-muted-foreground">Fiziksel Mağaza</span>
                            <span className="font-medium">{state.salesModel.hasPhysicalStore ? 'Evet' : 'Hayır'}</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-t border-white/5">
                            <span className="text-muted-foreground">Pazaryeri Satışı</span>
                            <span className="font-medium">{state.salesModel.marketplaceSelling ? 'Evet' : 'Hayır'}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Feature Priorities */}
                    <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden flex flex-col">
                        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                            <h4 className="font-semibold text-lg flex items-center gap-2">
                                <span className="w-1.5 h-4 bg-purple-500 rounded-full" />
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
                        <div className="p-6 flex-1">
                            {selectedFeatures.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {selectedFeatures.map((feature) => (
                                        <div key={feature.key} className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-200 text-sm border border-purple-500/20">
                                            {feature.key}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">Özellik seçilmedi</p>
                            )}
                        </div>
                    </div>

                    {/* Technical Requirements */}
                    <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden flex flex-col">
                        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                            <h4 className="font-semibold text-lg flex items-center gap-2">
                                <span className="w-1.5 h-4 bg-orange-500 rounded-full" />
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
                        <div className="p-6 flex-1">
                            {technicalReqs.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {technicalReqs.map((req) => (
                                        <div key={req} className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-200 text-sm border border-orange-500/20">
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

