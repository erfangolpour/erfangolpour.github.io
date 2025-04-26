import { Mail, MessageCircleMore } from "lucide-react";
import { motion } from "motion/react";
import { FormEvent, useRef, useState } from "react";
import MapComponent from "./MapComponent";

// Animated liquid button component
function LiquidButton({
	onClick,
	children,
	disabled = false,
}: {
	onClick: () => void;
	children: React.ReactNode;
	disabled?: boolean;
}) {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.button
			ref={buttonRef}
			onClick={onClick}
			disabled={disabled}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={`relative overflow-hidden rounded-full bg-black/20 px-10 py-4 font-bold text-white backdrop-blur-sm transition-all duration-300 ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${isHovered ? "" : "border-1"}`}
		>
			{/* Animated background */}
			{isHovered && (
				<motion.div
					className="absolute inset-0 z-0"
					style={{
						background: `linear-gradient(120deg, #38bdf8, #818cf8, #c084fc, #e879f9, #22d3ee)`,
						backgroundSize: "400% 400%",
					}}
					animate={{
						backgroundPosition: isHovered
							? ["0% 0%", "100% 100%"]
							: "0% 0%",
					}}
					transition={{
						duration: 1.5,
						ease: "easeInOut",
						repeat: isHovered ? Infinity : 0,
						repeatType: "reverse",
					}}
				/>
			)}

			<span className="relative z-10">{children}</span>
		</motion.button>
	);
}

export function Contact() {
	const [formState, setFormState] = useState({
		name: "",
		email: "",
		message: "",
	});

	const [status, setStatus] = useState<
		"idle" | "submitting" | "submitted" | "error"
	>("idle");
	const formRef = useRef<HTMLFormElement>(null);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormState((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setStatus("submitting");

		// Simulate form submission
		try {
			const formData = new FormData(e.target as HTMLFormElement);

			formData.append(
				"access_key",
				"fc37c1ff-f587-465e-84de-3b69219f59bb",
			);

			const response = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				body: formData,
			});

			const data = await response.json();

			if (!data.success) {
				throw new Error("Form submission failed");
			}

			setStatus("submitted");
			// Reset form after successful submission
			setFormState({ name: "", email: "", message: "" });

			// Return to idle state after showing success message
			setTimeout(() => setStatus("idle"), 4000);
		} catch (error) {
			setStatus("error");
		}
	};

	return (
		<div
			id="contact"
			className="relative min-h-screen px-6 py-20 sm:px-10 md:px-20"
		>
			{/* Background elements */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute top-1/3 -left-20 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
				<div className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
			</div>

			<div className="mx-auto max-w-6xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="mb-16 text-center"
				>
					<h2 className="mb-6 text-4xl font-bold md:text-6xl">
						Get In Touch
					</h2>
					<p className="mx-auto max-w-2xl text-lg opacity-80">
						Have a project in mind or want to discuss a potential
						collaboration? Feel free to reach out through the form
						below.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
					<motion.div
						className="lg:col-span-3"
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
					>
						<form
							ref={formRef}
							onSubmit={handleSubmit}
							className="flex h-full flex-col space-y-6"
						>
							<div>
								<label
									htmlFor="name"
									className="mb-2 block text-sm font-medium"
								>
									Name
								</label>
								<input
									type="text"
									id="name"
									name="name"
									value={formState.name}
									onChange={handleChange}
									required
									className="w-full rounded-lg border border-white/10 bg-black/5 px-4 py-3 backdrop-blur-sm transition-all duration-300 focus:border-transparent focus:ring-2 focus:outline-0"
									placeholder="Your name"
								/>
							</div>

							<div>
								<label
									htmlFor="email"
									className="mb-2 block text-sm font-medium"
								>
									Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formState.email}
									onChange={handleChange}
									required
									className="w-full rounded-lg border border-white/10 bg-black/5 px-4 py-3 backdrop-blur-sm transition-all duration-300 focus:border-transparent focus:ring-2 focus:outline-0"
									placeholder="your.email@example.com"
								/>
							</div>

							<div className="flex grow flex-col">
								<label
									htmlFor="message"
									className="mb-2 block text-sm font-medium"
								>
									Message
								</label>
								<textarea
									id="message"
									name="message"
									value={formState.message}
									onChange={handleChange}
									required
									rows={6}
									className="w-full grow rounded-lg border border-white/10 bg-black/5 px-4 py-3 backdrop-blur-sm transition-all duration-300 focus:border-transparent focus:ring-1 focus:outline-0"
									placeholder="Your message here..."
								/>
							</div>

							<div className="pt-4">
								<LiquidButton
									onClick={() =>
										formRef.current?.requestSubmit()
									}
									disabled={status === "submitting"}
								>
									{status === "submitting"
										? "Sending..."
										: "Send Message"}
								</LiquidButton>

								{/* Status messages */}
								{status === "submitted" && (
									<motion.p
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										className="mt-4 text-green-400"
									>
										Message sent successfully! I'll get back
										to you soon.
									</motion.p>
								)}

								{status === "error" && (
									<motion.p
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										className="mt-4 text-red-400"
									>
										Something went wrong. Please try again
										later.
									</motion.p>
								)}
							</div>
						</form>
					</motion.div>

					<motion.div
						className="lg:col-span-2"
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<div className="rounded-2xl bg-black/10 p-6 backdrop-blur-sm">
							<h3 className="mb-4 text-xl font-bold">
								Connect With Me
							</h3>

							<div className="space-y-4 px-3">
								<div className="flex items-center gap-4">
									<Mail className="h-5 w-5 text-white" />
									<div>
										<h4 className="text-sm font-medium opacity-70">
											Email
										</h4>
										<a
											href="mailto:golpourerfan@gmail.com"
											className="text-base transition-colors hover:text-purple-400"
										>
											golpourerfan@gmail.com
										</a>
									</div>
								</div>

								<div className="flex items-center gap-4">
									<MessageCircleMore className="h-5 w-5 text-white" />
									<div>
										<h4 className="text-sm font-medium opacity-70">
											Social
										</h4>
										<div className="mt-1 flex gap-3">
											<a
												href="https://github.com/erfangolpour"
												target="_blank"
												rel="noopener noreferrer"
												className="transition-colors hover:text-purple-400"
											>
												GitHub
											</a>
											<span>•</span>
											<a
												href="https://www.linkedin.com/in/erfan-golpour-9739341b7/"
												target="_blank"
												rel="noopener noreferrer"
												className="transition-colors hover:text-purple-400"
											>
												LinkedIn
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="rounded-2xl bg-black/10 p-6 backdrop-blur-sm">
							<h3 className="mb-4 text-xl font-bold">Location</h3>
							<p className="opacity-70">
								Based in Vancouver, with availability for remote
								work worldwide.
							</p>

							{/* Interactive map */}
							<div className="mt-4 h-[200px] w-full overflow-hidden rounded-lg border border-white/10">
								<MapComponent />
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
