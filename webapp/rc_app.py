from flask import Flask, render_template, request
import requests
import numpy as np
from rc_data import get_rc_data
from flask import Blueprint
from database import database_blueprint, get_data
import openai

# 初始化API金鑰
openai.api_key = 'sk-proj-vXwqJ0vrfQJFSl0avB3ET3BlbkFJtBPsnVuRmDVORicdjQAc'
opeaichat_url = 'https://api.openai.com/v1/chat/completions'
openaispeech_url = 'https://api.openai.com/v1/audio/speech'

# 定義Blueprint
rc_app_blueprint = Blueprint('rc_app', __name__)

def get_data(api_route):
    response = requests.get(api_route)
    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to retrieve data from API:", response.status_code)
        return []
    
# 獲取卡片特徵數據
cards_features, recommend_card_all = get_rc_data()

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
        
    sorted_distances = sorted(distances.items(), key=lambda x: x[1])  # 根據歐氏距離排序
    return sorted_distances[:3]  # 推薦距離最近的3張卡片

# 定義路由
@rc_app_blueprint.route("/", methods=["GET", "POST"])
def index():
    questions = get_data('http://127.0.0.1:5000/database/questions')
    cards = {}

    # 處理表單提交
    if request.method == "POST":
        answers = [int(request.form[f"q{i}"]) for i in range(len(questions))]
        card_type_preference = int(request.form["q0"])
        if card_type_preference == 1:
            cards = cards_features["credit_cards"]
        elif card_type_preference == 3:
            cards = cards_features["debit_cards"]
        elif card_type_preference == 2:
            cards = {**cards_features["credit_cards"], **cards_features["debit_cards"]}
        else:
            raise ValueError("Invalid card type preference")
        
        closest_cards = find_closest_cards(answers, cards)

        # 找出最接近的3張卡片的名稱
        closest_card_names = [card[0] for card in closest_cards]
        
        # 找到對應的卡片詳細資料並按順序排列
        recommended_cards = [card for name in closest_card_names for card in recommend_card_all if card["name"] == name]
                
        # 組合消費者行為分析的提示
        prompt = "Based on the following answers and recommended cards information, please analyze the user's consumption habits and provide suggestions:\n"
        for i, answer in enumerate(answers):
            prompt += f"{questions[i]}: {answer}\n"
        for card in recommended_cards:
            prompt += f"Recommended Card: {card['name']} - Features: {card['tag']}, {card['basic_rewards']}, {card['additional_benefits']}, {card['overseas_spending']}, {card['online_shopping_discounts']}, {card['mobile_payment']}, {card['commute_expenses']}, {card['utilities_payment']}, {card['food_delivery']}, {card['entertainment']}, {card['travel_booking']}, {card['department_stores']}\n"

        # 使用OpenAI API進行分析
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "你是一個專業的消費習慣分析師，請根據使用者的消費習慣與卡片資訊進行綜合分析並提供個人化的有效建議，項目編號自動分段換行。"},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,
            n=1,
            stop=None,
            temperature=0.7,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0,
            
            
        )
        
        # 獲取分析結果
        user_analysis = response.choices[0].message['content']

        return render_template("recommend_result.html", closest_cards=closest_cards, recommended_cards=recommended_cards, user_analysis=user_analysis)
    else:
        return render_template("preference_question.html", questions=questions)

# 註冊Blueprint到主應用
app = Flask(__name__)
app.register_blueprint(rc_app_blueprint, url_prefix='/rc_app')

if __name__ == "__main__":
    app.run(debug=True)
