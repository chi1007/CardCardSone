from flask import Flask
from markupsafe import escape
from flask import request
from flask import render_template
from flask import send_from_directory
from flask import session,make_response,flash
from flask import Blueprint

app1_blueprint = Blueprint('app1', __name__)

app1_blueprint.template_folder = 'templates'
app1_blueprint.static_folder='static'
#app1_blueprint.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app1_blueprint.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////env/mysql/card_data.db"
# @app1_blueprint.route('/', methods=['GET', 'POST'])
# def login():
#     return "<img src=static/002104110009.jpg>"


@app1_blueprint.route("/")
def home_app1():
    css_file = 'css/styles.css'
    js_file = 'js/scripts.js'
    return render_template('CreditCard_home.html', css_file=css_file, js_file=js_file)

@app1_blueprint.route("/<page_name>")
def showpage(page_name):
    css_file = 'css/styles.css'
    js_file = 'js/scripts.js'
    if page_name == 'PopularDebitCards':
        return render_template('PopularDebitCards.html', css_file=css_file, js_file=js_file)
    elif page_name == 'PopularCreditCards':
        return render_template('PopularCreditCards.html', css_file=css_file, js_file=js_file)
    elif page_name == 'DebitDescription':
        return render_template('DebitDescription.html', css_file=css_file, js_file=js_file)
    elif page_name == 'CreditDescription':
        return render_template('CreditDescription.html', css_file=css_file, js_file=js_file)
    elif page_name == 'contact':
        return render_template('CreditCard_mail.html', css_file=css_file, js_file=js_file)
    elif page_name == 'news':
        return render_template('CreditCard_news.html', css_file=css_file, js_file=js_file)
    elif page_name == 'DebitComparison':
        return render_template('DebitComparison.html', css_file=css_file, js_file=js_file)
    elif page_name == 'DebitCardComparison':
        return render_template('DebitCardComparison.html', css_file=css_file, js_file=js_file)
    elif page_name == 'CreditComparison':
        return render_template('CreditComparison.html', css_file=css_file, js_file=js_file)
    elif page_name == 'CreditCardComparison':
        return render_template('CreditCardComparison.html', css_file=css_file, js_file=js_file)
    elif page_name == 'guide':
        return render_template('start_guide.html', css_file=css_file, js_file=js_file)
    elif page_name == 'question':
        return render_template('preference_question.html', css_file=css_file, js_file=js_file)
    elif page_name == 'sign_up':
        return render_template('sign_up.html', css_file=css_file, js_file=js_file)
    elif page_name == 'login':
        return render_template('login.html', css_file=css_file, js_file=js_file)
    else:
        return render_template('CreditCard_home.html', css_file=css_file, js_file=js_file)


@app1_blueprint.route('/bankdata/<path:filename>')
def serve_json(filename):
    # 使用相對路徑指向當前目錄的上一層中的 `bankdata` 目錄
    directory_path = '../bankdata'
    return send_from_directory(directory_path, filename)


# extensions(app1_blueprint)
# authentication(app1_blueprint, User)

#if __name__ == '__main__':
#     app1_blueprint.run(debug=True, host='0.0.0.0',port=8000)