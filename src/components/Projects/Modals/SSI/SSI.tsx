export function SSIModalContent() {
	return (
		<div className="space-y-6 bg-gray-900 p-6 font-mono text-gray-100 md:p-8">
			{/* [ASCIINEMA: Placeholder for embedded terminal session] */}
			{/* Replace this div with your actual Asciinema embed code */}
			<div className="mb-6 rounded border border-gray-700 bg-black p-4 text-sm text-green-400">
				<p className="text-yellow-400">~ $ ./ssi</p>
				<p>
					<span className="text-blue-400">user@host</span>:
					<span className="text-purple-400">~/projects/SSI</span>$ ls
					-l
				</p>
				<pre className="text-gray-300">
					total 24
					<br />
					-rw-r--r-- 1 user user 1500 Mar 10 10:00 bgproc.c
					<br />
					-rw-r--r-- 1 user user 800 Mar 10 10:00 bgproc.h
					<br />
					-rw-r--r-- 1 user user 500 Mar 10 10:00 Makefile
					<br />
					-rw-r--r-- 1 user user 950 Mar 10 10:00 README.md
					<br />
					-rwxr-xr-x 1 user user 8500 Mar 10 10:01 ssi
					<br />
					-rw-r--r-- 1 user user 3200 Mar 10 10:00 ssi.c
					<br />
					-rw-r--r-- 1 user user 1200 Mar 10 10:00 tokenizer.c
					<br />
					-rw-r--r-- 1 user user 700 Mar 10 10:00 tokenizer.h
				</pre>
				<p>
					<span className="text-blue-400">user@host</span>:
					<span className="text-purple-400">~/projects/SSI</span>$
					sleep 10 &
				</p>
				<p className="text-gray-300">[1] 12345</p>
				<p>
					<span className="text-blue-400">user@host</span>:
					<span className="text-purple-400">~/projects/SSI</span>$
					bglist
				</p>
				<p className="text-gray-300">12345: sleep 10 (Running)</p>
				<p>
					<span className="text-blue-400">user@host</span>:
					<span className="text-purple-400">~/projects/SSI</span>${" "}
					<span className="animate-ping">_</span>
				</p>
			</div>

			<div>
				<h3 className="text-2xl font-semibold text-blue-400">
					SSI: A Simple Shell
				</h3>
				<p className="mt-1 text-gray-300">
					This project implements a basic command-line interpreter in
					C, simulating a Unix shell environment. It processes user
					input, executes commands, and manages background tasks.
				</p>
			</div>

			<div>
				<h4 className="mb-3 text-xl font-semibold text-blue-400">
					Core Features
				</h4>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<ul className="list-inside list-disc space-y-1 text-gray-300">
						<li>Interactive command prompt</li>
						<li>Execution of external commands</li>
						<li>Signal handling (SIGINT, SIGCHLD)</li>
						<li>Coloured prompt (user, host, cwd)</li>
						<li>History & line editing (Readline lib)</li>
					</ul>
					<div>
						<h5 className="mb-1 font-medium text-gray-200">
							Built-in Commands:
						</h5>
						<div className="flex flex-wrap gap-x-3 gap-y-1">
							{[
								"cd",
								"exit",
								"bg",
								"bglist",
								"bgpause",
								"bgresume",
								"bgkill",
								"history",
							].map((cmd) => (
								<code
									key={cmd}
									className="rounded bg-gray-700 px-2 py-0.5 text-sm text-gray-200"
								>
									{cmd}
								</code>
							))}
						</div>
						<h5 className="mt-3 mb-1 font-medium text-gray-200">
							Background Process Management:
						</h5>
						<p className="text-sm text-gray-400">
							Run tasks concurrently and manage them via PIDs.
						</p>
					</div>
				</div>
			</div>

			<div>
				<h4 className="mb-2 text-xl font-semibold text-blue-400">
					Building and Running
				</h4>
				<pre className="overflow-x-auto rounded border border-gray-700 bg-gray-800 p-3 text-sm text-gray-200">
					<code>
						# Ensure gcc, make, and readline-dev are installed
						{"\n"}
						make # Compile the source files{"\n"}
						./ssi # Run the shell interpreter
					</code>
				</pre>
			</div>

			<div>
				<h4 className="mb-2 text-xl font-semibold text-blue-400">
					Code Structure
				</h4>
				<p className="text-sm text-gray-400">
					Organized into{" "}
					<code className="rounded bg-gray-700 px-1">ssi.c</code>{" "}
					(main loop, signals),{" "}
					<code className="rounded bg-gray-700 px-1">bgproc.c</code>
					(background process logic), and{" "}
					<code className="rounded bg-gray-700 px-1">
						tokenizer.c
					</code>{" "}
					(input parsing).
				</p>
			</div>
		</div>
	);
}
