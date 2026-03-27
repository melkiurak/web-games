import { GameFilter } from "@/types";
import { split } from "@apollo/client";
import { platform } from "node:os";
import { useCallback, useMemo, useState } from "react"
import { useSearchParams } from "react-router";

export const useFilter = <T extends {genres: any[], platforms: any[]}> (allGame: T[]) => {
   // const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    //const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    
    
    const selectedGenres = useMemo(() => {
        return searchParams.get('genre')?.split(',') || []
    }, [searchParams]);
   
    const selectedPlatforms = useMemo(() => {
        return searchParams.get('platform')?.split(',') || []
    }, [searchParams])
    
    const toggleGenre = useCallback((genre: string) => {
        const params = new URLSearchParams(searchParams);
        const updated = selectedGenres.includes(genre) ? selectedGenres.filter(g => g !== genre) : [...selectedGenres, genre];
        if(updated.length > 0){
            params.set('genre', updated.join(','))
        } else {
            params.delete('genre')
        }
        setSearchParams(params)
    }, [selectedGenres, searchParams, setSearchParams]);

    const togglePlatform = useCallback((platform: string) => {
        const params = new URLSearchParams(searchParams);
        const updated = selectedPlatforms.includes(platform) ? selectedPlatforms.filter(p => p !== platform) : [...selectedPlatforms, platform];
        if(updated.length > 0) {
            params.set('platform', updated.join(','))            
        } else {
            params.delete('platform')
        }
        setSearchParams(params);
    }, [selectedPlatforms, searchParams, setSearchParams]);

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