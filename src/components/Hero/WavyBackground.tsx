import { ReactNode, useEffect, useRef, useState } from "react";
import { createNoise3D } from "../../utils/SimplexNoise";

export const WavyBackground = ({
    children,
    className = "",
    waveWidth = 50,
    waveOpacity = 0.5,
    waveCount = 5,
}: {
    children?: ReactNode;
    className?: string;
    waveOpacity?: number;
    waveCount?: number;
    waveWidth?: number;
}) => {
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

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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
        const actualWaveCount = Math.min(waveCount, waveColors.length);

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
            ctx.globalAlpha = waveOpacity;

            // Add extra width for wave drawing to prevent visible edge cutoffs
            const extraWidth = 100;
            const step = Math.max(5, Math.floor(width / 200));

            for (let i = 0; i < actualWaveCount; i++) {
                ctx.beginPath();
                ctx.lineWidth = waveWidth;
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
    }, [ctx, waveWidth, waveOpacity, waveCount]);

    return (
        <div
            ref={containerRef}
            className="h-screen relative overflow-x-hidden"
        >
            <canvas
                className="absolute inset-0 z-0 blur-lg"
                ref={canvasRef}
                style={{
                    left: "-100px",
                    width: "calc(100% + 200px)",
                    backgroundColor: "transparent"
                }}
            ></canvas>
            <div className={`relative z-10 ${className}`}>
                {children}
            </div>
        </div>
    );
};