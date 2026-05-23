from flask import Flask
app = Flask(__name__)

@app.route("/")
def home():
    return "Welcome to My Personal Website!Crafted with Flask and running on Vercel."

if __name__ == "__main__":
    app.run(debug=True)