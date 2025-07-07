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

    } catch (error) {
        console.error('Error initializing Leaflet map:', error);
        const mapContainer = document.getElementById('map-container');
        if (mapContainer) {
            mapContainer.innerHTML = `<p style="color: red; text-align: center; padding-top: 20px;">Error initializing map: ${error.message}. Check console for details.</p>`;
        }
    }
});
