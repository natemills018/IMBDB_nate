export interface Sighting {
    id: number;
    bee_id: number;
    user_id: number;
    location: string;
    description: string;
    observed_at: Date | string;
}

export interface Bee {
    id: number;
    species: string;
    common_name: string;
}
