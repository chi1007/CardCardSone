from flask import Flask, render_template, request, redirect, url_for, session
import pymysql
import bcrypt

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

# 设置MySQL连接参数
def get_db_connection():
    connection = pymysql.connect(host='184.73.84.91',
                                 user='cardcardsone',
                                 password='cardsone2024',
                                 db='cardsoneDB',
                                 charset='utf8mb4',
                                 cursorclass=pymysql.cursors.DictCursor)
    return connection

# 验证用户提交的用户名和密码是否匹配数据库中的信息
def verify_user(username, password):
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM users WHERE username = %s"
            cursor.execute(sql, (username,))
            user = cursor.fetchone()
            if user:
                # 检查哈希密码是否匹配
                if bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
                    return True
    finally:
        connection.close()
    return False

# 登录页面路由
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # 验证用户提交的用户名和密码
        if verify_user(username, password):
            # 登录成功，将用户标记为已登录，并重定向到首页
            session['logged_in'] = True
            return redirect(url_for('index'))
        else:
            # 登录失败，返回错误消息给用户
            return "Invalid username or password. Please try again."

    # 渲染登录页面模板
    return render_template('login.html')

# 首页路由
@app.route('/')
def index():
    if 'logged_in' in session and session['logged_in']:
        return "Welcome to the homepage!"
    else:
        return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
