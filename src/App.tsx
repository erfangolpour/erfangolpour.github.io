import { Contact } from "./components/Contact/Contact";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Projects } from "./components/Projects/Projects";
import { Skills } from "./components/Skills";

function App() {
	return (
		<>
			<Nav />
			<Hero />
			<Projects />
			<Skills />
			<Contact />
		</>
	);
}

export default App;
