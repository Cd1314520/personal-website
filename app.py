from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Welcome to my personal website!"  # Indented by 4 spaces

if __name__ == "__main__":
    app.run(debug=True)  # Indented by 4 spaces