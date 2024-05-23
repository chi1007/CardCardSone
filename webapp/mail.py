from flask import Flask, request, render_template
import pymysql

app = Flask(__name__)

# MySQL連接配置
db_config = {
    'host': '184.73.84.91',
    'user': 'cardcardsone',
    'password': 'cardsone2024',
    'database': 'cardsoneDB',
}

@app.route('/credit_card_mail')
def credit_card_mail():
    return render_template('CreditCard_mail.html')


# 處理用戶提交的留言
@app.route('/submit_reply', methods=['POST'])
def submit_reply():
    try:
        # 獲取前端提交的表單數據
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']

        # 連接MySQL資料庫
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()

        # 插入回覆內容到資料庫
        sql = "INSERT INTO replies (name, email, message) VALUES (%s, %s, %s)"
        cursor.execute(sql, (name, email, message))
        
        # 提交事務
        connection.commit()

        # 關閉資料庫連接
        cursor.close()
        connection.close()

        return '回覆提交成功！'
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
