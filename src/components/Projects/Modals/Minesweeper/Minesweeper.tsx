export function MinesweeperModalContent() {
	return (
		<div className="flex flex-col items-center space-y-6 bg-gray-800 p-6 text-center text-gray-200 md:p-8">
			<h3 className="text-2xl font-semibold text-gray-300">
				Classic Minesweeper Remake
			</h3>
			<p className="max-w-md text-gray-400">
				A straightforward, web-based implementation of the timeless
				puzzle game, Minesweeper. Click carefully to avoid the mines!
			</p>
			{/* [IFRAME: Embed live game demo] */}
			{/* Ensure the liveLink is correct and allows embedding */}
			<iframe
				src="https://erfangolpour.github.io/Minesweeper/"
				title="Minesweeper Live Demo"
				className="h-140 w-full max-w-2xl rounded-lg border border-gray-600 bg-white shadow-lg" // Added bg-white for contrast
				// Consider sandbox attributes if needed: sandbox="allow-scripts allow-same-origin"
				loading="lazy"
				onError={(e) => {
					console.error("Iframe failed to load:", e);
					(e.target as HTMLIFrameElement).src = "about:blank";
					(e.target as HTMLIFrameElement).outerHTML =
						'<p class="text-red-400 text-sm">Could not load live demo.</p>';
				}}
			>
				{/* Fallback content if iframe fails or isn't supported */}
				<p className="p-4 text-gray-600">
					Loading Minesweeper Demo... If it doesn't load, your browser
					might not support iframes or the content is blocked. You can{" "}
					<a
						href="https://erfangolpour.github.io/Minesweeper/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-indigo-400 hover:underline"
					>
						play it here
					</a>
					.
				</p>
			</iframe>
			<p className="text-xs text-gray-500">(Live Demo Embedded Above)</p>

			<div>
				<h4 className="mb-1 text-lg font-medium">Technology</h4>
				<p className="text-sm text-gray-400">Built purely with:</p>
				<span className="mt-1 inline-block rounded-full bg-yellow-900 px-3 py-1 text-sm font-medium text-yellow-200">
					Vanilla JavaScript, HTML, CSS
				</span>
			</div>
		</div>
	);
}
