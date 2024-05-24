
# # 問題列表
# questions = [
#     " 1. 您是否對申辦卡片有特定的卡別偏好？ (1. 信用卡、2. 無特定偏好、3. 金融卡)",
#     " 2. 您對卡片提供的基本回饋(利率)重視程度為何？",
#     " 3. 您對卡片提供的額外回饋(加碼、贈品)重視程度為何？",
#     " 4. 您對卡片提供的海外消費回饋重視程度為何？",
#     " 5. 您對卡片提供的電商平台網購優惠重視程度為何？",
#     " 6. 您對卡片提供支援綁定行動支付重視程度為何？",
#     " 7. 您對卡片提供的通勤交通優惠重視程度為何？",
#     " 8. 您對卡片提供的生活繳費優惠重視程度為何？",
#     " 9. 您對卡片提供的餐飲外送優惠重視程度為何？",
#     "10. 您對卡片提供的影音串流平台優惠重視程度為何？",
#     "11. 您對卡片提供的旅遊訂房優惠重視程度為何？",
#     "12. 您對卡片提供的量販百貨優惠重視程度為何？"
# ]

# 資料庫/模型：信用卡和金融卡的特徵表示
# cards_features = {
#     "credit_cards": {
#         "匯豐 匯鑽卡": [5.02, 5.96, 5.02, 5.83, 5.97, 5.39, 5.73, 5.64, 5.51, 5.82, 5.78],
#         "台新 @GoGo 卡": [1.14, 4.54, 1.75, 4.61, 0.19, 1.07, 4.05, 2.07, 4.00, 1.70, 1.24],
#         "滙豐 現金回饋御璽卡": [0.87, 2.03, 4.65, 0.92, 4.12, 1.44, 0.22, 4.00, 3.43, 4.89, 2.25],
#         "永豐 現金回饋 Green 卡": [4.98, 3.18, 3.60, 2.31, 0.53, 4.04, 0.88, 0.60, 2.22, 1.29, 0.51],
#         "台新 玫瑰Giving卡": [3.36, 1.28, 0.89, 3.46, 1.92, 3.32, 3.82, 3.41, 0.50, 0.34, 2.06],
#         "國泰世華 CUBE 卡": [2.42, 0.85, 3.93, 1.09, 0.26, 1.32, 0.20, 4.71, 3.20, 1.60, 4.09],
#         "聯邦 吉鶴卡": [0.31, 4.38, 2.44, 4.01, 1.84, 3.01, 4.90, 4.86, 1.28, 0.16, 2.60],
#         "富邦 J 卡": [3.43, 4.26, 2.26, 4.60, 3.48, 0.77, 1.42, 1.98, 0.77, 2.08, 1.08],
#         "台新 FlyGo卡": [2.31, 1.92, 1.71, 4.52, 1.47, 3.57, 1.54, 0.33, 2.26, 2.20, 2.27],
#         "第一銀行 icash 聯名卡": [1.01, 2.79, 4.23, 1.45, 0.06, 3.87, 0.51, 1.25, 1.24, 2.60, 1.38]
#     },
#     "finance_cards": {
#         "將來 將將卡": [5.27, 5.56, 5.83, 5.26, 4.46, 5.00, 5.12, 5.98, 5.12, 5.83, 5.46],
#         "台新 遛狗卡": [4.34, 1.50, 0.22, 3.97, 3.92, 0.11, 3.37, 1.38, 2.41, 1.56, 3.28],
#         "玉山 Pi 拍兔簽帳金融卡": [0.32, 1.07, 4.25, 3.65, 1.86, 4.25, 4.23, 3.80, 4.73, 4.99, 0.80],
#         "LINE Bank 快點卡": [0.98, 2.21, 0.15, 3.37, 1.71, 1.28, 3.26, 4.04, 2.73, 4.40, 2.94],
#         "永豐大戶DAWHO現金回饋Debit卡": [3.86, 0.31, 3.90, 2.87, 1.28, 4.38, 4.57, 1.44, 4.68, 1.45, 4.21],
#         "中信 LINE Pay 金融卡": [0.90, 2.47, 1.54, 4.77, 4.64, 2.31, 3.14, 3.58, 2.31, 3.65, 4.43],
#         "玉山家樂福悠遊簽帳金融卡": [4.48, 1.23, 3.34, 2.20, 3.08, 1.18, 3.51, 0.93, 4.04, 1.62, 0.70],
#         "王道銀行 O-Bank簽帳金融卡": [4.49, 4.69, 3.57, 1.45, 4.96, 4.43, 2.34, 4.95, 1.97, 0.26, 1.86],
#         "國泰一卡通簽帳金融卡": [1.58, 0.28, 2.32, 1.07, 0.87, 0.11, 0.16, 3.29, 0.54, 0.82, 4.40],
#         "兆豐 Visa 金融卡": [3.99, 1.24, 0.96, 1.91, 4.84, 4.08, 0.72, 4.50, 1.18, 4.18, 1.81]
#     }
# }

