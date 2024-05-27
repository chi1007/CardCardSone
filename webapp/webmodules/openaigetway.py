#串接openai api
#引用requests模組
import requests #Http Client模組
#引用openai api Global變數(自訂套件package定義的變數)
from webmodules import openai_key,opeaichat_url,prompt,openaispeech_url
import json
#提供函數讓應用呼叫
def openaiChat(question):
    #串接openai api
    #Request 串接的Headers
    myHeaders={
        'Content-Type':'application/json',
        'Authorization':f'Bearer {openai_key}' #採用auth2 驗證方式
    }
    #傳過去的資料 json文件格式(採用dict物件建立 再來序列化成json string)
    #整理Prompt
    myPrompt=prompt % (question)
    myData={
     "model": "gpt-3.5-turbo",
     "messages": [{"role": "user", "content":myPrompt}],
     "temperature": 0.7
   }
    #正式提出請求Request 一個回應
    response=requests.post(opeaichat_url,headers=myHeaders,json=myData)
    #取得回應的資料
    result=response.json() #dict物件
    #進行資料處理在回應給應用系統(dict['choices'][0]['message']['content'])
    ans=result['choices'][0]['message']['content'] #str 字串物件
    #json 模組 再將字串反序列化成dict物件
    ansObject=json.loads(ans)
    print(ansObject)
    return ansObject

#傳遞進來文字檔 轉換成語音檔案
def textToSpeech(content,file):
    data={
        "model": "tts-1",
        "input": content,
        "voice": "nova",
        "response_format": "mp3"
        }
    #Request Headers(Authorization Content-Type)
    myHeaders={
        'Content-Type':'application/json',
        'Authorization':"Bearer %s" % (openai_key)}
    #Request 串接
    response=response=requests.post(openaispeech_url,headers=myHeaders,json=data) 
    isOk=False
    if response.status_code==200:
        #一邊讀取一邊寫到磁碟檔案去 
        with open(f'static/audio/{file}.mp3','wb') as f:
            f.write(response.content)
        isOk=True
        
    return isOk        


    