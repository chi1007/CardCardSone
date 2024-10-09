import mysql.connector
import json
def get_rc_data():
    try:
        # 建立資料庫連線
        cnx = mysql.connector.connect(user='cardcardsone',
                                      password='cardsone2024',
                                      host='54.160.176.92',
                                      database='cardsoneDB',
                                      collation='utf8mb4_unicode_ci')
        cursor = cnx.cursor()

        # 執行SQL查詢
        query1 = "SELECT * FROM recommend_data"
        cursor.execute(query1)
        recommend_data = cursor.fetchall()

        query2 = "SELECT * FROM recommend_card"
        cursor.execute(query2)
        recommend_card = cursor.fetchall()

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
            "utilities_payment": (row[9]),
            "food_delivery": float(row[10]),
            "entertainment": float(row[11]),
            "travel_booking": float(row[12]),
            "department_stores": float(row[13]),
            "img":row[14]

        } for row in recommend_data]

        cards_features = {
            'credit_cards': {},
            'debit_cards': {}
        }

        for card in cards_all_features:
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
            if card["type"] == "credit_card":
                cards_features['credit_cards'][card_name] = card_values
            elif card["type"] == "debit_card":
                cards_features['debit_cards'][card_name] = card_values
            else:
                print(f"card_type: {card['type']}")
        
        # 轉換為JSON格式
        recommend_card_all = [{
            "rc_id": row[0],
            "name": row[1],
            "bankname": row[2],
            "card_type": row[3],
            "tag": row[4],
            "basic_rewards": row[5],
            "additional_benefits": row[6],
            "overseas_spending": row[7],
            "online_shopping_discounts": row[8],
            "mobile_payment": row[9],
            "commute_expenses": row[10],
            "utilities_payment": row[11],
            "food_delivery": row[12],
            "entertainment": row[13],
            "travel_booking": row[14],
            "department_stores": row[15],
            "type": row[16],
            "website": row[17],
            "img": row[18]
        } for row in recommend_card]
        
        return cards_features, recommend_card_all

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

    finally:
        # 確保關閉游標和連線
        if cursor:
            cursor.close()
        if cnx:
            cnx.close()
