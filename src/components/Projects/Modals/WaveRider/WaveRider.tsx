import WaveRiderGameplay from "./WaveRider_collision.png";
import WaveRiderMenu from "./WaveRider_menu.png";

export function WaveRiderModalContent() {
	return (
		<div className="space-y-6 bg-gradient-to-br from-blue-900 via-cyan-900 to-blue-950 p-6 text-cyan-100 md:p-8">
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div className="space-y-4">
					{/* Game-style header */}
					<h3 className="inline-block bg-cyan-600 px-4 py-1 text-2xl font-bold tracking-widest text-blue-950 uppercase shadow-md [-webkit-text-stroke:1px_#083344]">
						Ride the Wave!
					</h3>
					<p className="text-cyan-200">
						Wave Rider is a rhythm game where you navigate a biker
						through a procedurally generated world that pulses and
						reacts to the beat of the music. Dodge obstacles and
						grab coins, all synced perfectly to the audio.
					</p>
					<a
						href="https://danigallegdup.itch.io/waverider"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center rounded-md border border-transparent bg-lime-400 px-4 py-2 text-sm font-medium text-blue-900 shadow-sm hover:bg-lime-300 focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 focus:ring-offset-blue-950 focus:outline-none"
					>
						Play on itch.io
						<svg
							className="ml-1.5 h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							></path>
						</svg>
					</a>
				</div>
				<div className="flex items-center justify-center">
					<img
						src={WaveRiderGameplay}
						alt="Wave Rider Gameplay"
						className="rounded-lg border-2 border-cyan-400 shadow-xl"
					/>
				</div>
			</div>
			<div>
				{/* Game-style header */}
				<h4 className="mb-3 inline-block bg-cyan-600/80 px-3 py-0.5 text-lg font-semibold text-blue-950 uppercase [-webkit-text-stroke:1px_#083344]">
					✨ Key Features
				</h4>
				<ul className="grid list-inside list-disc grid-cols-1 gap-3 text-cyan-100 sm:grid-cols-2">
					<li>Music-synchronized gameplay</li>
					<li>Real-time audio visualizations</li>
					<li>Dynamic environments based on genre/mood</li>
					<li>**Import your own music!** (MP3, WAV, M4A)</li>
					<li>Leaderboard competition</li>
					<li>Cross-Platform (Web & Windows)</li>
					<li>Slow-motion time effects</li>
				</ul>
			</div>
			<div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
				<div>
					<h4 className="mb-2 inline-block bg-cyan-600/80 px-3 py-0.5 text-base font-semibold text-blue-950 uppercase [-webkit-text-stroke:1px_#083344]">
						🎵 Adding Custom Songs
					</h4>
					<p className="mb-2 text-sm text-cyan-200">
						Use the Python script (`extract_song_data.py`) with
						`librosa` and `numpy` to analyze your tracks and
						generate game-ready JSON data.
					</p>
					<pre className="overflow-x-auto rounded border border-cyan-800 bg-blue-950/70 p-2 text-xs text-cyan-100 backdrop-blur-sm">
						<code>
							# Install dependencies{"\n"}
							pip install librosa numpy{"\n\n"}# Run the script
							{"\n"}
							python MIR/scripts/extract_song_data.py{"\n"}
							--file-name "path/to/song.mp3"{"\n"}
							--output-dir "path/to/output"{"\n"}
							--plot # Optional: generate plots
						</code>
					</pre>
					<p className="mt-2 text-xs text-cyan-300 italic">
						Requires Python 3.6+. See script help for more options.
					</p>
				</div>
				<div>
					<h4 className="mb-2 inline-block bg-cyan-600/80 px-3 py-0.5 text-base font-semibold text-blue-950 uppercase [-webkit-text-stroke:1px_#083344]">
						🛠️ Tech & Techniques
					</h4>
					<p className="text-sm text-cyan-200">
						Built with the{" "}
						<span className="font-bold text-lime-300">
							Godot Engine
						</span>
						. Utilizes:
					</p>
					<ul className="mt-1 list-inside list-disc text-xs text-cyan-200">
						<li>Beat & Onset Detection (Librosa)</li>
						<li>Chroma & Spectral Analysis</li>
						<li>Procedural Generation</li>
						<li>GDScript for game logic</li>
					</ul>
				</div>
			</div>
			<img
				src={WaveRiderMenu}
				alt="Wave Rider Menu"
				className="w-full rounded-lg border border-cyan-700 shadow-md"
			/>
			<p className="text-center text-xs text-cyan-300">
				Song selection menu allowing custom track import.
			</p>
		</div>
	);
}
