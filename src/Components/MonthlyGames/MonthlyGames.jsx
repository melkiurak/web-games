import { useEffect, useState } from "react";

export const MonthlyGames = ({dataGames}) => {
    const [gamesMothly, setGamesMothly] = useState([]);
    const nowDate = new Date().toLocaleDateString("en-US", {year: 'numeric',month: 'numeric',}).split('/').map(Number) 
    
    const monthlyGames = dataGames?.games?.edges.filter((edge) => {
        if (edge.node.gameOfTheMonthDate) {
          const gameDate = new Date(edge.node.gameOfTheMonthDate).toLocaleDateString("en-US", {year: 'numeric',month: 'numeric',}).split('/').map(Number);
          return nowDate[0] === gameDate[0] && nowDate[1] === gameDate[1];
        }
        return false;
    });
    useEffect(() => {
        if (monthlyGames.length > 0) {
            setGamesMothly(monthlyGames);
        } else {
            setGamesMothly([]);
            console.log('Нет игр, этого месяца');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataGames])
    return <div>
        <h1>hello</h1>
        {gamesMothly.map((edge) => (
            <div key={edge}> 
                <h4>{edge.node.name}</h4>
            </div>
        ))}
    </div>
}