#packages Golbal variable(全域變數)
companyName="中華電信"

#openai apikey Global 變數
openai_key='sk-proj-WIfyNyE08EC68IMeN5RdT3BlbkFJqdKxfu6o8Z5MNXyoxd'
opeaichat_url='https://api.openai.com/v1/chat/completions'
openaispeech_url='https://api.openai.com/v1/audio/speech'

#format 採用%s 填入字串
prompt='有一個問題:"%s"，請回覆問題採用JSON格式，格式如後:{"question":問題,"ans":[條列答案清單]}'



#設定一個Global 常數(內容不可變) 建構一個Flask物件
#定義函數
def sayHello():
    return "您好 世界和平";

