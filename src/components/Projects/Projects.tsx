import { X } from "lucide-react";
import {
	AnimatePresence,
	motion,
	useScroll,
	useSpring,
	useTransform,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

// --- Import Project Thumbnail Images (keep these here) ---
import AOM from "./Modals/AOM/AOM.png";
import ArguX from "./Modals/ArguX/ArguX.png";
import GPUGNN from "./Modals/GPUGNN/GPUGNN.png";
import GreenSignal from "./Modals/GreenSignal/GreenSignal.jpg";
import KIRAL from "./Modals/KIRAL/KIRAL.jpg";
import Minesweeper from "./Modals/Minesweeper/Minesweeper.png";
import mineTUIper from "./Modals/mineTUIper/mineTUIper.png";
import MMOA from "./Modals/MMOA/MMOA.png";
import SmartClient from "./Modals/SmartClient/SmartClient.jpg";
import SSI from "./Modals/SSI/SSI.png";
import TaskTree from "./Modals/TaskTree/TaskTree.png";
import WaveRider from "./Modals/WaveRider/WaveRider.png";

// --- Import Hook ---
import { useOutsideClick } from "../../hooks/useOutsideClick";

// --- Import Separated Modal Content Components ---
import { AOMModalContent } from "./Modals/AOM/AOM";
import { ArguXModalContent } from "./Modals/ArguX/ArguX";
import { GPUGNNModalContent } from "./Modals/GPUGNN/GPUGNN";
import { GreenSignalModalContent } from "./Modals/GreenSignal/GreenSignal";
import { KIRALModalContent } from "./Modals/KIRAL/KIRAL";
import { MinesweeperModalContent } from "./Modals/Minesweeper/Minesweeper";
import { mineTuiperModalContent } from "./Modals/mineTUIper/mineTUIper";
import { MMOAModalContent } from "./Modals/MMOA/MMOA";
import { SmartClientModalContent } from "./Modals/SmartClient/SmartClient";
import { SSIModalContent } from "./Modals/SSI/SSI";
import { TaskTreeModalContent } from "./Modals/TaskTree/TaskTree";
import { WaveRiderModalContent } from "./Modals/WaveRider/WaveRider";

// --- Type Definition for Project ---
type Project = {
	title: string;
	description: string;
	link: string;
	linkText: string;
	liveLink?: string;
	thumbnail: string; // Thumbnail path remains here
	modalBgColor?: string; // Keep for overall modal frame color
	modalTextColor?: string; // Keep for overall modal frame color
	ModalContentComponent: React.ComponentType; // Reference to the specific content component
};

export function Projects() {
	const [active, setActive] = useState<Project | null>(null);
	const modalRef = useRef<HTMLDivElement>(null);

	useOutsideClick(modalRef, () => {
		if (active) {
			setActive(null);
		}
	});

	useEffect(() => {
		function handleEscapeKey(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setActive(null);
			}
		}
		if (active) {
			document.body.style.overflow = "hidden";
			document.addEventListener("keydown", handleEscapeKey);
			document.getElementById("nav")?.classList.add("hidden");
		} else {
			document.body.style.overflow = "auto";
			document.removeEventListener("keydown", handleEscapeKey);
			document.getElementById("nav")?.classList.remove("hidden");
		}
		return () => {
			document.removeEventListener("keydown", handleEscapeKey);
			document.body.style.overflow = "auto";
		};
	}, [active]);

	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end start"],
	});

	const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

	const translateX = useSpring(
		useTransform(scrollYProgress, [0, 1], [0, 1000]),
		springConfig,
	);
	const translateXReverse = useSpring(
		useTransform(scrollYProgress, [0, 1], [0, -1000]),
		springConfig,
	);
	const rotateX = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [15, 0]),
		springConfig,
	);
	const rotateZ = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [20, 0]),
		springConfig,
	);
	const translateY = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [-700, 0]),
		springConfig,
	);
	const opacity = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
		springConfig,
	);

	// --- Updated Projects Array ---
	// Only includes metadata and the ModalContentComponent reference
	const projects: Project[] = [
		{
			title: "Minesweeper",
			description:
				"A simple web-based remake of the classic game Minesweeper.",
			link: "https://github.com/erfangolpour/Minesweeper",
			liveLink: "https://erfangolpour.github.io/Minesweeper/",
			thumbnail: Minesweeper,
			modalBgColor: "bg-gray-800",
			modalTextColor: "text-gray-200",
			linkText: "View on GitHub",
			ModalContentComponent: MinesweeperModalContent,
		},
		{
			title: "KIRAL",
			description:
				"Efficient tool for aligning sequencing reads to 1600+ Killer Immunoglobulin-like Receptor (KIR) allele sequences.",
			link: "https://github.com/erfangolpour/KIRAL",
			thumbnail: KIRAL,
			modalBgColor: "bg-blue-950",
			modalTextColor: "text-blue-100",
			linkText: "View on GitHub",
			// backgroundElement: null,
			ModalContentComponent: KIRALModalContent, // Ensure you created this component
		},
		{
			title: "mineTUIper",
			description:
				"Terminal-based Minesweeper game with keyboard controls, solver, and analyzer.",
			link: "https://github.com/erfangolpour/mineTUIper",
			thumbnail: mineTUIper,
			modalBgColor: "bg-black",
			modalTextColor: "text-green-400",
			linkText: "View on GitHub",
			ModalContentComponent: mineTuiperModalContent,
		},
		{
			title: "The Metropolitan Museum of Art",
			description:
				"A user-friendly interface to interact with The Metropolitan Museum of Art Collection API.",
			liveLink:
				"https://erfangolpour.github.io/The-Metropolitan-Museum-of-Art/",
			link: "https://erfangolpour.github.io/The-Metropolitan-Museum-of-Art/",
			thumbnail: MMOA,
			modalBgColor: "bg-stone-900",
			modalTextColor: "text-stone-200",
			linkText: "Explore the Collection Interface",
			ModalContentComponent: MMOAModalContent, // Ensure you created this component
		},
		{
			title: "GreenSignal",
			description:
				"A robust and secure chat server with AES/RSA encryption, auth, admin controls, and file transfer.",
			link: "https://github.com/erfangolpour/GreenSignal",
			thumbnail: GreenSignal,
			modalBgColor: "bg-gray-900",
			modalTextColor: "text-green-100",
			linkText: "View on GitHub",
			ModalContentComponent: GreenSignalModalContent, // Ensure you created this component
		},
		{
			title: "ArguX",
			description:
				"Advanced OSINT tool for analyzing public camera feeds using YOLOv11 and a modern web stack.",
			link: "https://github.com/erfangolpour/ArguX",
			thumbnail: ArguX,
			modalBgColor: "bg-gradient-to-br from-gray-900 to-blue-900",
			modalTextColor: "text-gray-100",
			linkText: "View on GitHub",
			ModalContentComponent: ArguXModalContent, // Reference the imported component
		},
		{
			title: "GPUGNN",
			description:
				"GPU-Accelerated Graph Neural Network operations study for a university course.",
			link: "https://github.com/erfangolpour/GPUGNN",
			thumbnail: GPUGNN,
			modalBgColor: "bg-gradient-to-b from-slate-800 to-slate-900",
			modalTextColor: "text-slate-100",
			linkText: "View on GitHub",
			ModalContentComponent: GPUGNNModalContent,
		},
		{
			title: "The Art of Mathematics",
			description:
				"Demonstrating how mathematical functions naturally occur in art, nature, and industry.",
			liveLink: "https://erfangolpour.github.io/the-art-of-mathematics/",
			link: "https://github.com/erfangolpour/the-art-of-mathematics",
			thumbnail: AOM,
			modalBgColor: "bg-gradient-to-b from-stone-800 to-stone-900",
			modalTextColor: "text-stone-200",
			linkText: "Explore the Visualization",
			ModalContentComponent: AOMModalContent, // Ensure you created this component
		},
		{
			title: "Simple Shell Interpreter (SSI)",
			description:
				"A basic Unix-like shell interpreter supporting background processes.",
			link: "https://github.com/erfangolpour/SSI",
			thumbnail: SSI,
			modalBgColor: "bg-gray-900",
			modalTextColor: "text-gray-100",
			linkText: "View on GitHub",
			ModalContentComponent: SSIModalContent,
		},
		{
			title: "TaskTree",
			description:
				"A modern task management app with hierarchical organization, featuring dual List/Graph views.",
			liveLink: "https://tasktree.vercel.app/",
			link: "https://tasktree.vercel.app/",
			thumbnail: TaskTree,
			modalBgColor: "bg-neutral-900",
			modalTextColor: "text-neutral-100",
			linkText: "Try TaskTree Live",
			ModalContentComponent: TaskTreeModalContent,
		},
		{
			title: "Wave Rider",
			description:
				"A music-driven rhythm game where the world reacts to your custom songs!",
			liveLink: "https://danigallegdup.itch.io/waverider",
			link: "https://github.com/danigallegdup/WaveRider",
			thumbnail: WaveRider,
			modalBgColor:
				"bg-gradient-to-br from-blue-900 via-cyan-900 to-blue-950",
			modalTextColor: "text-cyan-100",
			linkText: "View on GitHub",
			ModalContentComponent: WaveRiderModalContent,
		},
		{
			title: "SmartClient",
			description:
				"Analyzes web servers by sending HTTP/HTTPS requests and inspecting responses.",
			link: "https://github.com/erfangolpour/SmartClient",
			thumbnail: SmartClient,
			modalBgColor: "bg-gray-900",
			modalTextColor: "text-indigo-100",
			linkText: "View on GitHub",
			ModalContentComponent: SmartClientModalContent,
		},
	];

	return (
		<>
			<AnimatePresence>
				{active && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-10 bg-black/80 backdrop-blur-sm"
					/>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{/* Ensure 'active' and the component exist before rendering */}
				{active && active.ModalContentComponent && (
					// MODAL CONTAINER
					<div className="fixed inset-0 z-20 flex items-center justify-center p-4 md:p-6">
						{/* MODAL CONTENT AREA */}
						<motion.div
							ref={modalRef}
							layoutId={`card-${active.title}-project`} // Keep layoutId here on the wrapping motion div
							className={`relative flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl shadow-2xl`}
						>
							{/* --- Header --- */}
							<div
								className={`relative z-20 border-b border-neutral-700 p-4 ${active.modalBgColor} ${active.modalTextColor}`}
							>
								<div className="flex items-center justify-between">
									<h2 className="text-xl font-bold">
										{active.title}
									</h2>
									<button
										onClick={() => setActive(null)}
										className="cursor-pointer rounded-full p-1.5 text-neutral-400 hover:bg-neutral-700 active:bg-neutral-800"
										aria-label="Close modal"
									>
										<X className="h-6 w-6" />
									</button>
								</div>
							</div>

							{/* --- Main Content --- */}
							<div className="relative z-10 grow overflow-y-auto">
								<active.ModalContentComponent />
							</div>

							{/* --- Footer --- */}
							<div
								className={`relative z-20 border-t border-neutral-700 p-4 ${active.modalBgColor} ${active.modalTextColor}`}
							>
								<div className="flex items-center justify-end gap-4">
									{/* Repo/Project Link Button */}
									<a
										href={active.link}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 focus:outline-none"
									>
										{active.linkText ||
											"View Project / Repository"}
										<svg
											className="-mr-1 ml-1.5 h-4 w-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
											></path>
										</svg>
									</a>
									{/* Live Link Button (Optional) */}
									{active.liveLink && (
										<a
											href={active.liveLink}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-neutral-950 focus:outline-none"
										>
											Live Demo
											<svg
												className="-mr-1 ml-1.5 h-4 w-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
												></path>
											</svg>
										</a>
									)}
								</div>
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>

			<div
				id="projects"
				ref={containerRef}
				className="relative my-[30vh] w-full overflow-x-clip antialiased [perspective:1000px] [transform-style:preserve-3d]"
			>
				{/* Intro text */}
				<div className="space-y-8 px-6 sm:px-10 md:px-20">
					{/* ... intro text ... */}
					<h1 className="text-6xl font-bold text-white md:text-7xl">
						Featured Projects <br /> A selection of my work
					</h1>
					<p className="max-w-2xl text-lg text-neutral-300 md:text-xl">
						Here are some of the projects I have worked on,
						showcasing my skills and experience in various areas
						including web development, TUI tools, algorithm design,
						and more.
					</p>
				</div>
				{/* Project Grid */}
				<motion.div
					style={{
						rotateX,
						rotateZ,
						translateY,
						opacity,
					}}
					className="mt-60 flex flex-col gap-[4vw]"
				>
					{Array.from({ length: Math.ceil(projects.length / 4) }).map(
						(_, rowIndex) => (
							<motion.div
								key={rowIndex}
								className={`flex ${rowIndex % 2 === 0 ? "flex-row-reverse" : "flex-row"} gap-[4vw]`}
							>
								{projects
									.slice(rowIndex * 4, rowIndex * 4 + 4)
									.map((project) => (
										<motion.div
											whileHover={{ y: -20 }}
											style={{
												x:
													rowIndex % 2 === 0
														? translateX
														: translateXReverse,
												backgroundImage: `url(${project.thumbnail})`,
											}}
											onClick={() => setActive(project)}
											className="group/project h-[45vh] w-[70vw] flex-none cursor-pointer rounded-xl bg-cover bg-center hover:shadow-2xl md:w-[40vw] 2xl:w-[35vw]"
											key={`${project.title}-project`}
										>
											<motion.div
												className="size-full"
												layoutId={`card-${project.title}-project`}
											>
												<div className="flex size-full flex-col gap-3 rounded-xl bg-black/80 p-10 text-white opacity-0 backdrop-blur-xs transition-opacity group-hover/project:opacity-100">
													<h2 className="mt-auto text-3xl font-bold">
														{project.title}
													</h2>
													<p className="text-sm">
														{project.description}
													</p>
												</div>
											</motion.div>
										</motion.div>
									))}
							</motion.div>
						),
					)}
				</motion.div>
			</div>
		</>
	);
}
