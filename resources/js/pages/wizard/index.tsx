import { Button } from '@/components/ui/button';
import LandingLayout from '@/layouts/LandingLayout';
import { WizardState } from '@/types/wizard';
import { Head, router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Step1BusinessProfile from './components/Step1BusinessProfile';
import Step2SalesModel from './components/Step2SalesModel';
import Step3FeaturePriorities from './components/Step3FeaturePriorities';
import Step4TechnicalRequirements from './components/Step4TechnicalRequirements';
import Step5Review from './components/Step5Review';
import WizardProgress from './components/WizardProgress';

const TOTAL_STEPS = 5;

const initialWizardState: WizardState = {
    step: 1,
    businessProfile: {
        businessType: null,
        monthlyBudget: 5000,
        sector: null,
    },
    salesModel: {
        model: null,
        hasPhysicalStore: false,
        marketplaceSelling: false,
    },
    featurePriorities: {
        selectedFeatures: [],
        priorities: {},
    },
    technicalRequirements: {
        apiAccess: false,
        mobileApp: false,
        multiLanguage: false,
        marketplaceIntegration: false,
    },
};

export default function Wizard() {
    const [wizardState, setWizardState] =
        useState<WizardState>(initialWizardState);
    const [isLoading, setIsLoading] = useState(false);

    const updateState = (updates: Partial<WizardState>) => {
        setWizardState((prev) => ({
            ...prev,
            ...updates,
        }));
    };

    const handleNext = () => {
        if (wizardState.step < TOTAL_STEPS) {
            setWizardState((prev) => ({
                ...prev,
                step: prev.step + 1,
            }));
        }
    };

    const handlePrevious = () => {
        if (wizardState.step > 1) {
            setWizardState((prev) => ({
                ...prev,
                step: prev.step - 1,
            }));
        }
    };

    const handleEditStep = (step: number) => {
        setWizardState((prev) => ({
            ...prev,
            step,
        }));
    };

    const handleSubmit = () => {
        setIsLoading(true);

        // Prepare data without step field
        const { step, ...wizardData } = wizardState;

        router.post('/wizard/analyze', wizardData, {
            onSuccess: () => {
                // Navigation handled by backend redirect
            },
            onError: (errors) => {
                setIsLoading(false);
                console.error('Wizard analysis error:', errors);
            },
            onFinish: () => {
                // Keep loading state until navigation completes
            },
        });
    };

    const canProceed = () => {
        switch (wizardState.step) {
            case 1:
                return (
                    wizardState.businessProfile.businessType !== null &&
                    wizardState.businessProfile.sector !== null
                );
            case 2:
                return wizardState.salesModel.model !== null;
            case 3:
            case 4:
                return true; // Optional steps
            case 5:
                return true;
            default:
                return false;
        }
    };

    const renderStep = () => {
        switch (wizardState.step) {
            case 1:
                return (
                    <Step1BusinessProfile
                        state={wizardState}
                        updateState={updateState}
                    />
                );
            case 2:
                return (
                    <Step2SalesModel
                        state={wizardState}
                        updateState={updateState}
                    />
                );
            case 3:
                return (
                    <Step3FeaturePriorities
                        state={wizardState}
                        updateState={updateState}
                    />
                );
            case 4:
                return (
                    <Step4TechnicalRequirements
                        state={wizardState}
                        updateState={updateState}
                    />
                );
            case 5:
                return (
                    <Step5Review
                        state={wizardState}
                        onEditStep={handleEditStep}
                    />
                );
            default:
                return null;
        }
    };

    if (isLoading) {
        return (
            <LandingLayout>
                <Head title="Wizard - Platform Önerisi" />
                <div className="container mx-auto px-4 py-12">
                    <LoadingScreen />
                </div>
            </LandingLayout>
        );
    }

    return (
        <LandingLayout>
            <Head title="Platform Seçimi" />

            <div className="min-h-screen bg-gray-50/50 py-12 lg:py-20 dark:bg-gray-950/50">
                <div className="container mx-auto max-w-2xl px-4">
                    {/* Header - Minimalist */}
                    <div className="mb-8 text-center sm:text-left">
                        <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                            <Sparkles className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium tracking-wider uppercase">
                                E-Ticaret Asistanı
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Sizin İçin En Uygun Platformu Bulalım
                        </h1>
                    </div>

                    {/* Main Content Area */}
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        {/* Progress Bar Area */}
                        <div className="border-b border-gray-100 px-8 pt-8 pb-4 dark:border-gray-800/50">
                            <WizardProgress
                                currentStep={wizardState.step}
                                totalSteps={TOTAL_STEPS}
                            />
                        </div>

                        {/* Step Content */}
                        <div className="min-h-[400px] p-8">{renderStep()}</div>

                        {/* Footer / Navigation */}
                        <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-8 py-6 dark:border-gray-800 dark:bg-gray-900/50">
                            <Button
                                variant="ghost"
                                onClick={handlePrevious}
                                disabled={wizardState.step === 1}
                                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            >
                                <ChevronLeft className="mr-1 h-4 w-4" />
                                Geri
                            </Button>

                            {wizardState.step < TOTAL_STEPS ? (
                                <Button
                                    onClick={handleNext}
                                    disabled={!canProceed()}
                                    className="rounded-lg bg-gray-900 px-6 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                                >
                                    Devam Et
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleSubmit}
                                    className="rounded-lg bg-blue-600 px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
                                >
                                    Analizi Tamamla
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
