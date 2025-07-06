document.addEventListener('DOMContentLoaded', function () {
    // Initialize the map
    const map = L.map('map').setView([20, 0], 2); // Centered loosely, zoom level 2

    // Add a tile layer to the map (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Placeholder for future GeoJSON layers and filter logic
    console.log('Map initialized.');

    // Store layers for filtering
    let countryLayer, regionLayer, cityLayer;
    const layers = {}; // To store original data for re-filtering

    // Default and highlight styles
    const defaultStyles = {
        country: { color: "#ff7800", weight: 2, opacity: 0.65, fillOpacity: 0.1 },
        region: { color: "#0078ff", weight: 2, opacity: 0.65, dashArray: '5, 5', fillOpacity: 0.1 },
        city: { radius: 6, fillColor: "#00ff78", color: "#000", weight: 1, opacity: 1, fillOpacity: 0.6 }
    };
    const highlightStyle = {
        fillColor: "#FFFF00", // Yellow highlight
        fillOpacity: 0.5
    };
    const nonMatchStyle = {
        fillColor: "#808080", // Grey
        fillOpacity: 0.3,
        opacity: 0.3,
        color: "#505050"
    };


    // Function to fetch and process GeoJSON data
    async function loadAndProcessGeoJSON(url, mapInstance, layerName, styleOptions) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.error(`Failed to load ${url}: ${response.statusText}`);
                return null;
            }
            const geojsonData = await response.json();
            layers[layerName] = geojsonData; // Store original data

            const leafletLayer = L.geoJSON(geojsonData, {
                style: styleOptions,
                onEachFeature: function (feature, layer) {
                    if (feature.properties && feature.properties.name) {
                        layer.bindPopup(feature.properties.name);
                    }
                },
                pointToLayer: layerName === 'cities' ? function (feature, latlng) {
                    return L.circleMarker(latlng, styleOptions);
                } : null
            }).addTo(mapInstance);

            console.log(`${layerName} data loaded and displayed.`);
            return leafletLayer;
        } catch (error)
        {
            console.error(`Error fetching or parsing ${url}:`, error);
            return null;
        }
    }

    // Load initial data
    async function loadInitialData() {
        countryLayer = await loadAndProcessGeoJSON('/api/data/countries.geojson', map, 'countries', defaultStyles.country);
        regionLayer = await loadAndProcessGeoJSON('/api/data/regions.geojson', map, 'regions', defaultStyles.region);
        cityLayer = await loadAndProcessGeoJSON('/api/data/cities.geojson', map, 'cities', defaultStyles.city);
        applyFilters(); // Apply initial (empty) filters
    }

    // Filter logic
    function applyFilters() {
        const activeFilters = [];
        document.querySelectorAll('#filter-panel input[type="checkbox"]:checked').forEach(checkbox => {
            activeFilters.push({
                property: checkbox.dataset.filterProperty,
                value: checkbox.dataset.filterValue
            });
        });

        [countryLayer, regionLayer, cityLayer].forEach(layerGroup => {
            if (layerGroup) {
                layerGroup.eachLayer(layer => {
                    let matchesAll = true;
                    if (activeFilters.length > 0) {
                        for (const filter of activeFilters) {
                            const propValue = layer.feature.properties[filter.property];
                            if (filter.property === "public_transport" && filter.value === "good") {
                                // Special handling for "Good+" (good or excellent)
                                if (propValue !== "good" && propValue !== "excellent") {
                                    matchesAll = false;
                                    break;
                                }
                            } else if (propValue !== filter.value) {
                                matchesAll = false;
                                break;
                            }
                        }
                    } else {
                        // No filters active, so everything "matches" for styling purposes (show default)
                        matchesAll = true;
                    }

                    let baseStyle;
                    if (layer.feature.geometry.type === "Point") baseStyle = defaultStyles.city;
                    else if (layer.feature.properties.country) baseStyle = defaultStyles.region; // Assuming regions have country prop
                    else baseStyle = defaultStyles.country;

                    if (activeFilters.length === 0) {
                         layer.setStyle(baseStyle); // Reset to default if no filters
                    } else if (matchesAll) {
                        layer.setStyle({ ...baseStyle, ...highlightStyle });
                    } else {
                        layer.setStyle({ ...baseStyle, ...nonMatchStyle });
                    }
                });
            }
        });
    }

    // Granularity logic
    function updateLayerVisibility() {
        const selectedLevel = document.getElementById('layer-select').value;

        if (countryLayer) map[selectedLevel === 'all' || selectedLevel === 'countries' ? 'addLayer' : 'removeLayer'](countryLayer);
        if (regionLayer) map[selectedLevel === 'all' || selectedLevel === 'regions' ? 'addLayer' : 'removeLayer'](regionLayer);
        if (cityLayer) map[selectedLevel === 'all' || selectedLevel === 'cities' ? 'addLayer' : 'removeLayer'](cityLayer);

        // Re-apply filters as layers might have been removed and re-added
        // or if filters should behave differently based on visible layers (though current logic doesn't specifically do that)
        applyFilters();
    }

    // Event Listeners
    document.querySelectorAll('#filter-panel input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    document.getElementById('layer-select').addEventListener('change', updateLayerVisibility);

    loadInitialData();
});
