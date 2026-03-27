import { useCallback, useMemo } from "react"
import { useSearchParams } from "react-router";

export const useFilter = <T extends {genres: any[], platforms: any[]}> (allGame: T[]) => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const getSelected = (key: string) => {
        return searchParams.get(key)?.split(',').filter(Boolean) || [];
    };

    const selectedGenres = getSelected('genre');
    const selectedPlatforms = getSelected('platform');
    
    const toggleFilter = useCallback((key:string, value: string) => {
        const currentValues = searchParams.get(`${key}`)?.split(',') || []
        const params = new URLSearchParams(searchParams);
        const updated = currentValues.includes(value) ? currentValues.filter(v => v !== value) : [...currentValues, value]
        if(updated.length > 0) {
            params.set(`${key}`, updated.join(','))
        } else{
            params.delete(`${key}`)
        }
        setSearchParams(params)
    }, [searchParams, setSearchParams]);

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
    return { filterGames, selectedGenres, selectedPlatforms, toggleFilter };
} 