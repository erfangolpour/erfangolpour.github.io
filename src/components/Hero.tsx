import { motion } from "motion/react";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { createNoise3D } from "../utils/SimplexNoise";

// Optimized typing effect hook
function useTypingEffect(
	containerRef: RefObject<HTMLDivElement | null>,
	text: string,
	speed = 50,
	delay = 0,
) {
	const [displayText, setDisplayText] = useState("");
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Set up intersection observer
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect(); // Disconnect once element is visible
				}
			},
			{ threshold: 0.1 },
		);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!isVisible) return;

		let typingTimeout: number;
		let typingInterval: number;

		// Start typing after delay
		typingTimeout = setTimeout(() => {
			let currentIndex = 0;

			typingInterval = setInterval(() => {
				if (currentIndex < text.length) {
					setDisplayText(text.substring(0, currentIndex + 1));
					currentIndex++;
				} else {
					clearInterval(typingInterval);
				}
			}, speed);
		}, delay);

		return () => {
			clearTimeout(typingTimeout);
			clearInterval(typingInterval);
		};
	}, [isVisible, text, speed, delay]);

	return { displayText };
}

export function Hero() {
	const WAVE_COUNT = 3;
	const WAVE_WIDTH = 70;
	const WAVE_OPACITY = 0.4;
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const animationRef = useRef<number | null>(null);
	const ntRef = useRef<number>(0);
	const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

	// Setup canvas, context and handle resizing
	useEffect(() => {
		if (!canvasRef.current || !containerRef.current) return;

		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		if (!context) return;

		setCtx(context);

		const updateDimensions = () => {
			if (!canvas || !containerRef.current) return;

			const { width, height } =
				containerRef.current.getBoundingClientRect();
			const paddedWidth = width + 200;

			canvas.width = paddedWidth;
			canvas.height = height;
		};

		// Initial sizing
		updateDimensions();

		// Throttled resize handler
		const handleResize = () => {
			requestAnimationFrame(updateDimensions);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Animation loop
	useEffect(() => {
		if (!ctx || !canvasRef.current) return;

		const noise = createNoise3D();
		const waveColors = [
			"#38bdf8",
			"#818cf8",
			"#c084fc",
			"#e879f9",
			"#22d3ee",
		];

		let lastTime = 0;
		const actualWaveCount = Math.min(WAVE_COUNT, waveColors.length);

		const render = (time: number) => {
			const deltaTime = time - lastTime;
			lastTime = time;

			// Update noise time
			ntRef.current += 0.0001 * deltaTime;

			const canvas = canvasRef.current!;
			const { width, height } = canvas;

			// Clear the canvas
			ctx.clearRect(0, 0, width, height);

			// Draw waves
			ctx.globalAlpha = WAVE_OPACITY;

			// Add extra width for wave drawing to prevent visible edge cutoffs
			const extraWidth = 100;
			const step = Math.max(5, Math.floor(width / 200));

			for (let i = 0; i < actualWaveCount; i++) {
				ctx.beginPath();
				ctx.lineWidth = WAVE_WIDTH;
				ctx.strokeStyle = waveColors[i % waveColors.length];

				// Start drawing from before the visible area
				for (let x = -extraWidth; x <= width + extraWidth; x += step) {
					const y = noise(x / 800, 0.3 * i, ntRef.current) * 100;
					if (x === -extraWidth) {
						ctx.moveTo(x + extraWidth, y + height * 0.5);
					} else {
						ctx.lineTo(x + extraWidth, y + height * 0.5);
					}
				}

				ctx.stroke();
			}

			animationRef.current = requestAnimationFrame(render);
		};

		animationRef.current = requestAnimationFrame(render);

		return () => {
			if (animationRef.current !== null) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [ctx]);

	const text =
		"Crafting Innovative Full-Stack Web Solutions through Cutting-Edge Technologies";
	const writeRef = useRef<HTMLDivElement>(null);
	const { displayText } = useTypingEffect(writeRef, text, 50, 800);

	// Memoize the styled text generation
	const getStyledText = useCallback(() => {
		if (!displayText) return null;

		const innovativeStartIndex = "Crafting ".length;
		const innovativeEndIndex = innovativeStartIndex + "Innovative".length;

		return Array.from(text).map((char, index) => (
			<span
				key={index}
				className={
					index >= innovativeStartIndex && index < innovativeEndIndex
						? "font-[stylish] italic"
						: undefined
				}
				style={{ opacity: index < displayText.length ? 1 : 0 }}
			>
				{char}
			</span>
		));
	}, [displayText]);

	return (
		<div
			id="hero"
			ref={containerRef}
			className="relative min-h-screen overflow-x-hidden"
		>
			{/* Backdrop canvas for waves */}
			<canvas
				className="absolute inset-0 z-0 blur-lg"
				ref={canvasRef}
				style={{
					left: "-100px",
					width: "calc(100% + 200px)",
					backgroundColor: "transparent",
				}}
			></canvas>

			{/* Content container */}
			<div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 md:px-10">
				{/* Main heading with improved responsive sizing */}
				<motion.h1
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{
						delay: 0.3,
						duration: 0.8,
						ease: "easeInOut",
					}}
					className="mb-8 text-center text-7xl leading-tight font-bold tracking-tighter md:mb-12 md:text-8xl lg:text-9xl"
				>
					ERFAN
					<br className="md:hidden" /> GOLPOUR
				</motion.h1>

				{/* Animated subheading with better responsive positioning */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6, duration: 0.8 }}
					className="relative mx-auto h-20 max-w-3xl"
				>
					<div
						ref={writeRef}
						className="text-center text-xl leading-tight font-bold sm:text-2xl md:text-3xl"
					>
						{getStyledText()}
					</div>
				</motion.div>

				{/* Scroll indicator */}
				<motion.div
					className="absolute bottom-12 left-1/2 flex -translate-x-1/2 transform flex-col items-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 2, duration: 1 }}
				>
					<span className="mb-2 text-sm opacity-70">
						Scroll to explore
					</span>
					<motion.div
						className="flex h-10 w-6 justify-center rounded-full border-2 border-white/50 p-1"
						animate={{ y: [0, 8, 0] }}
						transition={{
							repeat: Infinity,
							duration: 1.5,
							ease: "easeInOut",
						}}
					>
						<motion.div className="h-1.5 w-1.5 rounded-full bg-white/70" />
					</motion.div>
				</motion.div>
			</div>

			{/* Decorative elements */}
			<div className="absolute top-1/4 right-[10%] size-64 animate-pulse rounded-full bg-blue-500/30 opacity-30 blur-[100px]" />
			<div className="absolute bottom-1/4 left-[10%] size-64 animate-pulse rounded-full bg-purple-500/30 opacity-30 blur-[100px]" />
		</div>
	);
}
