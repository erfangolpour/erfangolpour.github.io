import { useEffect, useState } from "react";
import { Contact } from "./components/Contact/Contact";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Projects } from "./components/Projects/Projects";
import { Skills } from "./components/Skills";
import { ResourceLoader } from "./utils/ResourceLoader";

function App() {
	const [resourcesLoaded, setResourcesLoaded] = useState(false);
	const [loadingProgress, setLoadingProgress] = useState(0);

	// Load all resources when the app loads
	useEffect(() => {
		// Add a loading class to the body while resources are loading
		document.body.classList.add("resources-loading");

		// Start loading all critical resources
		ResourceLoader.loadResources((progress) => {
			setLoadingProgress(Math.floor(progress));
		}).then((success) => {
			if (success) {
				setResourcesLoaded(true);
				// Remove the loading class once resources are loaded
				document.body.classList.remove("resources-loading");
				document.body.classList.add("resources-loaded");

				// After initial render, preload remaining images for a smoother experience
				ResourceLoader.preloadAdditionalImages([
					// Project modal detail images - will be needed when users open project modals
					"/src/components/Projects/Modals/mineTUIper/mineTUIper_UI.png",
					"/src/components/Projects/Modals/KIRAL/DNA_helix.gif",
					"/src/components/Projects/Modals/KIRAL/KIRAL_flowchart1.png",
					"/src/components/Projects/Modals/KIRAL/KIRAL_flowchart2.png",
					"/src/components/Projects/Modals/KIRAL/KIRAL_flowchart3.png",
					"/src/components/Projects/Modals/GreenSignal/GreenSignal_screenshot.png",
					"/src/components/Projects/Modals/ArguX/ArguX_filter.png",
					"/src/components/Projects/Modals/ArguX/ArguX_globe.png",
					"/src/components/Projects/Modals/TaskTree/TaskTree_mockup.png",
					"/src/components/Projects/Modals/TaskTree/TaskTree_UI.png",
					"/src/components/Projects/Modals/TaskTree/TaskTree_usage.gif",
					"/src/components/Projects/Modals/WaveRider/WaveRider_collision.png",
					"/src/components/Projects/Modals/WaveRider/WaveRider_menu.png",
				]);
			} else {
				// Handle case where some resources failed to load
				console.warn(
					"Some resources failed to load, showing content anyway",
				);
				setResourcesLoaded(true);
				document.body.classList.remove("resources-loading");
				document.body.classList.add("resources-loaded");
			}
		});
	}, []);

	return (
		<>
			{/* Loading screen with progress indicator */}
			{!resourcesLoaded && (
				<div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950">
					<div className="flex flex-col items-center">
						<div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
						<p className="mt-6 text-lg font-bold text-white/80">
							Loading Experience
						</p>
						<div className="mt-4 h-1.5 w-48 overflow-hidden rounded-full bg-white/10">
							<div
								className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300"
								style={{ width: `${loadingProgress}%` }}
							></div>
						</div>
						<p className="mt-2 text-sm text-white/50">
							{loadingProgress}%
						</p>
					</div>
				</div>
			)}

			{/* Only render the content once all resources are loaded */}
			<div
				className={
					resourcesLoaded
						? "opacity-100 transition-opacity duration-500"
						: "opacity-0"
				}
			>
				<Nav />
				<Hero />
				<Projects />
				<Skills />
				<Contact />
			</div>
		</>
	);
}

export default App;
