export function GPUGNNModalContent() {
	return (
		<div className="space-y-6 bg-gradient-to-b from-slate-800 to-slate-900 p-6 text-slate-100 md:p-8">
			<div>
				<h3 className="text-2xl font-semibold text-cyan-300">
					GPU-Accelerated GNN Operations
				</h3>
				<p className="mt-1 text-slate-300">
					This project, developed for a GPU computing course at UVIC,
					explores and benchmarks various GPU acceleration techniques
					(primarily CUDA) for sparse matrix operations crucial to
					Graph Neural Networks (GNNs), focusing on sparse matrix
					multiplication (SpMM).
				</p>
			</div>

			<div>
				<h4 className="mb-3 text-xl font-semibold text-cyan-300">
					Implementations & Approaches
				</h4>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="rounded-lg border border-slate-600 bg-slate-700/50 p-4 backdrop-blur-sm">
						<h5 className="font-medium text-cyan-200">
							CUDA Kernels (PyCUDA):
						</h5>
						<ul className="mt-1 list-inside list-disc space-y-0.5 text-sm text-slate-300">
							<li>Basic Sparse SpMM</li>
							<li>CSR-CSC Optimized</li>
							<li>Tiled w/ Shared Memory</li>
							<li>Coalesced Memory Access</li>
							{/* BFS might have been a separate part, check project scope */}
							{/* <li>Breadth-First Search (BFS) - Optional</li> */}
						</ul>
					</div>
					<div className="rounded-lg border border-slate-600 bg-slate-700/50 p-4 backdrop-blur-sm">
						<h5 className="font-medium text-cyan-200">
							Other Frameworks:
						</h5>
						<ul className="mt-1 list-inside list-disc space-y-0.5 text-sm text-slate-300">
							<li>CuPy (Sparse & Dense)</li>
							<li>PyTorch (Sparse & Dense)</li>
							<li>TensorFlow (Sparse Tensor Core)</li>
							<li>SciPy (CPU Baseline)</li>
						</ul>
					</div>
				</div>
			</div>

			<div>
				<h4 className="mb-3 text-xl font-semibold text-cyan-300">
					Project Highlights
				</h4>
				<ul className="list-inside list-disc space-y-1 text-slate-300">
					<li>
						Supports synthetic (Erdős-Rényi, Scale-Free) &
						real-world graphs (SNAP, SuiteSparse).
					</li>
					<li>
						Includes performance profiling, metrics collection, and
						result verification.
					</li>
					<li>Tracks memory usage and analyzes GPU occupancy.</li>
					<li>
						Structured codebase with utility scripts and analysis
						notebooks (Jupyter).
					</li>
					<li>
						Command-line interface for easy execution and parameter
						tuning.
					</li>
				</ul>
			</div>

			<div>
				<h4 className="mb-2 text-xl font-semibold text-cyan-300">
					Example Usage
				</h4>
				<pre className="overflow-x-auto rounded border border-slate-600 bg-slate-800/70 p-3 text-sm text-slate-200 backdrop-blur-sm">
					<code>
						# Profile PyCUDA methods on specific graphs (indices 0
						to 2){"\n"}
						python gpugnn.py --profile --methods pycuda --graphs 0-2
						{"\n\n"}# Run CuPy sparse method with 10 warmup runs and
						verification on graph index 0{"\n"}
						python gpugnn.py --warmup 10 --methods cupy_sparse
						--verify --graphs 0{"\n\n"}# Generate a synthetic graph
						and profile PyTorch dense{"\n"}
						python gpugnn.py --generate_graph er 1000 0.1 --methods
						torch_dense --profile
					</code>
				</pre>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div>
					<h5 className="mb-1 font-medium text-cyan-300">
						Current Limitations
					</h5>
					<ul className="list-inside list-disc space-y-0.5 text-xs text-slate-400">
						<li>Limited by available GPU memory</li>
						<li>Basic load balancing (if any)</li>
						<li>Focus on Single GPU / Single Precision (FP32)</li>
						<li>Primarily CSR/CSC sparse format support</li>
						<li>Verification can be slow for large graphs</li>
					</ul>
				</div>
				<div>
					<h5 className="mb-1 font-medium text-cyan-300">
						Future Directions
					</h5>
					<ul className="list-inside list-disc space-y-0.5 text-xs text-slate-400">
						<li>Advanced load balancing schemes</li>
						<li>Half (FP16) / Double (FP64) precision support</li>
						<li>Multi-GPU / Distributed implementations</li>
						<li>
							Support for more graph formats (e.g., COO, Blocked)
						</li>
						<li>Out-of-core processing for very large graphs</li>
						<li>Kernel autotuning frameworks</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
