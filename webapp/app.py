from flask import Flask
from markupsafe import escape
from flask import request
from flask import render_template
app = Flask(__name__)
app.template_folder = 'templates'
app.static_folder='static'
# @app.route('/', methods=['GET', 'POST'])
# def login():
#     return "<img src=static/002104110009.jpg>"
@app.route("/")
def homepage():
    print("homepage")
    css_file = 'css/styles.css'
    js_file = 'js/scripts.js'
    return render_template('CreditCard_home.html', css_file=css_file, js_file=js_file)

@app.route("/populardebitcards")
def show_populardebitcards():
    css_file = 'css/styles.css'
    js_file = 'js/scripts.js'
    return render_template('PopularDebitCards.html', css_file=css_file, js_file=js_file)

@app.route("/popularcreditcards")
def show_popularcreditcards():
    css_file = 'css/styles.css'
    js_file = 'js/scripts.js'
    return render_template('PopularCreditCards.html', css_file=css_file, js_file=js_file)

@app.route("/contact")
def show_mail():
    css_file = 'css/styles.css'
    js_file = 'js/scripts.js'
    return render_template('CreditCard_mail.html', css_file=css_file, js_file=js_file)
@app.route("/news")
def show_news():
    css_file = 'css/styles.css'
    js_file = 'js/scripts.js'
    return render_template('CreditCard_news.html', css_file=css_file, js_file=js_file)

@app.route("/comparison")
def comparison():
    css_file = 'css/styles.css'
    js_file = 'js/scripts.js'
    return render_template('CreditCardComparison.html', css_file=css_file, js_file=js_file)


if __name__ == '__main__':
     app.run(debug=True, host='0.0.0.0',port=8000)