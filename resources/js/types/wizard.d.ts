import { Platform } from './platform';

export interface WizardState {
    step: number;
    businessProfile: {
        businessType: 'startup' | 'growing' | 'enterprise' | null;
        monthlyBudget: number;
        sector: string | null;
    };
    salesModel: {
        model: 'b2c' | 'b2b' | 'both' | null;
        hasPhysicalStore: boolean;
        marketplaceSelling: boolean;
    };
    featurePriorities: {
        selectedFeatures: string[];
        priorities: Record<string, string>;
    };
    technicalRequirements: {
        apiAccess: boolean;
        mobileApp: boolean;
        multiLanguage: boolean;
        marketplaceIntegration: boolean;
    };
}

export interface RecommendedPlan {
    id: number;
    name: string;
    slug: string;
    monthlyPrice: number;
    currency: string;
}

export interface MatchBreakdown {
    budget: {
        score: number;
        withinBudget: boolean;
        explanation: string;
    };
    features: {
        score: number;
        matched: number;
        total: number;
        criticalMissing: string[];
        explanation: string;
    };
    technical: {
        score: number;
        met: number;
        total: number;
        missing: string[];
        explanation: string;
    };
    businessModel: {
        score: number;
        explanation: string;
    };
}

export interface PlatformRecommendation {
    platform: Platform;
    recommendedPlan: RecommendedPlan;
    score: number;
    confidence: 'high' | 'medium' | 'low';
    reasons: string[];
    warnings: string[];
    matchBreakdown: MatchBreakdown;
}

export interface SecondaryRecommendation {
    platform: Platform;
    recommendedPlan: RecommendedPlan;
    score: number;
    reasons: string[];
    criticalGaps: string[];
}

export interface AlternativeScenario {
    scenario: string;
    impact: string;
    newRecommendation: {
        platform: Platform;
        reason: string;
    };
}

export interface Insights {
    strengths: string[];
    considerations: string[];
    nextSteps: string[];
}

export interface WizardAnalysisResult {
    primary: PlatformRecommendation;
    secondary?: SecondaryRecommendation;
    alternativeScenarios?: AlternativeScenario[];
    insights?: Insights;
}

export interface WizardAnalysis {
    id: number;
    platform: Platform | null;
    plan: RecommendedPlan | null;
    score: number;
    confidence: 'high' | 'medium' | 'low';
    created_at: string;
    updated_at: string;
}

export interface WizardAnalysisListItem {
    id: number;
    platform: Platform | null;
    plan: RecommendedPlan | null;
    score: number;
    confidence: 'high' | 'medium' | 'low';
    created_at: string;
    updated_at: string;
}

export interface WizardAnalysisDetail {
    id: number;
    result: WizardAnalysisResult;
    wizard_data: WizardState;
    score: number;
    confidence: 'high' | 'medium' | 'low';
    created_at: string;
}
