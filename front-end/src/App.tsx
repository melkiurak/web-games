import { useQuery } from '@apollo/client';
import { Category } from './Components/Categorys/Categorys'
import { Header } from './Components/Header/Header'
import { Hero } from './Components/Hero/Hero'
import { Trending } from './Components/Trending/Trending';
import { MonthlyGames } from './Components/MonthlyGames/MonthlyGames';
import { Reviews } from './Components/Reviews/Reviews';
import { Upcoming } from './Components/Upcoming/Upcoming';
import { GamesNews } from './Components/GamesNews/GamesNews';
import { Auth } from './Components/Auth/Auth';
import { Faq } from './Components/FAQ/Faq';
import { Footer } from './Components/Footer/Footer';
import { useEffect } from 'react';
import { GameCard } from './Components/ui/GameCard/GameCard';
import { TestHook } from './Components/TestHooks/TestHooks';
import { GameFilter } from './Components/GameFilter/GameFilter';

function App() {
  return (
    <div className={/*`max-w-[1440px] max-desktop:max-w-[1080px]`*/  'w-full h-full m-auto relative overflow-hidden'}>
      <GameFilter/>
      {/*
      <Trending/>
      <Header/>
      <Hero/>
      <Trending/>
      <Upcoming/>
      <TestHook/>
      <Upcoming/>
      <main className='flex flex-col gap-[100px] max-desktop:gap-[80px] max-lg:gap-[60px] mb-[100px] max-desktop:mb-[80px] max-lg:mb-[60px]'>
        <Category dataGames={dataGames}/>
        <MonthlyGames dataGames={dataGames}/>
        <Reviews dataGames={dataGames}/>
        <GamesNews dataNewsGames={dataNewsGames}/>
        <Auth/>
        <Faq/>
      </main>
      <Footer/>*/}
    </div>
  )
  
}

export default App
