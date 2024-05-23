from flask import Flask, render_template, request
import requests
import numpy as np
from rc_data import cards_features, cards_info
from flask import Blueprint
from database import database_blueprint, get_data

rc_app_blueprint = Blueprint('rc_app', __name__)

# 計算距離並找出最接近的卡片（考慮用戶填答和卡別偏好）
def find_closest_cards(user_vector, cards):
    distances = {}
    user_features = user_vector[1:]  # 忽略第1題(卡別偏好)
    user_vector_norm = user_features / np.linalg.norm(user_features)  # 將使用者重視程度的向量歸一化為單位向量

    for card, features in cards.items():
        card_vector = np.array(features)
        card_vector_norm = card_vector / np.linalg.norm(card_vector)  # 將卡片特徵向量歸一化為單位向量
               
        dist = np.linalg.norm(card_vector_norm - user_vector_norm)  # 計算歐氏距離
        distances[card] = dist

    sorted_distances = sorted(distances.items(), key=lambda x: x[1]) # 根據歐氏距離排序
    return sorted_distances[:3] # 推薦距離最近的3張卡片

def get_data(api_route):
    response = requests.get(api_route)
    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to retrieve data from API:", response.status_code)
        return []

@rc_app_blueprint.route("/", methods=["GET", "POST"])
def index():
    # 获取问题数据
    questions = get_data('http://127.0.0.1:5000/database/questions')
    
    card_type = ""
    usercards_info = {}

    if request.method == "POST":
        # 获取用户提交的答案
        answers = [int(request.form[f"q{i}"]) for i in range(len(questions))]
        print(answers)
        card_type_preference = int(request.form["q0"])
        if card_type_preference == 1:
            card_type = "credit_cards"
            cards = cards_features["credit_cards"]
        elif card_type_preference == 3:
            card_type = "finance_cards"
            cards = cards_features["finance_cards"]
        elif card_type_preference == 2:
            card_type = "all_cards"
            cards = {**cards_features["credit_cards"], **cards_features["finance_cards"]}
        else:
            raise ValueError("Invalid card type preference")
        
        closest_cards = find_closest_cards(answers, cards)

        for card in closest_cards:
            if card_type_preference == 1:
                usercards_info[card[0]] = cards_info["credit_cards"][card[0]]
            elif card_type_preference == 3:
                usercards_info[card[0]] = cards_info["finance_cards"][card[0]]
            elif card_type_preference == 2:
                if card[0] in cards_features["credit_cards"]:
                    usercards_info[card[0]] = cards_info["credit_cards"][card[0]]
                elif card[0] in cards_features["finance_cards"]:
                    usercards_info[card[0]] = cards_info["finance_cards"][card[0]]

        return render_template("recommend_result.html", closest_cards=closest_cards, usercards_info=usercards_info)
    else:
        return render_template("preference_question.html", questions=questions)

# if __name__ == "__main__":
#     rc_app_blueprint.run(debug=True)