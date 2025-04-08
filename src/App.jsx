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
import { Auth } from './Components/Auth/Auth';

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
        <Auth/>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos qui delectus nobis eum ex, cumque odit adipisci odio et ad consectetur laborum, dicta unde quae a alias cupiditate excepturi dolorum?
        Ut, asperiores magnam alias perferendis, sapiente maxime quo repellendus, cum facilis doloribus neque fuga adipisci dolores? Earum exercitationem, vel recusandae laborum sint, voluptas, beatae tenetur animi totam perferendis sunt quisquam.
        Aspernatur fuga sed eligendi exercitationem dolores, facere nihil dicta reiciendis voluptatem natus modi impedit accusantium voluptates fugiat vel non quaerat consequatur repellendus dolorum consectetur. Tempore eaque accusantium a eveniet aut.
        Saepe dignissimos quis maiores ex officiis earum ratione cum, quisquam sed! Corrupti recusandae eius iste eveniet suscipit ipsam possimus neque sit porro? Vero natus eligendi architecto iste et beatae odio?
        Magni ipsa nihil numquam cumque deserunt similique sed saepe nesciunt iure ratione eveniet commodi dolores aut error, et eum. Minus quam a sequi eum tenetur alias eaque officia unde. Harum.
        Eveniet in magnam recusandae eos voluptatum nihil voluptatibus molestias architecto aperiam suscipit iure, accusamus quidem reiciendis? Architecto quam eligendi harum labore quo, modi dignissimos debitis, dicta repellendus nihil saepe officiis.
        Voluptatibus cum accusamus modi ipsa, temporibus expedita minima illo illum molestiae neque sequi iste impedit architecto ullam delectus. Delectus, nobis doloribus omnis iusto tempore accusantium molestias. Similique deserunt nam corrupti!
        Eaque ipsum nam magni modi amet harum saepe placeat cumque officia, molestias tempora dolores, doloremque accusantium illum quas fugit error! In vero recusandae illum cum libero dicta. Rem, doloribus eos?
        Facilis fugiat, aperiam sequi minus eligendi rem! Quo officiis facilis accusantium ea ipsam deleniti eius fugit debitis quidem, laborum nobis ratione praesentium placeat sequi, iusto nulla? Quae exercitationem incidunt alias!
        Incidunt animi ut quasi deserunt, nemo natus laboriosam necessitatibus! Doloribus fugit adipisci nostrum sit incidunt, architecto voluptates necessitatibus aliquam tempora? Quaerat repellat eos quod vel soluta excepturi omnis perferendis enim?</p>
      </main>
    </div>
  )
}

export default App
