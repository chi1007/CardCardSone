from flask import Flask
from app1 import app1_blueprint
from rc_app import rc_app_blueprint


app = Flask(__name__)

app.register_blueprint(app1_blueprint, url_prefix='/')
app.register_blueprint(rc_app_blueprint, url_prefix='/rc_app')  





# extensions(app)
# authentication(app, User)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0',port=5000)