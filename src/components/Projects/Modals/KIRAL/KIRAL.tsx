import DNAHelix from "./DNA_helix.gif";
import KIRAL_FLOWCHART1 from "./KIRAL_flowchart1.png";
import KIRAL_FLOWCHART2 from "./KIRAL_flowchart2.png";
import KIRAL_FLOWCHART3 from "./KIRAL_flowchart3.png";

export function KIRALModalContent() {
	return (
		<div className="bg-blue-950 p-6 font-sans text-blue-100 md:p-8">
			<header className="mb-6 border-b border-blue-800 pb-4">
				<h3 className="mb-1 font-serif text-3xl font-semibold text-blue-300">
					KIRAL: High-Performance KIR Allele Alignment
				</h3>
				<p className="text-sm text-blue-400">
					Erfan Golpour | Bioinformatics Tool
				</p>
			</header>

			<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
				{/* Sidebar / Visual Area & Key Features */}
				<aside className="space-y-6 md:sticky md:top-4 md:col-span-1 md:self-start">
					<img
						src={DNAHelix}
						alt="KIRAL DNA Helix"
						className="mx-auto"
					/>

					<section>
						<h4 className="mb-3 font-serif text-xl font-semibold text-blue-300">
							Key Features
						</h4>
						<div className="space-y-3">
							{" "}
							{/* Use space-y for vertical stacking */}
							{[
								{
									title: "Multiple Alignment Methods",
									desc: "Choose between `naive`, `regional`, and `categorical` strategies.",
								},
								{
									title: "High Customizability",
									desc: "Adjust representatives, error tolerance, pair handling.",
								},
								{
									title: "Multithreading Support",
									desc: "Utilizes multiple CPU cores for faster processing (`-t` flag).",
								},
								{
									title: "Comprehensive Reporting",
									desc: "Filter results by read, KIR, or allele ID.",
								},
							].map((item) => (
								<div
									key={item.title}
									className="rounded border border-blue-800 bg-blue-900 p-3"
								>
									<h5 className="font-medium text-blue-200">
										{item.title}
									</h5>
									<p className="text-xs text-blue-300">
										{/* Render code tags if present */}
										{item.desc
											.split(/(`[^`]+`)/)
											.map((part, i) =>
												part.startsWith("`") &&
												part.endsWith("`") ? (
													<code
														key={i}
														className="rounded bg-blue-700 px-1 text-xs"
													>
														{part.slice(1, -1)}
													</code>
												) : (
													part
												),
											)}
									</p>
								</div>
							))}
						</div>
					</section>

					<section className="space-y-4 rounded border border-blue-800 bg-blue-900 p-4">
						<div className="space-y-1 text-blue-300">
							<h5 className="font-semibold">
								KIRAL: An Efficient Tool For Aligning Reads To
								1600+ Killer Immunoglobulin-like Receptor (KIR)
								Allele Sequences
							</h5>
							<p className="text-xs">
								Erfan Golpour, Amir Negahdarsaber
							</p>
						</div>
						<a
							href="https://github.com/erfangolpour/KIRAL/blob/main/Final%20Report.pdf"
							target="_blank"
							rel="noopener noreferrer"
							className="w-lg rounded bg-blue-700 px-3 py-1 text-center text-sm text-blue-100 hover:bg-blue-600"
						>
							Read the Paper
						</a>
					</section>
				</aside>

				{/* Main Content Area */}
				<div className="space-y-6 md:col-span-2">
					<section>
						<h4 className="mb-2 font-serif text-xl font-semibold text-blue-300">
							Abstract
						</h4>
						<p className="text-sm leading-relaxed text-blue-200">
							KIRAL is a specialized bioinformatics tool built in
							C++ for rapidly aligning sequencing reads against a
							comprehensive database of over 1600 Killer
							Immunoglobulin-like Receptor (KIR) alleles. It
							leverages the power of{" "}
							<code className="rounded bg-blue-800 px-1 text-sm text-blue-100">
								minimap2
							</code>{" "}
							for efficient alignment, offering multiple
							strategies and customization options for genomic
							research.
						</p>
					</section>

					<section className="flex flex-col items-center justify-center space-y-4">
						<img
							src={KIRAL_FLOWCHART1}
							alt="KIRAL Flowchart"
							className="rounded-lg border border-blue-800 shadow-lg"
						/>
						<p className="text-xs text-blue-400 italic">
							Flowchart 1: Naive alignment
						</p>
						<img
							src={KIRAL_FLOWCHART2}
							alt="KIRAL Flowchart"
							className="rounded-lg border border-blue-800 shadow-lg"
						/>
						<p className="text-xs text-blue-400 italic">
							Flowchart 2: Categorical alignment
						</p>
						<img
							src={KIRAL_FLOWCHART3}
							alt="KIRAL Flowchart"
							className="rounded-lg border border-blue-800 shadow-lg"
						/>
						<p className="text-xs text-blue-400 italic">
							Flowchart 3: Regional alignment
						</p>
					</section>

					<section>
						<h4 className="mb-3 font-serif text-xl font-semibold text-blue-300">
							Usage Examples
						</h4>
						<div className="space-y-4">
							<div>
								<h5 className="mb-1 text-sm font-medium text-blue-200">
									Installation
								</h5>
								<pre className="overflow-x-auto rounded border border-blue-800 bg-gray-800 p-3 text-xs text-blue-200">
									<code>
										git clone
										https://github.com/erfangolpour/KIRAL
										{"\n"}
										cd KIRAL{"\n"}
										git clone
										https://github.com/lh3/minimap2
										{"\n"}
										cd minimap2 && make && cd ..{"\n"}
										make
									</code>
								</pre>
							</div>
							<div>
								<h5 className="mb-1 text-sm font-medium text-blue-200">
									Align Reads
								</h5>
								<pre className="overflow-x-auto rounded border border-blue-800 bg-gray-800 p-3 text-xs text-blue-200">
									<code>
										./main align KIR_database.fasta
										reads.fastq -o alignments.txt
									</code>
								</pre>
							</div>
							<div>
								<h5 className="mb-1 text-sm font-medium text-blue-200">
									Analyze Report
								</h5>
								<pre className="overflow-x-auto rounded border border-blue-800 bg-gray-800 p-3 text-xs text-blue-200">
									<code>
										./main report alignments.txt -r
										read_id_123
									</code>
								</pre>
							</div>
						</div>
					</section>
					<p className="text-xs text-blue-400 italic">
						Developed for genomic research and immunological
						studies, leveraging C++ and minimap2 for performance.
					</p>
				</div>
			</div>
		</div>
	);
}
