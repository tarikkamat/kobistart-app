import { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import LandingLayout from '@/layouts/LandingLayout';
import { Button } from '@/components/ui/button';
import WizardProgress from './components/WizardProgress';
import Step1BusinessProfile from './components/Step1BusinessProfile';
import Step2SalesModel from './components/Step2SalesModel';
import Step3FeaturePriorities from './components/Step3FeaturePriorities';
import Step4TechnicalRequirements from './components/Step4TechnicalRequirements';
import Step5Review from './components/Step5Review';
import LoadingScreen from './components/LoadingScreen';
import { WizardState } from '@/types/wizard';
import wizardRoutes from '@/routes/wizard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    featurePriorities: {},
    technicalRequirements: {
        apiAccess: false,
        mobileApp: false,
        multiLanguage: false,
        marketplaceIntegration: false,
    },
};

export default function Wizard() {
    const [wizardState, setWizardState] = useState<WizardState>(initialWizardState);
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
        // Simulate API call
        setTimeout(() => {
            router.visit(wizardRoutes.result.url());
        }, 4000);
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
                    <Step1BusinessProfile state={wizardState} updateState={updateState} />
                );
            case 2:
                return <Step2SalesModel state={wizardState} updateState={updateState} />;
            case 3:
                return (
                    <Step3FeaturePriorities state={wizardState} updateState={updateState} />
                );
            case 4:
                return (
                    <Step4TechnicalRequirements state={wizardState} updateState={updateState} />
                );
            case 5:
                return <Step5Review state={wizardState} onEditStep={handleEditStep} />;
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
            <Head title="Wizard - Platform Önerisi" />
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="space-y-8">
                    {/* Progress */}
                    <WizardProgress currentStep={wizardState.step} totalSteps={TOTAL_STEPS} />

                    {/* Step Content */}
                    <div className="min-h-[500px]">{renderStep()}</div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-4 border-t">
                        <Button
                            variant="outline"
                            onClick={handlePrevious}
                            disabled={wizardState.step === 1}
                            className="gap-2"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Geri
                        </Button>

                        {wizardState.step < TOTAL_STEPS ? (
                            <Button
                                onClick={handleNext}
                                disabled={!canProceed()}
                                className="gap-2"
                            >
                                İleri
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        ) : (
                            <Button onClick={handleSubmit} className="gap-2">
                                Platformumu Bul
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}

