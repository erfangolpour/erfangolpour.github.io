import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Nav() {
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPos = window.scrollY;

			// Make the nav visible when scrolling up or at the top
			setVisible(
				prevScrollPos > currentScrollPos || currentScrollPos < 10,
			);

			// Update the previous scroll position
			setPrevScrollPos(currentScrollPos);
		};

		// Add scroll event listener
		window.addEventListener("scroll", handleScroll);

		// Clean up
		return () => window.removeEventListener("scroll", handleScroll);
	}, [prevScrollPos]);

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const navItems = [
		{ label: "Home", href: "#hero" },
		{ label: "Projects", href: "#projects" },
		{ label: "Skills", href: "#skills" },
		{ label: "Contact", href: "#contact" },
	];

	return (
		<AnimatePresence>
			{visible && (
				<motion.nav
					id="nav"
					className="fixed inset-x-0 top-0 z-50 flex w-full justify-between p-6 bg-neutral-950/80"
					initial={{ y: -100 }}
					animate={{ y: 0 }}
					exit={{ y: -100 }}
					transition={{
						type: "spring",
						duration: 1,
						stiffness: 300,
						damping: 30,
					}}
				>
					{/* Logo/Name */}
					<a
						href="#hero"
						className="z-60 text-xl font-bold tracking-tight text-white transition-transform duration-300 hover:scale-105"
					>
						EG
					</a>

					{/* Desktop Navigation */}
					<div className="hidden items-center space-x-8 md:flex">
						{navItems.map((item) => (
							<NavItem
								key={item.label}
								label={item.label}
								href={item.href}
							/>
						))}
					</div>

					{/* Mobile Menu Button */}
					<button
						className="z-60 md:hidden"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
					>
						<div className="relative h-4 w-7">
							<motion.span
								className="absolute left-0 h-0.5 w-7 rounded-full bg-white"
								animate={{
									top: mobileMenuOpen ? "10px" : "0px",
									rotate: mobileMenuOpen ? "45deg" : "0deg",
								}}
								transition={{ duration: 0.3 }}
							/>
							<motion.span
								className="absolute top-[8px] left-0 h-0.5 w-7 rounded-full bg-white"
								animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
								transition={{ duration: 0.3 }}
							/>
							<motion.span
								className="absolute left-0 h-0.5 w-7 rounded-full bg-white"
								animate={{
									top: mobileMenuOpen ? "10px" : "16px",
									rotate: mobileMenuOpen ? "-45deg" : "0deg",
								}}
								transition={{ duration: 0.3 }}
							/>
						</div>
					</button>

					{/* Mobile Menu */}
					<AnimatePresence>
						{mobileMenuOpen && (
							<motion.div
								className="fixed inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md"
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
							>
								<div className="flex flex-col items-center space-y-8">
									{navItems.map((item) => (
										<motion.a
											key={item.label}
											href={item.href}
											className="text-2xl font-medium"
											onClick={() =>
												setMobileMenuOpen(false)
											}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 10 }}
											transition={{
												duration: 0.2,
												delay:
													navItems.indexOf(item) *
													0.1,
											}}
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.95 }}
										>
											{item.label}
										</motion.a>
									))}
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.nav>
			)}
		</AnimatePresence>
	);
}

function NavItem({ label, href }: { label: string; href: string }) {
	return (
		<a
			className="relative text-sm after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100"
			href={href}
		>
			{label}
		</a>
	);
}
