export interface NewUser {
    name: string;
    email: string;
    password: string;
}

export interface User extends NewUser {
    id: number;
    created_at: Date;
}

export interface NewSighting {
    bee_id: number;
    user_id: number;
    location: string;
    description: string;
    observed_at: Date;
}

export interface Sighting extends NewSighting {
    id: number;
}

export interface Bee {
    id: number;
    species: string;
    common_name: string;
}
