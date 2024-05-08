# 使用 Python 官方提供的 Docker 映像檔
FROM python:3.10-slim

# 設定工作目錄
WORKDIR /app

# 將本地端的 requirements.txt 複製到容器中
COPY requirements.txt .
RUN pip install -r requirements.txt

# 將本地端的 app.py 複製到容器中
COPY app.py .
COPY templates /app/templates
COPY static /app/static
COPY card_data.db .
# 開放端口號供外部連線
EXPOSE 8000

# 啟動 Flask 應用程式
#CMD ["flask", "--app", "app", "run", "--host=0.0.0.0", "--debug"]
CMD [ "python", "app.py" ]