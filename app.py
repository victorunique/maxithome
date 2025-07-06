from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

# Explicitly define routes for CSS and JS if needed,
# though static_folder='.' should handle them.
# However, direct routes can help in debugging if there are issues.
@app.route('/style.css')
def style():
    return send_from_directory('.', 'style.css')

@app.route('/script.js')
def script():
    return send_from_directory('.', 'script.js')

if __name__ == '__main__':
    print("Starting Flask server...")
    print("Open your browser and navigate to http://127.0.0.1:5000 or http://localhost:5000")
    app.run(debug=True, port=5000)
