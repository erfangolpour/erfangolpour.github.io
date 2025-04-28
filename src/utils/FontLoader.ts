// A utility to detect when fonts have loaded before starting animations

export class FontLoader {
	static async loadFonts(): Promise<boolean> {
		if (!document.fonts) {
			console.warn(
				"Font Loading API not supported, falling back to timeout",
			);
			return new Promise((resolve) =>
				setTimeout(() => resolve(true), 800),
			);
		}

		try {
			// Create a list of the fonts we need to check
			const fontFamilies = [
				{ family: "HelveticaNow", options: {} },
				{ family: "Stylish", options: { style: "normal" } },
				{ family: "Stylish", options: { style: "italic" } },
			];

			// Wait for all fonts to be loaded
			const fontPromises = fontFamilies.map((font) =>
				document.fonts.load(`1em ${font.family}`, "A"),
			);

			await Promise.all(fontPromises);

			// Additional ready check
			await document.fonts.ready;

			return true;
		} catch (error) {
			console.error("Error loading fonts:", error);
			return false;
		}
	}
}
