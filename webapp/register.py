from flask import Flask, render_template, request, redirect, url_for
import pymysql
import bcrypt
from flask import Blueprint
from database import database_blueprint, get_data


login_blueprint = Blueprint('login', __name__)
register_blueprint = Blueprint('register', __name__)
app = Flask(__name__)

# 设置MySQL连接参数
def get_db_connection():
    connection = pymysql.connect(host='184.73.84.91',
                                 user='cardcardsone',
                                 password='cardsone2024',
                                 db='register',
                                 charset='utf8mb4',
                                 cursorclass=pymysql.cursors.DictCursor)
    return connection

# 检查用户名是否已存在
def username_exists(username):
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM users WHERE username = %s"
            cursor.execute(sql, (username,))
            result = cursor.fetchone()
            return result is not None
    finally:
        connection.close()

# 检查电子邮箱是否已存在
def email_exists(email):
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM users WHERE email = %s"
            cursor.execute(sql, (email,))
            result = cursor.fetchone()
            return result is not None
    finally:
        connection.close()

# 将用户注册信息存储到数据库中的 'users' 表格
def insert_user_into_database(username, email, hashed_password):
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            sql = "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)"
            cursor.execute(sql, (username, email, hashed_password))
        connection.commit()
    finally:
        connection.close()

def test_db_connection():
    try:
        connection = get_db_connection()
        return True
    except pymysql.Error as e:
        print("MySQL connection error:", e)
        return False

# 注册页面路由
@register_blueprint.route("/", methods=["GET", "POST"])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']

        # 确保密码匹配
        if password != confirm_password:
            return "Passwords do not match. Please try again."

        # 检查用户名和邮箱的唯一性
        if username_exists(username):
            return "Username already exists. Please choose another username."
        if email_exists(email):
            return "Email already exists. Please use another email."

        # 对密码进行哈希加密
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # 将用户注册信息存储到数据库
        insert_user_into_database(username, email, hashed_password)

        # 注册成功后重定向到登录页面
        return redirect(url_for('login'))

    # 渲染注册页面模板
    return render_template('register.html')

# 登录页面路由
@login_blueprint.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # 获取表单提交的用户名和密码
        username = request.form['username']
        password = request.form['password']

        # 在这里验证用户名和密码是否匹配数据库中的信息
        # 如果匹配，执行登录操作，并重定向到首页
        # 如果不匹配，返回登录页面并显示错误信息
        # 这里省略验证过程，您可以根据需要自行添加

        return "Login functionality will be implemented here."
    else:
        return render_template('login.html')

# 根路由，用于测试与数据库的连接
@app.route('/')
def test_connection():
    if test_db_connection():
        return "Connection to the database is successful!"
    else:
        return "Failed to connect to the database. Please check your connection parameters."

if __name__ == '__main__':
    app.run(debug=True)
