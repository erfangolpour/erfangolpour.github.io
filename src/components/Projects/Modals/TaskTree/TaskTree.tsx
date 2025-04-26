import TaskTree_Mockup from "./TaskTree_mockup.png";
import TaskTree_UI from "./TaskTree_UI.png";
import TaskTree_usage from "./TaskTree_usage.gif";

export function TaskTreeModalContent() {
	return (
		<div className="space-y-8 bg-neutral-900 p-6 text-neutral-100 md:p-8">
			<div className="text-center">
				<img
					src={TaskTree_Mockup}
					alt="TaskTree Mockup"
					className="mb-4 inline-block w-full rounded-lg shadow-md"
				/>
				<p className="text-lg text-neutral-300">
					TaskTree reimagines task management with a powerful
					hierarchical structure and an innovative dual-view system
					(List & Graph), perfect for visualizing complex
					relationships.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-8 md:grid-cols-5">
				{/* Left Side: Content */}
				<div className="space-y-6 md:col-span-3">
					<div>
						<h3 className="mb-3 text-xl font-semibold text-indigo-400">
							📊 Dual View System
						</h3>
						<ul className="list-inside list-disc space-y-1 text-neutral-400">
							<li>
								<b>List View:</b> Traditional drag-and-drop
								interface.
							</li>
							<li>
								<b>Graph View:</b> Interactive node-based
								visualization.
							</li>
							<li>
								<b>Real-time Sync:</b> Changes in one view
								reflect instantly in the other.
							</li>
						</ul>
					</div>
					<div>
						<h3 className="mb-3 text-xl font-semibold text-indigo-400">
							📑 Task Organization
						</h3>
						<ul className="list-inside list-disc space-y-1 text-neutral-400">
							<li>Hierarchical parent-child relationships.</li>
							<li>Multi-Parent support for complex links.</li>
							<li>Intuitive Drag & Drop reorganization.</li>
							<li>Animated visual connections in Graph view.</li>
						</ul>
					</div>
				</div>
				{/* Right Side: Graph Pattern Background Area */}
				<div className="rounded-lg bg-neutral-800 md:col-span-2">
					<img
						src={TaskTree_usage}
						alt="TaskTree Usage"
						className="size-full rounded-lg object-cover"
					/>
				</div>
			</div>

			<div>
				<h3 className="mb-4 text-center text-2xl font-semibold text-indigo-400">
					🎯 Core Management Features
				</h3>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{/* Feature Cards with Hover Effect */}
					{[
						{
							title: "Priority & Due Dates",
							desc: "Color-coded levels (Low, Medium, High) and deadline tracking.",
						},
						{
							title: "Tags & Notes",
							desc: "Categorize with custom tags and add detailed descriptions.",
						},
						{
							title: "Completion Tracking",
							desc: "Mark tasks complete and monitor progress easily.",
						},
						{
							title: "Advanced Filtering",
							desc: "Filter by priority, completion status, and search terms.",
						},
						{
							title: "Smart Sorting",
							desc: "Sort by creation date, priority, due date, or status.",
						},
						{
							title: "Responsive UX",
							desc: "Dark/Light mode, real-time updates, intuitive controls.",
						}, // Note: Dark/Light mode mentioned but app is dark only
					].map((feature) => (
						<div
							key={feature.title}
							className="cursor-pointer rounded-lg border border-neutral-700 bg-neutral-800 p-4 transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:border-indigo-500 hover:shadow-lg"
						>
							<h4 className="font-semibold">{feature.title}</h4>
							<p className="text-sm text-neutral-400">
								{feature.desc}
							</p>
						</div>
					))}
				</div>
			</div>

			<div>
				<img
					src={TaskTree_UI}
					alt="TaskTree Mockup"
					className="mb-4 inline-block w-full rounded-lg shadow-md"
				/>
			</div>

			<div>
				<h3 className="mb-3 text-xl font-semibold text-indigo-400">
					🚀 Technical Stack
				</h3>
				<div className="flex flex-wrap gap-2">
					{[
						"React",
						"TypeScript",
						"Zustand",
						"ReactFlow",
						"DnD-kit",
						"TailwindCSS",
						"Supabase",
					].map((tech) => (
						<span
							key={tech}
							className="rounded-full bg-indigo-900 px-3 py-1 text-sm text-indigo-200"
						>
							{tech}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
