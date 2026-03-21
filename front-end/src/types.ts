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
interface Game {
    id: string,
    name: string,
    rating: number,
    first_release_date: string,
    summary: string,
    price: number,
    min_requirements: ISystemRequirements | null,
    max_requirements: ISystemRequirements | null,
    cover_url: string,
    genres: string[],
    platforms: string[],
    screenshots: string[],
    videos: string[],
    companies: string,
    comments: Comment[]
}
export type GameCardPreview = Pick<Game, 'id' | 'name' | 'cover_url' | 'rating' | 'price' | 'genres' >

export type GameHero = Pick<Game, 'id' | 'name' | 'summary' | 'cover_url'>

export type GameFilter = Partial<Pick<Game, 'genres' | 'platforms' | 'first_release_date' | 'price' >>
