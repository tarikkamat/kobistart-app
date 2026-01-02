import { Platform } from './platform';

export interface Favorite {
    id: number;
    user_id: number;
    favoritable_type: string;
    favoritable_id: number;
    created_at: string;
    updated_at: string;
    favoritable?: Platform | any; // Platform or Plan
}
