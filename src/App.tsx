import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { BentoGridThirdDemo } from "./components/Skills/Skills";
import { TimelineDemo } from "./components/Timeline/TimelineDemo";
import { GlowingEffectDemo } from "./components/Glowing/Glowing";

function App() {
  return (
    <>
      <Hero />
      <BentoGridThirdDemo />
	  {/* <GlowingEffectDemo /> */}
	  {/* <TimelineDemo /> */}
      <Projects />
    </>
  );
}

export default App;
