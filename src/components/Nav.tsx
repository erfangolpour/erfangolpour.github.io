import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Nav() {
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPos = window.scrollY;

			// Make the nav visible when scrolling up or at the top
			setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);

			// Update the previous scroll position
			setPrevScrollPos(currentScrollPos);
		};

		// Add scroll event listener
		window.addEventListener("scroll", handleScroll);

		// Clean up
		return () => window.removeEventListener("scroll", handleScroll);
	}, [prevScrollPos]);

	return (
		<AnimatePresence>
			{visible && (
				<motion.nav
					className="fixed flex justify-around top-0 inset-x-0 z-50 py-4"
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
					{NavItem("Home", "#")}
					{NavItem("Projects", "#")}
					{NavItem("Skills", "#")}
					{NavItem("About", "#")}
					{NavItem("Contact", "#")}
				</motion.nav>
			)}
		</AnimatePresence>
	);
}

function NavItem(label: string, href: string) {
	return (
		<a
			className="text-sm relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bg-white after:bottom-0 after:left-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
			href={href}
		>
			{label}
		</a>
	);
}
