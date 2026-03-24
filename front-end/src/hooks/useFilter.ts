import { GameFilter } from "@/types";
import { useCallback, useMemo, useState } from "react"

export const useFilter = <T extends {genres: any[], platforms: any[]}> (allGame: T[]) => {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    
    const toggleGenre = useCallback((genre: string) => {
        setSelectedGenres(prev => prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]);
    }, []);

    const togglePlatform = useCallback((platform: string) => {
        setSelectedPlatforms(prev => prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]);
    }, []);

    const filterGames = useMemo(() => {
        let result = [...allGame];
        if (selectedGenres.length > 0) {
            const lowerSelected = selectedGenres.map(s => s.toLowerCase());
            result = result.filter(game => 
                game.genres?.some(g => lowerSelected.includes(g.toLowerCase()))
            );
        }
        if (selectedPlatforms.length > 0) {
            const lowerSelected = selectedPlatforms.map(p => p.toLowerCase());
            result = result.filter(game => 
                game.platforms?.some(p => lowerSelected.includes(p.toLowerCase()))
            );
        }

        return result;
        
    }, [allGame, selectedGenres, selectedPlatforms]);
    return { filterGames, selectedGenres, selectedPlatforms, toggleGenre, togglePlatform };
} 