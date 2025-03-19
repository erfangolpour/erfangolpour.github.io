import { motion } from "motion/react";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { createNoise3D } from "../utils/SimplexNoise";

// Optimized typing effect hook
function useTypingEffect(containerRef: RefObject<HTMLDivElement | null>, text: string, speed = 50, delay = 0) {
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
			{ threshold: 0.1 }
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

			const { width, height } = containerRef.current.getBoundingClientRect();
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
		const waveColors = ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"];

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

	const text = "Crafting Innovative Full-Stack Web Solutions & Technologies";
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
					index >= innovativeStartIndex && index < innovativeEndIndex ? "italic font-[stylish]" : undefined
				}
				style={{ opacity: index < displayText.length ? 1 : 0 }}
			>
				{char}
			</span>
		));
	}, [displayText]);

	return (
		<div ref={containerRef} className="relative overflow-x-hidden">
			<canvas
				className="absolute inset-0 z-0 blur-lg"
				ref={canvasRef}
				style={{
					left: "-100px",
					width: "calc(100% + 200px)",
					backgroundColor: "transparent",
				}}
			></canvas>
			<div className="relative z-10 min-h-screen flex flex-col items-center justify-between gap-10 px-10 py-[30%] lg:p-0">
				<motion.h1
					initial={{ opacity: 0.0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{
						delay: 0.3,
						duration: 0.8,
						ease: "easeInOut",
					}}
					className="font-bold text-center leading-none text-[18vw] lg:text-[11.9vw]"
				>
					ERFAN GOLPOUR
				</motion.h1>
				<div
					ref={writeRef}
					className="lg:absolute bottom-[20%] left-[20%] font-bold text-[8vw] lg:text-[2.3vw] lg:w-1/3 leading-none"
				>
					{getStyledText()}
				</div>
			</div>
		</div>
	);
}
