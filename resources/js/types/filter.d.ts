export interface FilterItem {
    id: number;
    filter_group_id: number;
    feature_id: number | null;
    feature_key: string | null;
    name: string;
    order: number;
    status: boolean;
    created_at: string;
    updated_at: string;
}

export interface FilterGroup {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    order: number;
    status: boolean;
    created_at: string;
    updated_at: string;
    filter_items?: FilterItem[];
}
