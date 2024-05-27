FROM python:3.12-slim

ENV APP /app
ENV PYTHONUNBUFFERED 1 # python 執行訊息重新顯示到標準輸出

RUN mkdir $APP
WORKDIR $APP

EXPOSE 5000

COPY ./env/flask/requirements.txt .

RUN /usr/local/bin/python -m pip install --upgrade pip && pip3 install -r requirements.txt

COPY ./webapp/ ./

CMD [ "uwsgi", "--ini", "app.ini" ]