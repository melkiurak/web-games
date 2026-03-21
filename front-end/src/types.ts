export interface GameNode {
    objectId: string;
    name: string;
    category: { name: string };
}

export interface GameEdge {
    node: GameNode;
}

export interface GamesDataProp {
    dataGames: {
        games: {
            edges: GameEdge[];
        };
    };
}

export interface CategoryNode {
    objectId: string;
    name: string;
    img: { url: string };
    type: string; 
}

export interface CategoryEdge {
    node: CategoryNode;
}

export interface CategoryQueryData {
    categoryGames: {
        count: number;
        edges: CategoryEdge[];
    };
}
