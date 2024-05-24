from flask import Flask, request, jsonify, render_template
import pymysql
from flask import Blueprint

app = Flask(__name__)

sign_up_blueprint = Blueprint('sign_up', __name__)

# MySQL連接配置
db_config = {
    'host': '184.73.84.91',
    'user': 'cardcardsone',
    'password': 'cardsone2024',
    'database': 'cardsoneDB',
}

@sign_up_blueprint.route('/sign_up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        try:
            # 獲取前端提交的表單數據
            name = request.form['name']
            email = request.form['email']
            password = request.form['password']

            # 調試信息
            print(f"Received data: Name={name}, Email={email}, Password={password}")

            # 連接MySQL資料庫
            connection = pymysql.connect(**db_config)
            cursor = connection.cursor()

            # 插入使用者註冊資料到資料庫
            sql = "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)"
            cursor.execute(sql, (name, email, password))
            
            # 提交事務
            connection.commit()

            # 關閉資料庫連接
            cursor.close()
            connection.close()

            return '註冊成功！'
        except Exception as e:
            print(f"Error: {str(e)}")
            return jsonify({'error': str(e)}), 500
    else:
        # 如果是 GET 請求，則返回 HTML 表單
        return render_template('sign_up.html')

if __name__ == '__main__':
    app.run(debug=True)
