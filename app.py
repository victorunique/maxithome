from flask import Flask, send_from_directory, jsonify
import os

app = Flask(__name__, static_folder='.', static_url_path='')

# Define the path to the data directory
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/style.css')
def style():
    return send_from_directory('.', 'style.css')

@app.route('/script.js')
def script():
    return send_from_directory('.', 'script.js')

@app.route('/api/data/<filename>')
def get_geojson_data(filename):
    """
    Serves GeoJSON data from the 'data' directory.
    Valid filenames: countries.geojson, regions.geojson, cities.geojson.
    """
    # Ensure the data directory exists, create if not (though it should be created by the agent)
    if not os.path.exists(DATA_DIR):
        # This case should ideally not be hit if agent creates directory first
        return jsonify({"error": "Data directory not found on server"}), 500

    valid_files = ['countries.geojson', 'regions.geojson', 'cities.geojson']
    if filename in valid_files:
        file_path = os.path.join(DATA_DIR, filename)
        if not os.path.exists(file_path):
            return jsonify({"error": f"Data file '{filename}' not found on server"}), 404
        try:
            return send_from_directory(DATA_DIR, filename, mimetype='application/geo+json')
        except Exception as e:
            app.logger.error(f"Error serving file {filename}: {e}")
            return jsonify({"error": "Error serving data file"}), 500
    else:
        return jsonify({"error": "Invalid data file requested"}), 400

if __name__ == '__main__':
    # Create data directory if it doesn't exist when server starts
    # This is more of a fallback; ideally, the agent creates necessary files/dirs.
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
        print(f"Created data directory at: {DATA_DIR}")
        # One might also create placeholder files here if desired for standalone server run
        # For now, we assume the agent will create the actual GeoJSON files.

    print("Starting Flask server...")
    print("Open your browser and navigate to http://127.0.0.1:5000 or http://localhost:5000")
    app.run(debug=True, port=5000)
