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
}

export interface Platform {
    id: number;
    name: string;
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
}

