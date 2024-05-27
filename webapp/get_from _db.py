import sqlite3

conn = sqlite3.connect('card_data.db')
c = conn.cursor()
query = "SELECT * FROM credit_card WHERE youth = 1;"
results = c.execute(query).fetchall()  
print(results)
