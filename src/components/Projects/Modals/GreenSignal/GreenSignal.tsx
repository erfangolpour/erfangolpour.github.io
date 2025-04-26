import GreenSignalScreenshot from "./GreenSignal_screenshot.png";

export function GreenSignalModalContent() {
	return (
		<div className="space-y-6 bg-gray-900 p-6 text-green-100 md:p-8">
			<img
				src={GreenSignalScreenshot}
				alt="GreenSignal Screenshot"
				className="rounded-lg border border-gray-700 object-contain shadow-lg"
			/>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div className="space-y-4">
					<h3 className="text-2xl font-semibold text-green-400">
						Secure Communication Hub
					</h3>
					<p className="text-green-200">
						GreenSignal is a Python-based chat server prioritizing
						security. It employs end-to-end encryption using AES for
						messages and RSA for key exchange, ensuring
						confidentiality and integrity.
					</p>
				</div>
				<div className="rounded-lg border border-gray-700 bg-gray-800/80 p-4">
					<h4 className="mb-2 text-lg font-medium text-green-300">
						Core Security Features
					</h4>
					<ul className="list-inside list-disc space-y-1 text-sm text-green-300">
						<li>AES Symmetric Encryption for Messages</li>
						<li>RSA Asymmetric Encryption for Key Exchange</li>
						<li>Secure User Authentication</li>
						<li>Secure File Transfer Capability</li>
					</ul>
				</div>
			</div>

			<div>
				<h4 className="mb-3 text-xl font-semibold text-green-400">
					Functionality Overview
				</h4>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{[
						{
							title: "Admin Controls",
							desc: "Kick, mute/unmute users, broadcast messages, manage server state.",
						},
						{
							title: "User Management",
							desc: "Track connected users, enforce unique usernames.",
						},
						{
							title: "Server/Client Architecture",
							desc: "Clear separation for server logic and client interaction.",
						},
						{
							title: "Admin Panel Commands",
							desc: "`show users`, `kick`, `mute`, `broadcast`, `close server`, etc.",
						},
					].map((item) => (
						<div
							key={item.title}
							className="rounded border border-gray-700 bg-gray-800/80 p-3"
						>
							<h5 className="font-medium text-green-300">
								{item.title}
							</h5>
							<p className="text-xs text-green-300">
								{/* Render code tags if present */}
								{item.desc.split(/(`[^`]+`)/).map((part, i) =>
									part.startsWith("`") &&
									part.endsWith("`") ? (
										<code
											key={i}
											className="rounded bg-gray-700 px-1 text-xs"
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
			</div>

			<div className="space-y-2">
				<h4 className="text-lg font-medium text-green-400">
					Running the Application
				</h4>
				<pre className="flex-1 overflow-x-auto rounded border border-gray-700 bg-gray-800 p-3 text-sm text-green-200">
					<code>
						# Start the Server{"\n"}
						python server.py{"\n\n"}# Connect as a Client
						{"\n"}
						python client.py
					</code>
				</pre>
				<p className="flex-1 text-sm text-green-300">
					Requires Python and the following libraries:{" "}
					<code className="rounded bg-gray-700 px-1 text-xs">
						art
					</code>
					,{" "}
					<code className="rounded bg-gray-700 px-1 text-xs">
						pycryptodome
					</code>
					,{" "}
					<code className="rounded bg-gray-700 px-1 text-xs">
						rsa
					</code>
				</p>
			</div>
		</div>
	);
}
