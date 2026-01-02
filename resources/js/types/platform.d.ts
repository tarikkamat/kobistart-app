import { PlanFeature } from './feature';

export interface PlanPrice {
    id: number;
    plan_id: number;
    period: 'monthly' | 'yearly' | 'two_yearly';
    original_price: number;
    discounted_price: number | null;
    currency: string;
    is_monthly_payment: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface Plan {
    id: number;
    platform_id: number;
    name: string;
    slug: string;
    status: boolean;
    order: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    planPrices?: PlanPrice[];
    plan_prices?: PlanPrice[]; // Support snake_case from backend
    features?: PlanFeature[];
}

export interface Platform {
    id: number;
    name: string;
    description: string | null;
    slug: string;
    url: string;
    logo: string | null;
    dark_logo: string | null;
    favicon: string | null;
    status: boolean;
    order: number;
    color: string | null;
    is_local: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    plans?: Plan[];
    comments?: any[];
    is_favorited?: boolean;
}
