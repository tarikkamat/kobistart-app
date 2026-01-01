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
  featurePriorities: Record<string, {
    selected: boolean;
    priority: number; // 1-5
  }>;
  technicalRequirements: {
    apiAccess: boolean;
    mobileApp: boolean;
    multiLanguage: boolean;
    marketplaceIntegration: boolean;
  };
}

