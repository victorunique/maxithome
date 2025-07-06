from flask import Flask, jsonify, send_from_directory
import os

app = Flask(__name__, static_folder='.', static_url_path='')

# Ensure the 'data' directory exists at the same level as app.py
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
    Valid filenames are 'countries.geojson', 'regions.geojson', 'cities.geojson'.
    """
    valid_files = ['countries.geojson', 'regions.geojson', 'cities.geojson']
    if filename in valid_files:
        try:
            # Construct the full path to the file within the DATA_DIR
            file_path = os.path.join(DATA_DIR, filename)
            if not os.path.exists(file_path):
                return jsonify({"error": "File not found"}), 404
            # Use send_from_directory for security and correct MIME types
            return send_from_directory(DATA_DIR, filename)
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "Invalid data file requested"}), 400

if __name__ == '__main__':
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
        print(f"Created data directory at {DATA_DIR}")
    # You might need to create placeholder geojson files in the 'data' directory
    # for the app to run correctly if they don't exist.
    # e.g., open(os.path.join(DATA_DIR, 'countries.geojson'), 'a').close()

    app.run(debug=True, port=5000)
