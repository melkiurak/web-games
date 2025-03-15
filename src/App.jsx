import './App.css'
import { Category } from './Components/Categorys/Categorys'
import { Header } from './Components/Header/Header'
import { Hero } from './Components/Hero/Hero'

function App() {

  return (
    <div className='max-w-[1440px] max-desktop:max-w-[1080px] w-full h-full m-auto relative overflow-hidden'>
      <Header/>
      <Hero/>
      <Category/>
    </div>
  )
}

export default App
