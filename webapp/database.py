from flask import Flask, request, jsonify
from flask import Blueprint
import pymysql

database_blueprint = Blueprint('database', __name__)

def get_db_connection():
    connection = pymysql.connect(host='54.160.176.92',
                                 user='cardcardsone',
                                 password='cardsone2024',
                                 db='cardsoneDB',
                                 charset='utf8mb4',
                                 cursorclass=pymysql.cursors.DictCursor)
    return connection

# 通用 GET 數據函數
def get_data(table_name):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(f'SELECT * FROM {table_name}')
            results = cursor.fetchall()
            return jsonify(results)
    finally:
        conn.close()

# 通用 POST 數據函數
def insert_data(table_name, data, fields):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            placeholders = ['%s'] * len(fields)
            sql = f'INSERT INTO {table_name} ({", ".join(fields)}) VALUES ({", ".join(placeholders)});'
            cursor.execute(sql, [data[field] for field in fields])
            conn.commit()
            return jsonify({'message': 'Data inserted successfully!'}), 201
    finally:
        conn.close()

@database_blueprint.route('/debitcard', methods=['GET'])
def get_debitcard():
    return get_data('debitcard')

@database_blueprint.route('/debitcard', methods=['POST'])
def post_debitcard():
    data = request.get_json()
    fields = ['dcid', 'name', 'bankname', 'tag', 'utilities_payment', 'basic_rewards', 'additional_benefits', 'overseas_spending', 'online_shopping_discounts', 'mobile_payment', 'commute_expenses', 'food_delivery', 'entertainment', 'travel_booking', 'department_stores', 'img', 'features', 'interest_rate', 'cross_bank_offers', 'Website', 'link']  # 請根據實際字段調整
    return insert_data('debitcard', data, fields)

@database_blueprint.route('/debitcard_desc', methods=['GET'])
def get_debitcard_desc():
    return get_data('debitcard_desc')

@database_blueprint.route('/debitcard_desc', methods=['POST'])
def post_debitcard_desc():
    data = request.get_json()
    fields = ['name', 'description']  # 請根據實際字段調整
    return insert_data('debitcard_desc', data, fields)

@database_blueprint.route('/creditcard', methods=['GET'])
def get_creditcard():
    return get_data('creditcard')

@database_blueprint.route('/creditcard', methods=['POST'])
def post_creditcard():
    data = request.get_json()
    fields = ['ccid', 'name', 'img', 'link', 'features', 'tag', 'basic_rewards', 'additional_benefits', 'overseas_spending', 'cross_bank_offers', 'online_shopping_discounts', 'mobile_payment', 'commute_expenses', 'utilities_payment', 'food_delivery', 'entertainment', 'travel_booking', 'department_stores', 'new_user_offer', 'right', 'revolving_interest_rate', 'Website']  # 請根據實際字段調整
    return insert_data('creditcard', data, fields)

@database_blueprint.route('/creditcard_desc', methods=['GET'])
def get_creditcard_desc():
    return get_data('creditcard_desc')

@database_blueprint.route('/creditcard_desc', methods=['POST'])
def post_creditcard_desc():
    data = request.get_json()
    fields = ['name', 'description']  # 請根據實際字段調整
    return insert_data('creditcard_desc', data, fields)

# @database_blueprint.route('/recommend_data', methods=['GET'])
# def get_recommend_data():
#     return get_data('recommend_data')

# [
#     {
#         cid:
#         type:  
#         name:  
#         basic_rewards:  
#         additional_benefits:  
#         overseas_spending:  
#         online_shopping_discounts:  
#         mobile_payment:  
#         commute_expenses:  
#         utilities_payment:  
#         food_delivery:  
#         entertainment:  
#         travel_booking:  
#         department_stores:
#     }
# ]

# arr = []

# for data in dataList:
#   name = data.name
#   arr[name] = []
#   arr[name][] = data
#   arr[name][] = data
#   arr[name][] = data
#   arr[name][] = data
#   arr[name][] = data
#   arr[name][] = data

# @database_blueprint.route('/recommend_data', methods=['POST'])
# def post_recommend_data():
#     data = request.get_json()
#     fields = [
#         'cid', 'type', 'name', 'basic_rewards', 'additional_benefits', 
#         'overseas_spending', 'online_shopping_discounts', 
#         'mobile_payment', 'commute_expenses', 'utilities_payment', 
#         'food_delivery', 'entertainment', 'travel_booking', 
#         'department_stores'
#     ]
#     return insert_data('recommend_data', data, fields)

@database_blueprint.route('/questions', methods=['GET'])
def get_questions():
    return get_data('questions')

@database_blueprint.route('/questions', methods=['POST'])
def post_question():
    data = request.get_json()
    fields = ['qid', 'question']
    return insert_data('questions', data, fields)

if __name__ == '__main__':
    database_blueprint.run(debug=True)
    
