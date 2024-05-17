from flask import Flask
from markupsafe import escape
from flask import request
from flask import render_template
from flask import send_from_directory
from flask import session,make_response,flash
from flask import Blueprint

app = Flask(__name__)

app.template_folder = 'templates'
app.static_folder='static'
#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////env/mysql/card_data.db"
# @app.route('/', methods=['GET', 'POST'])
# def login():
#     return "<img src=static/002104110009.jpg>"
@app.route("/")
def home():
    css_file = 'css/styles.css'
    js_file = 'js/scripts.js'
    return render_template('CreditCard_home.html', css_file=css_file, js_file=js_file)

@app.route("/<page_name>")
def showpage(page_name):
    css_file = 'css/styles.css'
    js_file = 'js/scripts.js'
    if page_name == 'PopularDebitCards':
        return render_template('PopularDebitCards.html', css_file=css_file, js_file=js_file)
    elif page_name == 'PopularCreditCards':
        return render_template('PopularCreditCards.html', css_file=css_file, js_file=js_file)
    elif page_name == 'description':
        return render_template('CardsDescription.html', css_file=css_file, js_file=js_file)
    elif page_name == 'contact':
        return render_template('CreditCard_mail.html', css_file=css_file, js_file=js_file)
    elif page_name == 'news':
        return render_template('CreditCard_news.html', css_file=css_file, js_file=js_file)
    elif page_name == 'comparison':
        return render_template('CreditComparison.html', css_file=css_file, js_file=js_file)
    elif page_name == 'CardComparison':
        return render_template('CreditCardComparison.html', css_file=css_file, js_file=js_file)
    elif page_name == 'guide':
        return render_template('start_guide.html', css_file=css_file, js_file=js_file)
    else:
        return render_template('CreditCard_home.html', css_file=css_file, js_file=js_file)


@app.route('/bankdata/<path:filename>')
def serve_json(filename):
    # 使用相對路徑指向當前目錄的上一層中的 `bankdata` 目錄
    directory_path = '../bankdata'
    return send_from_directory(directory_path, filename)


# extensions(app)
# authentication(app, User)

#if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0',port=8000)