import { useQuery } from '@apollo/client';
import './App.css'
import { Category } from './Components/Categorys/Categorys'
import { Header } from './Components/Header/Header'
import { Hero } from './Components/Hero/Hero'
import { GET_DISCOUNTS, GET_GAMES, GET_NEWS_GAMES, GET_UPCOMING_GAMES } from './Service/gamedata';
import { Trending } from './Components/Trending/Trending';
import { MonthlyGames } from './Components/MonthlyGames/MonthlyGames';
import { Reviews } from './Components/Reviews/Reviews';
import { Upcoming } from './Components/Upcoming/Upcoming';
import { GameFilter } from './Components/GameFilter/GameFilter';
import { GamesNews } from './Components/GamesNews/GamesNews';

function App() {
  const { data: dataGames, loading: loadingGames, error: errorGames } = useQuery(GET_GAMES, {fetchPolicy: 'cache-first'});
  const { data: dataDiscounts, loading: loadingDiscounts, error: errorDiscounts } = useQuery(GET_DISCOUNTS, {fetchPolicy: 'cache-first'});
  const { data: dataUpcomingGames, loading: loadingUpcomingGames, error: errorUpcomingGames } = useQuery(GET_UPCOMING_GAMES, {fetchPolicy: 'cache-first'});
  const {data: dataNewsGames, loading: loadingNewsGames, error: errorNewsGames} = useQuery(GET_NEWS_GAMES, {fetchPolicy:'cache-first'});
  if (loadingGames || loadingDiscounts || loadingUpcomingGames || loadingNewsGames ) {
    return <p>Загрузка...</p>;
  }
  
  if (errorGames || errorDiscounts || errorUpcomingGames || errorNewsGames) {
    return <p>Ошибка</p>;
  }
  return (
    <div className='max-w-[1440px] max-desktop:max-w-[1080px] w-full h-full m-auto relative overflow-hidden'>
      <Header/>
      <Hero dataGames={dataGames}/>
      <main className='flex flex-col gap-[100px] max-desktop:gap-[80px] max-lg:gap-[60px]'>
        <Category dataGames={dataGames}/>
        <Trending dataGames={dataGames} dataDiscounts={dataDiscounts}/>
        <MonthlyGames dataGames={dataGames}/>
        <Reviews dataGames={dataGames}/>
        <Upcoming dataUpcomingGames={dataUpcomingGames}/>
        <GameFilter dataGames={dataGames} dataDiscounts={dataDiscounts}/>
        <GamesNews dataNewsGames={dataNewsGames}/>
      </main>
    </div>
  )
}

export default App
