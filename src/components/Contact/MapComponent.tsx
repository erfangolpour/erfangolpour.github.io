import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

export default function MapComponent() {
	useEffect(() => {
		// Only run this on client-side
		if (typeof window === "undefined") return;

		// Initialize map if it hasn't been initialized yet
		const mapContainer = document.getElementById("map-container");
		if (!mapContainer) return;

		// Create the map instance
		const map = L.map(mapContainer, {
			center: [49.2488, -122.9805], // Vancouver coordinates
			zoom: 11,
			zoomControl: false,
			attributionControl: false,
		});

		// Add the tile layer (map style)
		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);

		// Add marker for Vancouver
		const marker = L.marker([49.2488, -122.9805]).addTo(map);
		marker.bindPopup(
			"<div style='text-align: center; font-weight: bold;'>Burnaby, BC<br><span style='font-weight: normal;'>Where the magic happens</span></div>",
		);

		return () => {
			map.remove();
		};
	}, []);

	return (
		<div
			id="map-container"
			className="h-full w-full bg-gray-200"
			style={{ minHeight: "100%" }}
		></div>
	);
}
