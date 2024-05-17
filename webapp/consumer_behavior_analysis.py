from flask import Flask, render_template, request
import openai
import json

app = Flask(__name__, template_folder='templates')

# OpenAI API 访问密钥
openai.api_key = 'sk-proj-eLTLLKES9xIgNyXiJjnxT3BlbkFJJoEOeNgGgqBmZv8HWv8J'
opeaichat_url = 'https://api.openai.com/v1/chat/completions'
openaispeech_url = 'https://api.openai.com/v1/audio/speech'

def load_credit_cards():
    with open('data/credit_cards.json', 'r', encoding='utf-8') as file:
        credit_cards = json.load(file)
    return credit_cards

credit_cards = load_credit_cards()

@app.route('/consumer_behavior_analysis', methods=['GET', 'POST'])
def consumer_behavior_analysis():
    if request.method == 'GET':
        # 第一次來，返回表單頁面
        return render_template('consumer_behavior_form.html')
    else:
        # POST 方法，接收前端表單數據
        income = request.form['income']
        expenses = request.form['expenses']
        overseas_spending = request.form.get('overseas_spending')
        impulsive_spending = request.form.get('impulsive_spending')  # 用戶是否為衝動性消費者
        user_query = request.form.get('user_query')  # 接收用戶的查詢問題

        # 數據驗證
        if not income.isdigit() or not (4 <= len(income) <= 7):
            # 如果平均月花費不是整數或不在指定範圍內，返回錯誤信息
            return "錯誤：平均月花費只能是 4 位數以上 7 位數以下的整數。"

        # 平時花費最多的地方只能輸入熟悉的商品類別
        valid_expenses_categories = [
            '美妝', '旅遊', '生活用品', '餐廳', '電影院', '娛樂', '家具', '3C產品', '服飾', '書籍', 
            '電子產品', '食物', '寵物用品', '其他', '運動器材', '藝術品', '醫療保健', '教育', '園藝', 
            '交通', '飲料', '雜貨', '汽車配件', '寶寶用品', '辦公用品', '家庭清潔', '香水', '酒類', 
            '烘焙用品', '水果', '肉類', '海鮮', '宗教用品', '攝影器材'
        ]

        if expenses not in valid_expenses_categories:
            return "錯誤：平時花費最多的地方只能輸入熟悉的商品類別，如美妝、旅遊、電子產品等。"

        if overseas_spending not in ['domestic', 'international']:
            return "錯誤：是否海外消費只能選擇其中一個選項。"

        # 根據用戶數據選擇合適的信用卡
        if expenses in ['旅遊', '電子產品']:
            card_key = 'travel' if overseas_spending == 'international' else 'shopping'
        else:
            card_key = 'general'

        card = credit_cards.get(card_key, credit_cards['general'])

        prompt = f"根據您的消費習慣，推薦您使用{card['name']}。\n"
        prompt += f"平時一個月預算花費約：{income} 台幣，主要用於{expenses}。\n"
        prompt += f"{'進行' if overseas_spending == 'international' else '不進行'}跨國交易，"
        prompt += f"並且{'屬於' if impulsive_spending == '是' else '不屬於'}衝動性消費者。\n"
        prompt += "請基於這些信息提供一些個性化的財務建議。"

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        # 獲取 OpenAI 的回復
        ai_message = response.choices[0].message.content.strip()

        # 將 OpenAI 的回復返回給前端
        return render_template('index.html', user_message=prompt, ai_message=ai_message, card=card)

if __name__ == '__main__':
    app.run(debug=True)
