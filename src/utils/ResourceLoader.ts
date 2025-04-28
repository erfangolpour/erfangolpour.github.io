// A utility to detect when all resources (fonts & images) have loaded

type ResourceType = "font" | "image";

interface ResourceToLoad {
	type: ResourceType;
	src: string;
	id?: string;
}

export class ResourceLoader {
	// List of critical resources that must be loaded before showing content
	private static criticalResources: ResourceToLoad[] = [
		// Fonts
		{ type: "font", id: "HelveticaNow", src: "HelveticaNow" },
		{ type: "font", id: "Stylish-normal", src: "Stylish" },
		{ type: "font", id: "Stylish-italic", src: "Stylish" },

		// Critical images (hero and visible-on-load project images)
		{
			type: "image",
			id: "minesweeper",
			src: "/src/components/Projects/Modals/Minesweeper/Minesweeper.png",
		},
		{
			type: "image",
			id: "kiral",
			src: "/src/components/Projects/Modals/KIRAL/KIRAL.jpg",
		},
		{
			type: "image",
			id: "mineTUIper",
			src: "/src/components/Projects/Modals/mineTUIper/mineTUIper.png",
		},
		{
			type: "image",
			id: "mmoa",
			src: "/src/components/Projects/Modals/MMOA/MMOA.png",
		},
		{
			type: "image",
			id: "greensignal",
			src: "/src/components/Projects/Modals/GreenSignal/GreenSignal.jpg",
		},
		{
			type: "image",
			id: "arguX",
			src: "/src/components/Projects/Modals/ArguX/ArguX.png",
		},
		{
			type: "image",
			id: "gpugnn",
			src: "/src/components/Projects/Modals/GPUGNN/GPUGNN.png",
		},
		{
			type: "image",
			id: "aom",
			src: "/src/components/Projects/Modals/AOM/AOM.png",
		},
	];

	// Track loading progress
	private static totalResources = ResourceLoader.criticalResources.length;
	private static loadedCount = 0;
	private static loadingErrors = 0;

	/**
	 * Load all critical resources (fonts & images)
	 * @returns Promise that resolves when all resources are loaded
	 */
	static async loadResources(
		progressCallback?: (progress: number) => void,
	): Promise<boolean> {
		// Reset counters
		this.loadedCount = 0;
		this.loadingErrors = 0;

		// If there are no resources to load, return immediately
		if (this.criticalResources.length === 0) {
			if (progressCallback) progressCallback(100);
			return true;
		}

		// Create promises for all resources
		const promises = this.criticalResources.map((resource) => {
			return this.loadResource(resource)
				.then(() => {
					this.loadedCount++;
					if (progressCallback) {
						progressCallback(
							(this.loadedCount / this.totalResources) * 100,
						);
					}
				})
				.catch((err) => {
					console.error(
						`Failed to load resource: ${resource.src}`,
						err,
					);
					this.loadingErrors++;
					// Still update progress even for failed resources
					if (progressCallback) {
						progressCallback(
							(this.loadedCount / this.totalResources) * 100,
						);
					}
				});
		});

		// Wait for all resources to load (or fail)
		await Promise.allSettled(promises);

		// Wait for document fonts to be ready
		if (document.fonts) {
			try {
				await document.fonts.ready;
			} catch (error) {
				console.warn("Error waiting for document.fonts.ready:", error);
			}
		}

		// Return true if all critical resources loaded successfully
		return this.loadingErrors === 0;
	}

	/**
	 * Load a specific resource based on type
	 */
	private static loadResource(resource: ResourceToLoad): Promise<void> {
		switch (resource.type) {
			case "font":
				return this.loadFont(resource.src);
			case "image":
				return this.loadImage(resource.src);
			default:
				return Promise.reject(
					new Error(`Unknown resource type: ${resource.type}`),
				);
		}
	}

	/**
	 * Load a font using the Font Loading API
	 */
	private static async loadFont(fontFamily: string): Promise<void> {
		if (!document.fonts) {
			console.warn(
				"Font Loading API not supported, falling back to timeout for:",
				fontFamily,
			);
			return new Promise((resolve) => setTimeout(resolve, 800));
		}

		try {
			// Try both normal and italic styles for completeness
			const fontPromises = [
				document.fonts.load(`1em ${fontFamily}`),
				document.fonts.load(`italic 1em ${fontFamily}`),
			];

			await Promise.all(fontPromises);
			return Promise.resolve();
		} catch (error) {
			console.error(`Error loading font ${fontFamily}:`, error);
			return Promise.reject(error);
		}
	}

	/**
	 * Load an image
	 */
	private static loadImage(src: string): Promise<void> {
		return new Promise((resolve, _) => {
			// Skip if the path doesn't exist - this is helpful during development
			// or when paths change, to avoid blocking the UI on missing resources
			try {
				const img = new Image();
				img.onload = () => resolve();
				img.onerror = () => {
					console.warn(`Image not found: ${src}, continuing anyway`);
					resolve(); // Resolve anyway to avoid blocking the UI
				};
				img.src = src;
			} catch (e) {
				console.warn(`Error loading image: ${src}`, e);
				resolve(); // Resolve anyway to avoid blocking the UI
			}
		});
	}

	/**
	 * Preload additional non-critical images
	 * Call this after initial render to load remaining images
	 */
	static preloadAdditionalImages(imageSources: string[]): void {
		imageSources.forEach((src) => {
			const img = new Image();
			// Just silently load these in the background
			img.src = src;
		});
	}
}
