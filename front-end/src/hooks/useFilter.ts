import { GameFilter } from "@/types";
import { useCallback, useMemo, useState } from "react"

export const useFilter = <T extends {genres: any[]}> (allGame: T[]) => {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    const toggleGenres = useCallback((newGenre: string) => {
        setSelectedGenres((prev) => {
            return prev.includes(newGenre) ? prev.filter(g => g !== newGenre) : [...prev, newGenre]
        })
    },[])

    const filterGames = useMemo(() => {
        if(selectedGenres.length > 0){
            return allGame.filter(game => game.genres?.some(g => selectedGenres.includes(g.value.toLowerCase())))
        } else {
            return allGame;
        }
    }, [allGame, selectedGenres]);
    return {filterGames,selectedGenres,setSelectedGenres}
} 