import { Plan, Platform } from './platform';

export interface Comparison {
    id: number;
    user_id: number;
    plan1_id: number;
    plan2_id: number;
    plan1_data: {
        plan: Plan;
        platform: Platform;
    };
    plan2_data: {
        plan: Plan;
        platform: Platform;
    };
    comparison_data: {
        features_by_category?: Record<string, any[]>;
        summary?: Record<string, any>;
    };
    notes: string | null;
    created_at: string;
    updated_at: string;
    plan1?: Plan;
    plan2?: Plan;
}

export interface SaveComparisonData {
    plan1_id: number;
    plan2_id: number;
    plan1_data: {
        plan: Plan;
        platform: Platform;
    };
    plan2_data: {
        plan: Plan;
        platform: Platform;
    };
    comparison_data: {
        features_by_category?: Record<string, any[]>;
        summary?: Record<string, any>;
    };
    notes?: string | null;
}

