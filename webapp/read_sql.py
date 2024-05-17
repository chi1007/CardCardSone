import mysql.connector
import os
from mysql.connector import errorcode

password = os.getenv('mysql_pwd')
try:
  cnx = mysql.connector.connect(user='root',password= password,
                                host='127.0.0.1',database='test1')
  
  print('connected successfully')
  if cnx.is_connected():
        cursor = cnx.cursor()
        # 為現有的 1 到 12 筆資料更新 cardtype 值
        cardtypes = [
            'VISA, Mastercard, JCB',
            'JCB',
            'JCB',
            'Mastercard',
            'VISA, Mastercard, JCB',
            'JCB',
            'VISA',
            'Mastercard',
            'VISA',
            'VISA',
            'VISA, Mastercard',
            'Mastercard'
        ]
        for i in range(1, 13):
            cursor.execute("UPDATE creditcard SET cardtype = %s WHERE ccid = %s;", (cardtypes[i-1], i))
            cnx.commit()  # 確認更新
        print("Cardtype values updated successfully")
 





except mysql.connector.Error as err:
  if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
    print("Something is wrong with your user name or password")
  elif err.errno == errorcode.ER_BAD_DB_ERROR:
    print("Database does not exist")
  else:
    print(err)
else:
  cnx.close()