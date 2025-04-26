import AOM from "./AOM.png";

export function AOMModalContent() {
	return (
		<div className="space-y-6 bg-gradient-to-b from-stone-800 to-stone-900 p-6 text-stone-200 md:p-8">
			<div className="text-center">
				<h3 className="mb-3 text-2xl font-semibold text-amber-300">
					Math Meets Aesthetics
				</h3>
				<p className="mx-auto max-w-2xl text-stone-300">
					Inspired by Evgeny Tuev, this project visually explores the
					inherent beauty of mathematical functions as they appear in
					the world around us. It uses interactive charts to overlay
					functions onto images.
				</p>
				<img
					src={AOM}
					alt="Art of Mathematics Screenshot"
					className="mt-6 block w-full rounded-lg border-4 border-stone-700 shadow-lg"
				/>
			</div>

			<div className="w-full rounded-r-lg border-l-4 border-amber-600 bg-stone-800/80 p-4 backdrop-blur-sm">
				<h4 className="mb-2 text-lg font-medium text-amber-400">
					How to Interact
				</h4>
				<ul className="list-inside list-disc space-y-1 text-sm text-stone-300">
					<li>
						Hover over functions in the panel to highlight them on
						the graph.
					</li>
					<li>Use arrows on the image to switch function sets.</li>
					<li>Click functions for detailed descriptions.</li>
					<li>
						Key points (integer coordinates) are calculated
						automatically (max 10).
					</li>
					<li>Best viewed on landscape screens.</li>
				</ul>
			</div>

			<div className="text-center">
				<h4 className="mb-3 text-xl font-semibold text-amber-300">
					Acknowledgments
				</h4>
				<p className="text-stone-300">
					Made possible with the fantastic libraries:
				</p>
				<div className="mt-2 flex flex-wrap justify-center gap-3">
					{["MathJax", "Chartist.js", "JavaScript", "HTML/CSS"].map(
						(tech) => (
							<span
								key={tech}
								className="rounded-full bg-amber-800 px-4 py-1 text-sm font-medium text-amber-100 shadow-md"
							>
								{tech}
							</span>
						),
					)}
				</div>
			</div>
		</div>
	);
}
