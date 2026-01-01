import { WizardState } from '@/types/wizard';
import { FeatureCategory } from '@/types/feature';
import WizardStep from './WizardStep';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { FEATURE_CATEGORIES } from '@/types/feature';

interface Props {
    state: WizardState;
    updateState: (updates: Partial<WizardState>) => void;
}

const features: { id: string; label: string; category: FeatureCategory }[] = [
    { id: 'custom_domain', label: 'Özel Alan Adı', category: 'core' },
    { id: 'storage', label: 'Yüksek Depolama', category: 'core' },
    { id: 'iyzico', label: 'Iyzico Entegrasyonu', category: 'payment' },
    { id: 'stripe', label: 'Stripe (Yurtdışı)', category: 'payment' },
    { id: 'seo_tools', label: 'Gelişmiş SEO', category: 'marketing' },
    { id: 'email_marketing', label: 'E-posta Pazarlama', category: 'marketing' },
    { id: 'google_ads', label: 'Google Ads', category: 'marketing' },
    { id: 'marketplace_sync', label: 'Pazaryeri Entegrasyonu', category: 'integration' },
    { id: 'accounting_sync', label: 'Muhasebe Entegrasyonu', category: 'integration' },
    { id: 'b2b_portal', label: 'Bayi Portalı (B2B)', category: 'b2b' },
    { id: 'mobile_app', label: 'Mobil Uygulama', category: 'mobile' },
];

const priorityLevels = [
    { value: 'low', label: 'Düşük' },
    { value: 'medium', label: 'Orta' },
    { value: 'high', label: 'Yüksek' },
    { value: 'critical', label: 'Kritik' },
];

export default function Step3FeaturePriorities({ state, updateState }: Props) {
    const handleFeatureToggle = (featureId: string, checked: boolean) => {
        const currentFeatures = [...(state.featurePriorities?.selectedFeatures || [])];
        let newFeatures;

        if (checked) {
            newFeatures = [...currentFeatures, featureId];
        } else {
            newFeatures = currentFeatures.filter((id) => id !== featureId);
        }

        updateState({
            featurePriorities: {
                selectedFeatures: newFeatures,
                priorities: state.featurePriorities?.priorities || {},
            },
        });
    };

    const handlePriorityChange = (featureId: string, priority: string) => {
        updateState({
            featurePriorities: {
                selectedFeatures: state.featurePriorities?.selectedFeatures || [],
                priorities: {
                    ...(state.featurePriorities?.priorities || {}),
                    [featureId]: priority as any,
                },
            },
        });
    };

    return (
        <WizardStep
            title="Özellik & Öncelikler"
            description="Kritik özellikleri seçin."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((feature) => {
                    const isSelected = state.featurePriorities?.selectedFeatures?.includes(feature.id) ?? false;
                    const currentPriority = state.featurePriorities?.priorities?.[feature.id] || 'medium';

                    return (
                        <div
                            key={feature.id}
                            className={cn(
                                "flex flex-col gap-3 rounded-lg border p-3 transition-colors",
                                isSelected
                                    ? "bg-blue-50/50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800"
                                    : "bg-white border-gray-200 hover:border-gray-300 dark:bg-gray-900 dark:border-gray-800"
                            )}
                        >
                            <div className="flex items-start gap-3">
                                <Checkbox
                                    id={feature.id}
                                    checked={isSelected}
                                    onCheckedChange={(checked) => handleFeatureToggle(feature.id, checked as boolean)}
                                    className="mt-0.5"
                                />
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <Label
                                            htmlFor={feature.id}
                                            className="text-sm font-medium leading-none cursor-pointer"
                                        >
                                            {feature.label}
                                        </Label>
                                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 font-normal text-gray-500">
                                            {feature.category}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            {isSelected && (
                                <div className="pl-7 animate-in slide-in-from-top-1 fade-in duration-200">
                                    <Select
                                        value={currentPriority}
                                        onValueChange={(value) => handlePriorityChange(feature.id, value)}
                                    >
                                        <SelectTrigger className="h-8 text-xs w-full bg-white dark:bg-gray-900">
                                            <span className="text-muted-foreground mr-2">Öncelik:</span>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {priorityLevels.map((p) => (
                                                <SelectItem key={p.value} value={p.value} className="text-xs">
                                                    {p.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </WizardStep>
    );
}

