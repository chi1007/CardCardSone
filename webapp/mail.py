from flask import Flask, request, render_template, jsonify
import pymysql
from flask import Blueprint

app = Flask(__name__)

mail_blueprint = Blueprint('mail', __name__)

# MySQL連接配置
db_config = {
    'host': '184.73.84.91',
    'user': 'cardcardsone',
    'password': 'cardsone2024',
    'database': 'cardsoneDB',
}

# @mail_blueprint.route('/contact')
# def credit_card_mail():
#     return render_template('CreditCard_mail.html')

# @mail_blueprint.route('/contact', methods=['POST'])
# def contact():


@mail_blueprint.route('/contact', methods=['POST']) #導入contact之路由
def contact():
    if request.method == 'POST':
        try:
            # 獲取前端提交的表單數據
            name = request.form['name']
            email = request.form['email']
            message = request.form['message']

            # 調試信息
            print(f"Received data: Name={name}, Email={email}, Message={message}")

            # 連接MySQL資料庫
            connection = pymysql.connect(**db_config)
            cursor = connection.cursor()

            # 插入回覆內容到資料庫
            sql = "INSERT INTO mail_reply (name, email, message) VALUES (%s, %s, %s)"
            cursor.execute(sql, (name, email, message))
            
            # 提交事務
            connection.commit()

            # 關閉資料庫連接
            cursor.close()
            connection.close()

            return '回覆提交成功！'
        except Exception as e:
            print(f"Error: {str(e)}")
            return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