cards_info = {
    "credit_cards": {
        "匯豐 匯鑽卡": {"優惠項目":"aaa","國內消費":"aaa","國內消費":"aaa"},
        "台新 @GoGo 卡": {"優惠項目":"bbb"},
        "滙豐 現金回饋御璽卡": {"優惠項目":"ccc"},
        "永豐 現金回饋 Green 卡": {"優惠項目":"ddd"},
        "台新 玫瑰Giving卡": {"優惠項目":"eee"},
        "國泰世華 CUBE 卡": {"優惠項目":"fff"},
        "聯邦 吉鶴卡": {"優惠項目":"ggg"},
        "富邦 J 卡": {"優惠項目":"hhh"},
        "台新 FlyGo卡": {"優惠項目":"iii"},
        "第一銀行 icash 聯名卡": {"優惠項目":"jjj"}
    },
    "finance_cards": {
        "將來 將將卡": {"優惠項目":"kkk"},
        "台新 遛狗卡": {"優惠項目":"lll"},
        "玉山 Pi 拍兔簽帳金融卡": {"優惠項目":"mmm"},
        "LINE Bank 快點卡": {"優惠項目":"nnn"},
        "永豐大戶DAWHO現金回饋Debit卡": {"優惠項目":"ooo"},
        "中信 LINE Pay 金融卡": {"優惠項目":"ppp"},
        "玉山家樂福悠遊簽帳金融卡": {"優惠項目":"qqq"},
        "王道銀行 O-Bank簽帳金融卡": {"優惠項目":"rrr"},
        "國泰一卡通簽帳金融卡": {"優惠項目":"sss"},
        "兆豐 Visa 金融卡": {"優惠項目":"ttt"}
    }
}

import mysql.connector
import json
def get_rc_data():
# 建立資料庫連線
    cnx = mysql.connector.connect(user='cardcardsone', 
                                password='cardsone2024',
                                host='184.73.84.91',
                                database='cardsoneDB',
                                charset='utf8mb4')
    cursor = cnx.cursor()

    # 執行SQL查詢
    query = "SELECT * FROM recommend_data"
    cursor.execute(query)

    # 擷取查詢結果
    data = cursor.fetchall()

    # 關閉游標和連線
    cursor.close()
    cnx.close()

    # 轉換為JSON格式
    cards_all_features = [{
        "cid": row[0],
        "type": row[1],
        "name": row[2],
        "basic_rewards": float(row[3]),
        "additional_benefits": float(row[4]),
        "overseas_spending": float(row[5]),
        "online_shopping_discounts": float(row[6]),
        "mobile_payment": float(row[7]),
        "commute_expenses": float(row[8]),
        "utilities_payment": float(row[9]),
        "food_delivery": float(row[10]),
        "entertainment": float(row[11]),
        "travel_booking": float(row[12]),
        "department_stores": float(row[13])
    } for row in data]

    # global cards_features
    cards_features = {
        'credit_cards': {},
        'debit_cards': {}
    }
    
    for card in cards_all_features:
        if card["type"]=="credit_card":
            card_name = card["name"]
            card_values = [
                card["basic_rewards"],
                card["additional_benefits"],
                card["overseas_spending"],
                card["online_shopping_discounts"],
                card["mobile_payment"],
                card["commute_expenses"],
                card["utilities_payment"],
                card["food_delivery"],
                card["entertainment"],
                card["travel_booking"],
                card["department_stores"]
            ]
            cards_features['credit_cards'][card_name] = card_values
        elif card["type"]=="debit_card":
            card_name = card["name"]
            card_values = [
                card["basic_rewards"],
                card["additional_benefits"],
                card["overseas_spending"],
                card["online_shopping_discounts"],
                card["mobile_payment"],
                card["commute_expenses"],
                card["utilities_payment"],
                card["food_delivery"],
                card["entertainment"],
                card["travel_booking"],
                card["department_stores"]
            ]
            cards_features['debit_cards'][card_name] = card_values
        else:
            print(f"card_type: {card['type']}")
    
    all_cards = {**cards_features["credit_cards"], **cards_features["debit_cards"]}
        
    return cards_features, all_cards
    
#get_rc_data()
    
    


    


    
    # 使用 for 循环打印出每张卡的名称和对应的数据数组
    #cards_dict={'credit_cards':{},'finance_cards':{}}
    # cards_features = {}
    # for card in cards_all_features:
    #     if card["type"]=="credit_card":
    #         card_name = card["name"]
    #         card_values = [
    #             card["basic_rewards"],
    #             card["additional_benefits"],
    #             card["overseas_spending"],
    #             card["online_shopping_discounts"],
    #             card["mobile_payment"],
    #             card["commute_expenses"],
    #             card["utilities_payment"],
    #             card["food_delivery"],
    #             card["entertainment"],
    #             card["travel_booking"],
    #             card["department_stores"]
    #         ]
    #         cards_features['credit_cards'][card_name] = card_values
    
    # return cards_features
