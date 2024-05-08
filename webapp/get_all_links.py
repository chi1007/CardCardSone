from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
import re
import time
import pandas as pd
def get_all_links(url):
    
    s = Service("/Users/zoe/Desktop/AI與大數據應用開發實戰養成班/爬蟲/selenium介紹/chromedriver") #change the path to where your chromedriver is located
    driver = webdriver.Chrome(service=s)
    driver.get(url)
    time.sleep(3) # Wait for the page to fully load
    soup = BeautifulSoup(driver.page_source, 'html.parser')  # parse the HTML
    driver.quit()  # Close the browser

    link_list=[] 
    new_link_list = [] 

    links = soup.find_all('a')
    for a_tag in links:
        link = a_tag.get('href')
        link_list.append(link)
        pattern = r'^https://roo\.cash/creditcard/info/%E' #the pattern of websites that we want
        if re.match(pattern, link) and link not in new_link_list and link is not None: # make sure it's not repeated and not none
            new_link_list.append(link) 
    
    print('連結：' + str(len(new_link_list))) #show links amount

    return new_link_list





url = 'https://roo.cash/creditcard/recommendation' #target website
new_link_list = get_all_links(url)
print(new_link_list)