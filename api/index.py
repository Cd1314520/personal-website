from flask import Flask, render_template

app = Flask(__name__, template_folder='../templates', static_folder='../static')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return "<h1>About Me</h1><p>This is my personal website!</p>"

if __name__ == '__main__':
    app.run(debug=True)