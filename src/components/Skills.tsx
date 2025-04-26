import {
	AnimatePresence,
	motion,
	useScroll,
	useSpring,
	useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

// Skill category type
type SkillCategory = {
	name: string;
	color: string;
	skills: Skill[];
};

// Individual skill type
type Skill = {
	name: string;
	level: number; // 1-10
	description: string;
	startYear: number; // Year when you started learning this skill
};

// Skills data organized by category with start years
const skillsData: SkillCategory[] = [
	{
		name: "Programming Languages",
		color: "#38bdf8", // Blue
		skills: [
			{
				name: "Python",
				level: 9,
				description: "Advanced data processing, ML, web backends",
				startYear: 2014,
			},
			{
				name: "JavaScript/TypeScript",
				level: 9,
				description: "Web & app development, React ecosystem",
				startYear: 2015,
			},
			{
				name: "C/C++",
				level: 7,
				description: "Systems programming, performance optimization",
				startYear: 2018,
			},
			{
				name: "Rust",
				level: 5,
				description: "Memory-safe systems programming",
				startYear: 2024,
			},
			{
				name: "Racket",
				level: 6,
				description: "Functional programming paradigms",
				startYear: 2023,
			},
			{
				name: "Standard ML",
				level: 6,
				description: "Type theory and functional concepts",
				startYear: 2023,
			},
		],
	},
	{
		name: "Web Development",
		color: "#818cf8", // Indigo
		skills: [
			{
				name: "React",
				level: 9,
				description: "Component architecture, hooks, context",
				startYear: 2019,
			},
			{
				name: "HTML5/CSS3",
				level: 8,
				description: "Semantic markup, responsive design",
				startYear: 2015,
			},
			{
				name: "Tailwind CSS",
				level: 9,
				description: "Utility-first CSS framework",
				startYear: 2020,
			},
			{
				name: "Three.js",
				level: 7,
				description: "3D graphics for the web",
				startYear: 2022,
			},
			{
				name: "Framer Motion",
				level: 8,
				description: "Animation library for React",
				startYear: 2021,
			},
			{
				name: "GraphQL",
				level: 7,
				description: "API query language",
				startYear: 2025,
			},
		],
	},
	{
		name: "Data Science & ML",
		color: "#c084fc", // Purple
		skills: [
			{
				name: "PyTorch",
				level: 8,
				description: "Deep learning framework",
				startYear: 2019,
			},
			{
				name: "Scikit-learn",
				level: 8,
				description: "ML algorithms and tools",
				startYear: 2018,
			},
			{
				name: "Numpy/Pandas",
				level: 9,
				description: "Data manipulation and analysis",
				startYear: 2018,
			},
			{
				name: "NLTK",
				level: 7,
				description: "Natural language processing",
				startYear: 2018,
			},
			{
				name: "Computer Vision",
				level: 7,
				description: "Image processing and analysis",
				startYear: 2020,
			},
		],
	},
	{
		name: "Systems & DevOps",
		color: "#e879f9", // Fuchsia
		skills: [
			{
				name: "Linux",
				level: 8,
				description: "System administration, shell scripting",
				startYear: 2016,
			},
			{
				name: "Docker",
				level: 7,
				description: "Containerization and deployment",
				startYear: 2019,
			},
			{
				name: "Git",
				level: 9,
				description: "Version control and collaboration",
				startYear: 2015,
			},
			{
				name: "Bash/Shell",
				level: 8,
				description: "Automation and system scripting",
				startYear: 2016,
			},
			{
				name: "Cloud Services",
				level: 7,
				description: "AWS, Vercel, DigitalOcean",
				startYear: 2021,
			},
		],
	},
	{
		name: "Cybersecurity",
		color: "#22d3ee", // Cyan
		skills: [
			{
				name: "Web Security",
				level: 8,
				description: "XSS, CSRF, injection prevention",
				startYear: 2013,
			},
			{
				name: "Network Analysis",
				level: 7,
				description: "Wireshark, tcpdump, traffic analysis",
				startYear: 2019,
			},
			{
				name: "Pen Testing",
				level: 7,
				description: "Vulnerability assessment, HackTheBox",
				startYear: 2023,
			},
			{
				name: "Security Tools",
				level: 8,
				description: "Metasploit, Burp Suite, nmap",
				startYear: 2019,
			},
		],
	},
	{
		name: "Creative & Design",
		color: "#34d399", // Emerald
		skills: [
			{
				name: "Blender",
				level: 6,
				description: "3D modeling and animation",
				startYear: 2022,
			},
			{
				name: "UI/UX Design",
				level: 7,
				description: "Interactive interface design",
				startYear: 2020,
			},
			{
				name: "Game Development",
				level: 6,
				description: "Godot engine, game mechanics",
				startYear: 2022,
			},
			{
				name: "Digital Art",
				level: 6,
				description: "Photoshop, GIMP, digital illustration",
				startYear: 2019,
			},
		],
	},
];

// Calculate earliest and latest years
const allYears = skillsData.flatMap((category) =>
	category.skills.map((skill) => skill.startYear),
);
const earliestYear = Math.min(...allYears);
const latestYear = Math.max(Math.max(...allYears), new Date().getFullYear());
const yearRange = latestYear - earliestYear + 1;

// Generate years array for timeline
const timelineYears = Array.from(
	{ length: yearRange },
	(_, i) => earliestYear + i,
);

// Enhanced Timeline with Integrated Categories
function EnhancedSkillTimeline() {
	const [activeYear, setActiveYear] = useState<number | null>(null);
	const [filterCategory, setFilterCategory] = useState<string | null>(null);
	const [showAllMobile, setShowAllMobile] = useState(false);

	// Get skills for a specific year
	const getSkillsForYear = (year: number) => {
		return skillsData
			.filter(
				(category) =>
					filterCategory === null || category.name === filterCategory,
			)
			.flatMap((category) =>
				category.skills
					.filter((skill) => skill.startYear === year)
					.map((skill) => ({ skill, category })),
			);
	};

	// Get all skills learned up to a specific year
	const getSkillsUpToYear = (year: number) => {
		return skillsData
			.filter(
				(category) =>
					filterCategory === null || category.name === filterCategory,
			)
			.flatMap((category) =>
				category.skills
					.filter((skill) => skill.startYear <= year)
					.map((skill) => ({ skill, category })),
			);
	};

	// Skills to display based on active year
	const [skillsToDisplay, setSkillsToDisplay] = useState<
		{ skill: Skill; category: SkillCategory }[]
	>(getSkillsUpToYear(latestYear));

	useEffect(() => {
		setSkillsToDisplay(
			activeYear
				? getSkillsUpToYear(activeYear)
				: skillsData
						.filter(
							(category) =>
								filterCategory === null ||
								category.name === filterCategory,
						)
						.flatMap((category) =>
							category.skills.map((skill) => ({
								skill,
								category,
							})),
						),
		);
	}, [activeYear, filterCategory]);

	return (
		<div className="space-y-12">
			{/* Category filters */}
			<div className="flex flex-wrap justify-center gap-2">
				<motion.button
					onClick={() => setFilterCategory(null)}
					className="relative rounded-full px-4 py-2 text-sm font-medium"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<span className="relative z-10">All Categories</span>
					{filterCategory === null && (
						<motion.div
							layoutId="activeCategoryFilter"
							className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm"
							transition={{ type: "spring", duration: 0.5 }}
						/>
					)}
				</motion.button>

				{skillsData.map((category) => (
					<motion.button
						key={category.name}
						onClick={() => setFilterCategory(category.name)}
						className="relative rounded-full px-4 py-2 text-sm font-medium"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<span className="relative z-10">{category.name}</span>
						{filterCategory === category.name && (
							<motion.div
								layoutId="activeCategoryFilter"
								className="absolute inset-0 rounded-full"
								style={{
									background: `linear-gradient(135deg, ${category.color}40, ${category.color}10)`,
									border: `1px solid ${category.color}40`,
								}}
								transition={{ type: "spring", duration: 0.5 }}
							/>
						)}
					</motion.button>
				))}
			</div>

			{/* Timeline visualization */}
			<div className="relative">
				{/* Year indicators and timeline */}
				<div className="relative mb-8 hidden h-[120px] md:block">
					<div className="absolute top-1/2 right-0 left-0 h-0.5 bg-white/20" />

					{timelineYears.map((year, index) => {
						// Calculate position percentage
						const position =
							((year - earliestYear) / (yearRange - 1)) * 100;
						// Determine if this year has any skills
						const hasSkills = getSkillsForYear(year).length > 0;
						const isActive = year === activeYear;

						return (
							<div
								key={year}
								className="absolute top-0 -translate-x-1/2 transform"
								style={{ left: `${position}%` }}
							>
								{/* Year marker */}
								<div
									className={`group relative flex h-[100px] cursor-pointer flex-col items-center`}
									onClick={() =>
										setActiveYear(isActive ? null : year)
									}
								>
									{/* Year label */}
									<div
										className={`text-sm ${
											isActive
												? "font-bold text-white"
												: "text-white/60"
										} mb-2`}
									>
										{year}
									</div>

									{/* Vertical line */}
									<div
										className={`h-[50px] w-0.5 ${
											isActive
												? "bg-white"
												: "bg-white/30"
										} transition-colors group-hover:bg-white/70`}
									/>

									{/* Node */}
									<motion.div
										className={`absolute top-[68px] h-5 w-5 rounded-full transition-transform ${isActive ? "scale-110" : "scale-100"} ${hasSkills ? "cursor-pointer" : "opacity-30"}`}
										style={{
											backgroundColor: hasSkills
												? filterCategory
													? skillsData.find(
															(c) =>
																c.name ===
																filterCategory,
														)?.color || "white"
													: "white"
												: "rgba(255,255,255,0.3)",
										}}
										whileHover={
											hasSkills ? { scale: 1.3 } : {}
										}
										whileTap={
											hasSkills ? { scale: 0.9 } : {}
										}
										animate={isActive ? { scale: 1.5 } : {}}
									/>

									{/* Skill count badge */}
									{hasSkills && (
										<motion.div
											className="absolute top-[92px] rounded-full bg-white/10 px-2 py-0.5 text-xs backdrop-blur-sm"
											initial={{ opacity: 0, y: -5 }}
											whileInView={{ opacity: 1, y: 0 }}
											transition={{ delay: index * 0.05 }}
										>
											{getSkillsForYear(year).length}
										</motion.div>
									)}
								</div>

								{/* Skills preview on hover */}
								{hasSkills && (
									<div className="pointer-events-none absolute top-1/2 left-1/2 z-10 w-[200px] -translate-x-1/2 translate-y-4 transform opacity-0 transition-opacity group-hover:opacity-100">
										<div className="rounded-lg bg-black/60 p-2 text-xs backdrop-blur-md">
											<div className="mb-1 font-bold">
												Skills learned in {year}:
											</div>
											<ul className="space-y-1">
												{getSkillsForYear(year)
													.slice(0, 3)
													.map(
														({
															skill,
															category,
														}) => (
															<li
																key={skill.name}
																className="flex items-center"
															>
																<div
																	className="mr-2 h-2 w-2 rounded-full"
																	style={{
																		backgroundColor:
																			category.color,
																	}}
																/>
																{skill.name}
															</li>
														),
													)}
												{getSkillsForYear(year).length >
													3 && (
													<li className="text-white/60">
														+
														{getSkillsForYear(year)
															.length - 3}{" "}
														more
													</li>
												)}
											</ul>
										</div>
									</div>
								)}
							</div>
						);
					})}

					{/* Current year indicator */}
					<div
						className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
						style={{
							left: `${((new Date().getFullYear() - earliestYear) / (yearRange - 1)) * 100}%`,
						}}
					>
						<div className="absolute left-1/2 h-12 w-0.5 -translate-x-1/2 bg-white/50" />
						<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full transform rounded bg-white/10 px-2 py-1 text-xs font-bold whitespace-nowrap backdrop-blur-sm">
							Current Year
						</div>
					</div>
				</div>

				{/* Active year display */}
				{activeYear && (
					<motion.div
						className="mb-6 text-center"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
					>
						<h3 className="text-2xl font-bold">
							Skills learned by {activeYear}
						</h3>
						<p className="text-white/60">
							{skillsToDisplay.length}{" "}
							{skillsToDisplay.length === 1 ? "skill" : "skills"}{" "}
							in the toolkit
						</p>
					</motion.div>
				)}

				{/* Skills grid with smooth layout animations */}
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<AnimatePresence mode="popLayout">
						{skillsToDisplay.map(({ skill, category }) => (
							<motion.div
								key={skill.name}
								layout
								initial={{
									opacity: 0,
									scale: 0.8,
									y: 20,
								}}
								animate={{
									opacity: 1,
									scale: 1,
									y: 0,
									transition: {
										type: "spring",
										stiffness: 300,
										damping: 30,
									},
								}}
								exit={{
									opacity: 0,
									scale: 0.8,
									transition: {
										duration: 0.2,
										ease: "easeOut",
									},
								}}
								className={`rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm ${!showAllMobile && "nth-[n+10_of_div]:hidden"} sm:nth-[n+10_of_div]:block`}
								whileHover={{
									scale: 1.02,
									backgroundColor: "rgba(255,255,255,0.1)",
								}}
								transition={{
									layout: {
										type: "spring",
										stiffness: 300,
										damping: 30,
										duration: 0.4,
									},
								}}
							>
								<div
									className="absolute top-0 left-0 h-full w-1 opacity-80"
									style={{
										backgroundColor: category.color,
									}}
								/>

								<motion.div
									layout
									className="flex items-center justify-between"
								>
									<motion.h4
										layout
										className="text-lg font-medium"
									>
										{skill.name}
									</motion.h4>
									<motion.div
										layout
										className="flex space-x-1"
									>
										{Array.from({ length: 5 }).map(
											(_, i) => (
												<motion.div
													key={i}
													layout
													initial={{
														scale: 0,
													}}
													animate={{
														scale: 1,
													}}
													transition={{
														delay: 0.1 + i * 0.05,
														layout: {
															type: "spring",
															duration: 0.3,
														},
													}}
													className="h-2 w-2 rounded-full"
													style={{
														backgroundColor:
															i <
															Math.ceil(
																skill.level / 2,
															)
																? category.color
																: "rgba(255,255,255,0.2)",
													}}
												/>
											),
										)}
									</motion.div>
								</motion.div>

								<motion.p
									layout
									className="mb-2 text-sm font-medium text-white/80"
								>
									Since {skill.startYear}
								</motion.p>

								<motion.p
									layout
									className="text-sm text-white/70"
								>
									{skill.description}
								</motion.p>
							</motion.div>
						))}
					</AnimatePresence>
				</div>

				{/* See More Button - Only show on mobile if there are more skills */}
				{skillsToDisplay.length > 10 && (
					<motion.div
						className="mt-8 flex justify-center sm:hidden"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
					>
						<motion.button
							onClick={() => setShowAllMobile(!showAllMobile)}
							className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<span>
								{showAllMobile ? "Show Less" : "See More"}
							</span>
							<motion.svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								animate={{ rotate: showAllMobile ? 180 : 0 }}
								transition={{ duration: 0.3 }}
							>
								<polyline points="6 9 12 15 18 9"></polyline>
							</motion.svg>
						</motion.button>
					</motion.div>
				)}

				{/* Empty state */}
				{skillsToDisplay.length === 0 && (
					<div className="flex flex-col items-center justify-center py-12 text-white/60">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="mb-4 h-12 w-12 opacity-50"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1}
								d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
							/>
						</svg>
						<p className="text-lg font-medium">No skills found</p>
						<p className="mt-1 text-sm">
							Try selecting a different year or category
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

export function Skills() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"],
	});

	const springConfig = { stiffness: 300, damping: 30 };
	const opacity = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [0, 1]),
		springConfig,
	);

	return (
		<div
			id="skills"
			ref={containerRef}
			className="relative min-h-screen overflow-hidden px-6 py-20 sm:px-10 md:px-20"
		>
			{/* Background elements */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute top-1/4 left-0 h-96 w-96 rounded-full bg-blue-500 opacity-20 blur-[120px]" />
				<div className="absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-purple-500 opacity-20 blur-[120px]" />
			</div>

			<motion.div style={{ opacity }} className="mx-auto max-w-7xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="mb-16 text-center"
				>
					<h2 className="mb-6 text-4xl font-bold md:text-6xl">
						Technical Expertise
					</h2>
					<p className="mx-auto max-w-3xl text-lg opacity-80">
						My learning journey through different technologies,
						tools, and concepts over the years.
					</p>
				</motion.div>

				{/* Enhanced Timeline Visualization */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
				>
					<EnhancedSkillTimeline />
				</motion.div>
			</motion.div>
		</div>
	);
}
