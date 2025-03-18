import { GlowingEffectDemo } from "./components/Glowing/Glowing";
import { Hero } from './components/Hero/Hero';
import { Projects } from './components/Projects';
import { TimelineDemo } from "./components/Timeline/TimelineDemo";

function App() {
  return (
    <>
      <Hero />
      <div className='h-100'></div>
      <Projects />
      <TimelineDemo />
      <GlowingEffectDemo />
      <div className='h-200 flex justify-center items-center'>
        <h1 className='text-4xl'>Hello Vite + React + Tailwind CSS</h1>
      </div>
    </>
  )
}

export default App
