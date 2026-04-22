import { getGames } from "@/Service/gamedata"
import { Game } from "@/types"
import { useEffect, useState } from "react"

export const useGetData = (flag: string, limit: number) => {
    const [data, setData] = useState<Game[]>([])
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadGame = async() => {
            try{
                setLoading(true);
                setError(false);
                const request = await getGames({[flag]: 'true', take: limit});
                setData(request);
                setLoading(false);
            } catch(error) {
                setError(true);
                setLoading(false);
                console.log('Error of get to date:', error);
            }
        }
        loadGame()
    }, [flag, limit])
    return {data, error, loading};
}