import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { WavyBackground } from "./WavyBackground";

// Optimized typing effect hook
function useTypingEffect(text: string, speed = 50, delay = 0) {
    const [displayText, setDisplayText] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

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

    return { displayText, containerRef };
}

export function Hero() {
    const text = "Crafting Innovative Full-Stack Web Solutions & Technologies";
    const { displayText, containerRef } = useTypingEffect(text, 50, 800);

    // Memoize the styled text generation
    const getStyledText = useCallback(() => {
        if (!displayText) return null;

        const innovativeStartIndex = "Crafting ".length;
        const innovativeEndIndex = innovativeStartIndex + "Innovative".length;

        return Array.from(text).map((char, index) => (
            <span
                key={index}
                className={index >= innovativeStartIndex && index < innovativeEndIndex ? "italic font-[stylish]" : undefined}
                style={{ opacity: index < displayText.length ? 1 : 0 }}
            >
                {char}
            </span>
        ));
    }, [displayText]);

    return (
        <WavyBackground
            waveCount={3}
            waveWidth={70}
            waveOpacity={0.4}
            className="relative size-full flex flex-col items-center justify-between gap-10 px-10 py-[30%] lg:p-0"
        >
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
                ref={containerRef}
                className="lg:absolute bottom-[20%] left-[20%] font-bold text-[8vw] lg:text-[2.3vw] lg:w-1/3 leading-none"
            >
                {getStyledText()}
            </div>
        </WavyBackground>
    );
}