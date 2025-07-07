document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed.');

    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.error('Leaflet library (L) is not loaded!');
        // Display a message to the user in the map container
        const mapContainer = document.getElementById('map-container');
        if (mapContainer) {
            mapContainer.innerHTML = '<p style="color: red; text-align: center; padding-top: 20px;">Error: Leaflet map library not found. The map cannot be displayed.</p>';
        }
        return; // Stop further execution if Leaflet is missing
    }

    console.log('Leaflet library found.');

    // Initialize the map
    try {
        // Note: The div ID in index.html is 'map-container', not 'map'
        // Leaflet needs an ID for the map div itself, not its parent.
        // Let's ensure 'map-container' is what we want to use, or add a child div.
        // For now, assuming 'map-container' is the direct map div.
        const map = L.map('map-container').setView([20, 0], 2); // Default view: latitude 20, longitude 0, zoom level 2

        console.log('Map initialized on "map-container".');

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(map);

        console.log('OpenStreetMap tile layer added to map.');
        console.log('Basic map setup complete. You should see a map with OpenStreetMap tiles.');

        console.log('OpenStreetMap tile layer added to map.');
        console.log('Basic map setup complete. You should see a map with OpenStreetMap tiles.');

        // Store references to map layers
        const layers = {
            countries: null,
            regions: null,
            cities: null
        };

        // Define styles
        const defaultStyles = {
            country: { fillColor: "#003f5c", weight: 1, opacity: 1, color: 'white', fillOpacity: 0.3 },
            region: { fillColor: "#7a5195", weight: 1, opacity: 1, color: 'white', fillOpacity: 0.3, dashArray: '4,4' },
            city: { radius: 5, fillColor: "#ef5675", color: "#fff", weight: 1, opacity: 1, fillOpacity: 0.8 }
        };
        const highlightStyle = { fillColor: "#ffa600", fillOpacity: 0.7, color: "#000", weight: 2 }; // Common highlight
        const nonMatchStyle = { fillOpacity: 0.05, opacity: 0.2, color: "#ccc" }; // Common non-match

        // Function to fetch and add GeoJSON data, returning the layer
        async function loadGeoJsonLayer(url, layerName, mapInstance, defaultStyleOptions) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    console.error(`Failed to load GeoJSON from ${url}: ${response.status} ${response.statusText}`);
                    return null;
                }
                const data = await response.json();
                console.log(`Successfully fetched GeoJSON from ${url}`);

                const geoJsonLayer = L.geoJSON(data, {
                    style: defaultStyleOptions, // Apply initial default style
                    onEachFeature: function (feature, layer) {
                        if (feature.properties && feature.properties.name) {
                            layer.bindPopup(feature.properties.name);
                        }
                    },
                    pointToLayer: function (feature, latlng) { // For city points
                        if (layerName === 'cities') {
                            return L.circleMarker(latlng, defaultStyleOptions);
                        }
                        return null; // Default for polygons/lines
                    }
                });
                // Do not add to map immediately, let updateLayerVisibility handle it.
                // .addTo(mapInstance);
                layers[layerName] = geoJsonLayer; // Store the layer
                console.log(`GeoJSON layer for ${layerName} created from ${url}.`);
                return geoJsonLayer;
            } catch (error) {
                console.error(`Error fetching or processing GeoJSON from ${url}:`, error);
                return null;
            }
        }

        function applyFiltersAndStyles() {
            console.log("Applying filters and styles...");
            const activeFilters = [];
            document.querySelectorAll('#filter-container input[type="checkbox"]:checked').forEach(checkbox => {
                activeFilters.push({
                    property: checkbox.dataset.property,
                    value: checkbox.value
                });
            });
            console.log("Active filters:", activeFilters);

            for (const layerName in layers) {
                const layerGroup = layers[layerName];
                if (layerGroup && map.hasLayer(layerGroup)) { // Only style visible layers
                    layerGroup.eachLayer(featureLayer => {
                        let matchesAll = true;
                        if (activeFilters.length > 0) {
                            for (const filter of activeFilters) {
                                const propValue = featureLayer.feature.properties[filter.property];
                                if (propValue !== filter.value) {
                                     // Special handling for public_transport "good" to also include "excellent"
                                    if (filter.property === "public_transport" && filter.value === "good" && propValue === "excellent") {
                                        // This counts as a match for "good"
                                    } else {
                                        matchesAll = false;
                                        break;
                                    }
                                }
                            }
                        }

                        let baseStyle = defaultStyles.country; // Default to country
                        if (layerName === 'regions') baseStyle = defaultStyles.region;
                        else if (layerName === 'cities') baseStyle = defaultStyles.city;

                        if (matchesAll) {
                            featureLayer.setStyle({...baseStyle, ...highlightStyle});
                            if (featureLayer.bringToFront) featureLayer.bringToFront();
                        } else {
                            if (activeFilters.length > 0) { // Only apply non-match if filters are active
                               featureLayer.setStyle({...baseStyle, ...nonMatchStyle});
                            } else {
                               featureLayer.setStyle(baseStyle); // Reset to default if no filters active
                            }
                        }
                    });
                }
            }
        }

        function updateLayerVisibility() {
            const selectedGranularity = document.getElementById('granularity-select').value;
            console.log("Updating layer visibility to:", selectedGranularity);

            for (const layerName in layers) {
                const layer = layers[layerName];
                if (layer) {
                    if (map.hasLayer(layer)) {
                        map.removeLayer(layer);
                    }
                    if (selectedGranularity === 'all' || selectedGranularity === layerName) {
                        map.addLayer(layer);
                    }
                }
            }
            applyFiltersAndStyles(); // Re-apply styles after changing visibility
        }

        function resetFilters() {
            console.log("Resetting filters.");
            document.querySelectorAll('#filter-container input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            // document.getElementById('granularity-select').value = 'all'; // Optionally reset granularity
            // updateLayerVisibility(); // This will also call applyFiltersAndStyles
            applyFiltersAndStyles(); // Just re-apply styles to reset to default
        }


        // Load all GeoJSON data initially
        async function loadAllData() {
            await loadGeoJsonLayer('/api/data/countries.geojson', 'countries', map, defaultStyles.country);
            await loadGeoJsonLayer('/api/data/regions.geojson', 'regions', map, defaultStyles.region);
            await loadGeoJsonLayer('/api/data/cities.geojson', 'cities', map, defaultStyles.city);

            // Initial display based on default granularity ('all')
            updateLayerVisibility();
            // applyFiltersAndStyles(); // Called by updateLayerVisibility
        }

        // Event Listeners
        document.getElementById('apply-filters-btn').addEventListener('click', applyFiltersAndStyles);
        document.getElementById('reset-filters-btn').addEventListener('click', resetFilters);
        document.getElementById('granularity-select').addEventListener('change', updateLayerVisibility);

        loadAllData(); // Load data when script runs

    } catch (error) {
        console.error('Error initializing Leaflet map:', error);
        const mapContainer = document.getElementById('map-container');
        if (mapContainer) {
            mapContainer.innerHTML = `<p style="color: red; text-align: center; padding-top: 20px;">Error initializing map: ${error.message}. Check console for details.</p>`;
        }
    }
});
