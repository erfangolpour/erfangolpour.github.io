export function SmartClientModalContent() {
	return (
		<div className="space-y-6 bg-gray-900 p-6 text-indigo-100 md:p-8">
			<div className="text-center">
				<h3 className="text-2xl font-semibold text-indigo-300">
					Web Server Inspector
				</h3>
				<p className="mt-1 text-indigo-200">
					SmartClient is a Python script designed to probe web
					servers. Given a URL, it performs HTTP/HTTPS requests,
					analyzes responses, and extracts useful information.
				</p>
			</div>

			<div>
				<h4 className="mb-3 text-lg font-medium text-indigo-300">
					Key Capabilities
				</h4>
				<ul className="grid list-inside list-disc grid-cols-1 gap-3 text-indigo-200 sm:grid-cols-2">
					<li>Follows HTTP redirects (configurable limit)</li>
					<li>Parses and displays server-set cookies</li>
					<li>Checks for HTTP/2 support (ALPN & Upgrade header)</li>
					<li>Detects password-protected responses (basic auth)</li>
					<li>Prints final response headers</li>
					<li>Lists all visited URIs during redirects</li>
				</ul>
			</div>

			<div>
				<h4 className="mb-2 text-lg font-medium text-indigo-300">
					Usage
				</h4>
				<pre className="overflow-x-auto rounded border border-gray-700 bg-gray-800 p-3 text-sm text-indigo-200">
					<code>python SmartClient.py &lt;url&gt;</code>
				</pre>
			</div>

			<div>
				<h4 className="mb-2 text-lg font-medium text-indigo-300">
					Example Output Snippet
				</h4>
				<pre className="overflow-x-auto rounded border border-indigo-700 bg-black/50 p-4 text-xs leading-relaxed text-gray-300 backdrop-blur-sm">
					<code>
						[*] Sending request to http://example.com:80/...
						{"\n"}
						---Request Begin---{"\n"}
						GET / HTTP/1.1{"\n"}
						Host: example.com{"\n"}
						User-Agent: SmartClient/1.0{"\n"}
						Connection: close{"\n"}
						Accept: */*{"\n"}
						----Request End----{"\n\n"}
						[*] HTTP request sent, awaiting response...{"\n"}
						---Response Header Begin---{"\n"}
						HTTP/1.1 301 Moved Permanently{"\n"}
						Date: Mon, 11 Mar 2024 10:00:00 GMT{"\n"}
						Server: Apache/2.4.6 (CentOS) OpenSSL/1.0.2k-fips
						{"\n"}
						Location: https://www.example.com/{"\n"}
						Content-Length: 237{"\n"}
						Connection: close{"\n"}
						Content-Type: text/html; charset=iso-8859-1{"\n"}
						----Response Header End----{"\n\n"}
						[*] Redirecting to https://www.example.com:443/...
						{"\n"}
						[*] Sending request to https://www.example.com:443/...
						{"\n"}
						{/* ... More Request/Response Headers ... */}
						[*] HTTPS request sent, awaiting response...{"\n"}
						---Response Header Begin---{"\n"}
						HTTP/1.1 200 OK{"\n"}
						Date: Mon, 11 Mar 2024 10:00:01 GMT{"\n"}
						Server: ECS (iad/1234){"\n"}
						Content-Type: text/html; charset=UTF-8{"\n"}
						Content-Length: 1256{"\n"}
						Set-Cookie: ExampleCookie=ABCDEFG; Path=/;
						Domain=.example.com; Secure; HttpOnly{"\n"}
						{"\n"}
						{/* ... Possibly more headers ... */}
						----Response Header End----{"\n\n"}
						---------------Final Result---------------{"\n"}
						Visited URIs:{"\n"}* http://example.com:80/{"\n"}*
						https://www.example.com:443/ (final){"\n"}
						List of Cookies:{"\n"}* ExampleCookie - Value: ABCDEFG,
						Path: /, Domain: .example.com, Secure: True, HttpOnly:
						True{"\n"}
						Supports HTTP/2: yes{"\n"}
						Password-protected: no{"\n"}
						------------------------------------------
					</code>
				</pre>
			</div>
			<p className="text-center text-xs text-indigo-400 italic">
				Built with Python standard libraries (socket, ssl, etc.). No
				external dependencies required.
			</p>
		</div>
	);
}
