import ArgusFilter from "./ArguX_filter.png";
import ArgusGlobe from "./ArguX_globe.png";

export function ArguXModalContent() {
	return (
		<div className="space-y-6 bg-gradient-to-br from-gray-900 to-blue-900 p-6 text-gray-100 md:p-8">
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
				<div>
					<h3 className="mb-3 text-2xl font-semibold text-blue-300">
						All-Seeing OSINT
					</h3>
					<p className="text-gray-300">
						Named after Argus Panoptes, the all-seeing giant of
						Greek mythology, ArguX leverages modern computer vision
						(YOLOv11) and distributed task processing (Celery/Redis)
						to analyze publicly accessible camera streams from
						sources like Insecam.
					</p>
					<p className="mt-3 text-gray-300">
						It identifies objects, extracts geolocation data, and
						presents findings through an interactive web interface
						built with React and Vite.
					</p>
					<div className="mt-6">
						<h4 className="mb-2 text-lg font-medium text-blue-300">
							Ethical Considerations
						</h4>
						<p className="text-sm text-gray-400">
							This tool accesses publicly available feeds, which
							may not always be intentionally public. Use
							responsibly, respect privacy, and adhere to legal
							regulations. The tool is intended for educational
							and research purposes only.
						</p>
					</div>
				</div>
				<div className="flex flex-col justify-center">
					<img
						src={ArgusGlobe}
						alt="ArguX Interactive Globe"
						className="rounded-lg shadow-xl"
					/>
					<p className="mt-2 text-center text-xs text-gray-400">
						Interactive 3D globe visualization
					</p>
				</div>
			</div>
			<div>
				<h4 className="mb-3 text-xl font-semibold text-blue-300">
					Core Features
				</h4>
				<ul className="grid list-inside list-disc grid-cols-1 gap-3 text-gray-300 sm:grid-cols-2">
					<li>High-Performance Processing (Celery + Redis)</li>
					<li>Advanced YOLOv11 Object Detection</li>
					<li>Interactive 3D Globe Visualization (Three.js)</li>
					<li>Real-time Updates via WebSockets</li>
					<li>Geolocation Mapping (ip-api.com)</li>
					<li>Comprehensive Filtering & Sorting</li>
					<li>Flexible Scanning (Country or Global)</li>
					<li>Graceful Error Handling</li>
				</ul>
			</div>
			<img
				src={ArgusFilter}
				alt="ArguX Filtering"
				className="rounded-lg shadow-xl"
			/>
			<p className="mt-2 text-center text-xs text-gray-400">
				Robust filtering and data display
			</p>
			<div>
				<h4 className="mb-3 text-xl font-semibold text-blue-300">
					Technology Stack
				</h4>
				<div className="flex flex-wrap gap-2">
					{[
						"FastAPI",
						"Celery",
						"Redis",
						"YOLOv11",
						"OpenCV",
						"Beautiful Soup",
						"Vite.js",
						"React 19",
						"TypeScript",
						"Three.js",
						"Recharts",
						"Tailwind CSS",
						"Zustand",
					].map((tech) => (
						<span
							key={tech}
							className="rounded-full bg-blue-800/70 px-3 py-1 text-sm text-blue-100"
						>
							{tech}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
