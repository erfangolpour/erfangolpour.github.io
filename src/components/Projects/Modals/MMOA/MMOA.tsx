import MMOA from "./MMOA.png";

export function MMOAModalContent() {
	return (
		<div className="flex flex-col items-center gap-8 bg-stone-900 p-6 font-serif text-stone-200 md:p-8">
			<div className="w-full flex-shrink-0 border-4 border-stone-700 bg-stone-800 p-2 shadow-lg">
				<img
					src={MMOA}
					alt="Met Museum API Interface Screenshot"
					className="block w-full border border-stone-700"
				/>
			</div>
			<div className="flex-1 space-y-4 text-center">
				<h3 className="text-2xl font-semibold text-stone-300">
					Art at Your Fingertips
				</h3>
				<p className="font-sans text-stone-400">
					This project provides a simple yet elegant interface to
					explore the vast collection of The Metropolitan Museum of
					Art via its public API. Search for artworks spanning 5,000
					years of world culture.
				</p>
				<div className="mt-4">
					<h4 className="mb-2 text-lg font-medium text-stone-300">
						Key Features
					</h4>
					<ul className="list-inside list-disc space-y-1 font-sans text-sm text-stone-400">
						<li>Keyword-based collection search</li>
						<li>Detailed artwork information display</li>
						<li>Responsive design for all devices</li>
						<li>Built with Vanilla JS, HTML, and CSS</li>
					</ul>
				</div>
				<p className="font-sans text-xs text-stone-500 italic">
					A demonstration of API interaction and fundamental web
					technologies.
				</p>
			</div>
		</div>
	);
}
