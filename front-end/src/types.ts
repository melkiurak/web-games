interface User {
    id: string;
    name: string;
    avatar: string;
}

interface Comment {
    id: string;
    user: User;
    gameId: number;
    text: string;
    date: string;
}

interface ISystemRequirements {
    os: string;
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
}

export interface MetaData {
    id: number; 
    name: string;
}

export interface Genre extends MetaData {}
export interface Platform extends MetaData {}
export interface Publisher extends MetaData {}
export interface Category extends MetaData {}

export interface IAllMetadata {
    genres: Genre[];
    platforms: Platform[];
    publishers: Publisher[];
    categories: Category[];
}

export interface Game {
    id: number; 
    name: string;
    metaScore: number;
    date: string;
    summary: string;
    description: string;
    price: number;
    min_requirements: ISystemRequirements | null;
    max_requirements: ISystemRequirements | null;
    poster: string;
    genres: Genre[];       
    platforms: Platform[]; 
    publishers: Publisher[]; 
    categories: Category[];
    screenshots: string[];
    videos: string[];
    comments: Comment[];
}

export interface IGameQuery {
    genres?: string | string[];
    platforms?: string | string[];
    publishers?: string | string[];
    categories?: string | string[];
    date?: number;
    price?: number;
    metaScore?: number;
    online?: boolean;
}

export type GameCardPreview = Pick<Game, 'id' | 'name' | 'poster' | 'metaScore' | 'price' | 'genres' | 'date' | 'platforms'>;

export type GameHero = Pick<Game, 'id' | 'name' | 'description' | 'poster'>;

export type GameFilter = Partial<Pick<Game, 'genres' | 'platforms' | 'date' | 'price'>>;