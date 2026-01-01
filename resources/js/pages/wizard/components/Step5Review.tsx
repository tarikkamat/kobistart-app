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
    const selectedFeatures = Object.entries(state.featurePriorities || {})
        .filter(([_, feature]) => feature.selected)
        .map(([key, feature]) => ({ key, priority: feature.priority }));

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
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">İşletme Profili</CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onEditStep(1)}
                                className="gap-2"
                            >
                                <Edit className="h-4 w-4" />
                                Değiştir
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div>
                            <span className="font-medium">İşletme Tipi: </span>
                            <span>
                                {state.businessProfile.businessType
                                    ? businessTypeLabels[state.businessProfile.businessType]
                                    : 'Seçilmedi'}
                            </span>
                        </div>
                        <div>
                            <span className="font-medium">Aylık Bütçe: </span>
                            <span>{formatBudget(state.businessProfile.monthlyBudget)}</span>
                        </div>
                        <div>
                            <span className="font-medium">Sektör: </span>
                            <span>{state.businessProfile.sector || 'Seçilmedi'}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Sales Model */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Satış Modeli</CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onEditStep(2)}
                                className="gap-2"
                            >
                                <Edit className="h-4 w-4" />
                                Değiştir
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div>
                            <span className="font-medium">Satış Tipi: </span>
                            <span>
                                {state.salesModel.model
                                    ? salesModelLabels[state.salesModel.model]
                                    : 'Seçilmedi'}
                            </span>
                        </div>
                        <div>
                            <span className="font-medium">Fiziksel Mağaza: </span>
                            <span>{state.salesModel.hasPhysicalStore ? 'Evet' : 'Hayır'}</span>
                        </div>
                        <div>
                            <span className="font-medium">Pazaryeri Satışı: </span>
                            <span>{state.salesModel.marketplaceSelling ? 'Evet' : 'Hayır'}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Feature Priorities */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Özellik Öncelikleri</CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onEditStep(3)}
                                className="gap-2"
                            >
                                <Edit className="h-4 w-4" />
                                Değiştir
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {selectedFeatures.length > 0 ? (
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">
                                    {selectedFeatures.length} özellik seçildi
                                </p>
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">Özellik seçilmedi</p>
                        )}
                    </CardContent>
                </Card>

                {/* Technical Requirements */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Teknik Gereksinimler</CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onEditStep(4)}
                                className="gap-2"
                            >
                                <Edit className="h-4 w-4" />
                                Değiştir
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {technicalReqs.length > 0 ? (
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">
                                    {technicalReqs.length} gereksinim seçildi
                                </p>
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Teknik gereksinim seçilmedi
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </WizardStep>
    );
}

