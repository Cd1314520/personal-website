from flask import Flask, render_template, request, jsonify

app = Flask(
    __name__,
    template_folder='../templates',
    static_folder='../static',
    static_url_path='/static'
)


@app.route('/')
def home():
    return render_template('landing.html', active_page='home')


@app.route('/about')
def about():
    return render_template('about.html', active_page='about')


@app.route('/portfolio')
def portfolio():
    return render_template('portfolio.html', active_page='portfolio')


@app.route('/resume')
def resume():
    return render_template('resume.html', active_page='resume')


@app.route('/contact')
def contact():
    return render_template('contact.html', active_page='contact')


@app.route('/api/contact', methods=['POST'])
def contact_submit():
    data = request.get_json()
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    subject = data.get('subject', '').strip()
    message = data.get('message', '').strip()

    if not all([name, email, message]):
        return jsonify({
            'success': False,
            'message': 'Please fill in all required fields.'
        }), 400

    # TODO: Integrate email service (SendGrid, SMTP, etc.)
    return jsonify({
        'success': True,
        'message': 'Thanks for reaching out! I\'ll get back to you soon.'
    })


if __name__ == '__main__':
    app.run(debug=True)