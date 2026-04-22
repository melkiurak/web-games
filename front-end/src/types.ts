interface User {
    id: string,
    name: string,
    avatar: string,
}
interface Comment {
    id: string,
    user: User,
    gameId: number,
    text: string,
    date: string,
}
interface ISystemRequirements{
    os: string,
    cpu: string,
    gpu: string,
    ram: string,
    storage: string;
}
export interface Game {
    id: string,
    name: string,
    metaScore: number,
    first_release_date: string,
    summary: string,
    description: string,
    price: number,
    min_requirements: ISystemRequirements | null,
    max_requirements: ISystemRequirements | null,
    poster: string,
    genres: string[],
    platforms: string[],
    screenshots: string[],
    videos: string[],
    companies: string,
    comments: Comment[]
}
export type GameCardPreview = Pick<Game, 'id' | 'name' | 'poster' | 'metaScore' | 'price' | 'genres' | 'first_release_date' | 'platforms' >

export type GameHero = Pick<Game, 'id' | 'name' | 'description' | 'poster'>

export type GameFilter = Partial<Pick<Game, 'genres' | 'platforms' | 'first_release_date' | 'price' >>