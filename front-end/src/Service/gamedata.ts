
interface gameFetch {
  [key: string]: string | number | boolean | undefined;
}

export const getGames = async(params:gameFetch) => {
  try{
    const searchParams = new URLSearchParams(params as any)
    const response = await fetch(`http://localhost:3000/games?${searchParams.toString()}`);
    return  response.json()
  } catch (error) {
    console.log('Error to get the game:', error)
    return [];
  }
}