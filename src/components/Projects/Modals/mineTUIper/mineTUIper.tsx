import { useEffect, useState } from "react";
import mineTUIper_UI from "./mineTUIper_UI.png";

// Simplified typing animation component - no need to check font loading
const TypingText = ({ text }: { text: string }) => {
	const [displayText, setDisplayText] = useState("");

	useEffect(() => {
		let index = 0;
		let typingInterval: number;

		// Start typing after a small delay
		const startTimeout = setTimeout(() => {
			typingInterval = setInterval(() => {
				if (index < text.length) {
					setDisplayText(text.substring(0, index + 1));
					index++;
				} else {
					clearInterval(typingInterval);
				}
			}, 100);
		}, 400);

		return () => {
			clearTimeout(startTimeout);
			clearInterval(typingInterval);
		};
	}, [text]);

	// Show a blinking cursor effect
	return <span className="relative font-mono">{displayText}</span>;
};

export function mineTuiperModalContent() {
	return (
		<div className="space-y-6 bg-black p-6 font-mono text-green-400 md:p-8">
			<div className="text-center">
				<h3 className="text-3xl font-bold text-yellow-400">
					<TypingText text="[ mineTUIper ]" />
				</h3>
				<p className="mt-2 text-lime-400">
					A classic Minesweeper experience, reimagined for your
					terminal!
				</p>
				<pre className="mt-2 text-xs text-gray-500 select-none">
					{`
	\\|/
   --*--
	/|\\
`}
				</pre>
			</div>

			<div>
				<h4 className="mb-2 text-lg font-semibold text-cyan-400">
					&gt; Features
				</h4>
				<ul className="list-inside list-['>_'] space-y-1 text-base text-green-400">
					<li>Play Minesweeper directly in the terminal.</li>
					<li>Fully keyboard-controlled navigation and actions.</li>
					<li>
						Includes an automated Solver for logical deductions.
					</li>
					<li>
						Features an Analyzer to generate deterministic boards.
					</li>
					<li>
						Built with Python and the{" "}
						<code className="bg-gray-800 px-1 text-yellow-400">
							rich
						</code>{" "}
						library for TUI.
					</li>
				</ul>
			</div>

			<div>
				<h4 className="mb-2 text-lg font-semibold text-cyan-400">
					&gt; Usage
				</h4>
				<div className="space-y-3">
					<pre className="overflow-x-auto rounded border border-gray-700 bg-gray-800/80 p-3 text-sm text-green-300 backdrop-blur-sm">
						<code>
							# Play the game (defaults: 19x32, 25% mines)
							{"\n"}
							python minesweeper.py [-r ROWS] [-c COLS] [-m
							MINES_PERCENT]{"\n\n"}# Run the analyzer/solver
							{"\n"}
							python analyzer.py [--no-guessing] [-d]
						</code>
					</pre>
					<p className="text-sm text-gray-400">
						Check{" "}
						<code className="rounded bg-gray-700 px-1 text-xs">
							--help
						</code>{" "}
						for all options (seed, no-guessing mode, debug).
					</p>
				</div>
			</div>

			<img
				src={mineTUIper_UI}
				alt="Minesweeper Gameplay"
				className="w-full rounded border border-gray-700 opacity-80"
			/>

			<div>
				<h4 className="mb-2 text-lg font-semibold text-cyan-400">
					&gt; Controls
				</h4>
				<ul className="space-y-1 text-sm text-green-400">
					<li>
						<span className="text-yellow-400">[Letter]</span> :
						Reveal cell
					</li>
					<li>
						<span className="text-yellow-400">
							[Shift + Letter]
						</span>{" "}
						: Flag/unflag cell
					</li>
					<li>
						<span className="text-yellow-400">[Enter]</span> : Reset
						game
					</li>
					<li>
						<span className="text-yellow-400">[Esc]</span> : Exit
						game
					</li>
				</ul>
			</div>
		</div>
	);
}
