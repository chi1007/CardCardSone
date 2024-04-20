from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
import time
import pandas as pd
import re
import sqlite3
import json
def get_all_links(target_link): #get all card links
    
    s = Service("/Users/zoe/Desktop/AI與大數據應用開發實戰養成班/爬蟲/selenium介紹/chromedriver") #change the path to where your chromedriver is located
    driver = webdriver.Chrome(service=s)
    driver.get(target_link)
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

target_link = 'https://roo.cash/creditcard/recommendation' #target website
#new_link_list = get_all_links(target_link)
#print(new_link_list)
#=====================
def get_source(url): # get the source code of the website
    try:
        s = Service("/Users/zoe/Desktop/AI與大數據應用開發實戰養成班/爬蟲/selenium介紹/chromedriver")
        driver = webdriver.Chrome(service=s)
        driver.get(url)
        time.sleep(3)  # Wait for the page to fully load
        soup = BeautifulSoup(driver.page_source, 'html.parser') # parse the HTML
        driver.quit()  # Quit the browser
    except Exception as e:
        print(f"Error occurred while getting source for {url}: {e}")
        return None
    return soup
#=====================
data_dict = {'name':[],'img':[],'link':[],'features':[],'type':[],'description':[],'new_user_offer':[],'basic_offer':[],'rights':[],'website':[]}
def get_card_info(url, data_dict):

    soup = get_source(url)  # call the get_source function to get the source code of the website
    # get card name, image, and link
    info = soup.find('div', attrs={'id': 'information'})
    name = info.find('h2').text.strip() if info else ""
    img = info.find('img').get('src') if info else ""
    link = url

    # append to the dictionary
    data_dict['name'].append(name)
    data_dict['img'].append(img)
    data_dict['link'].append(link)

    # get card description, features, and type
    description_tag = info.find('div', attrs={'id': 'aboutCard'})
    description = description_tag.text.strip() if description_tag else ""
    data_dict['description'].append(description or "")

    features_tags = soup.find_all('div', attrs={'class': 'flex mb-2'})
    features = ", ".join([feature.text.strip().replace('\n', '') for feature in features_tags])
    data_dict['features'].append(features or "")

    types_tag = soup.find('div', attrs={'class': 'flex flex-wrap text-sm'})
    types = ", ".join([type_tag.text.strip() for type_tag in types_tag.find_all('p')]) if types_tag else ""
    data_dict['type'].append(types or "")

    # Get new user offer
    new_user_offers_tag = soup.find('div', attrs={'class': 'new-user-offers mb-3'})
    if new_user_offers_tag:
        nuo_titles = new_user_offers_tag.find_all('h3')
        nuo_contents = new_user_offers_tag.find_all('ul', class_='list-disc')
        new_user_offers = []
        for nuo_title, nuo_content in zip(nuo_titles, nuo_contents):
            nuo_title_text = nuo_title.text.strip()
            nuo_content_text = nuo_content.text.strip().replace('\n', '')
            new_user_offer = f'{nuo_title_text} : {nuo_content_text}'
            new_user_offers.append(new_user_offer)
        data_dict['new_user_offer'].append(', '.join(new_user_offers))
    else:
        data_dict['new_user_offer'].append("")

    # Get basic offer
    basic_offers_tag = soup.find('div', attrs={'class': 'basic-offers mb-3'})
    if basic_offers_tag:
        bo_titles = basic_offers_tag.find_all('h3')
        bo_contents = basic_offers_tag.find_all('ul', class_='list-disc')
        
        basic_offers = []
        for bo_title, bo_content in zip(bo_titles, bo_contents):
            bo_title_text = bo_title.text.strip()
            bo_content_texts = [item.text.strip() for item in bo_content.find_all('li')]
            bo_content_text = ', '.join(bo_content_texts)
            basic_offer = f'{bo_title_text}: {bo_content_text}'
            basic_offers.append(basic_offer)
        data_dict['basic_offer'].append(', '.join(basic_offers))
    else:
        data_dict['basic_offer'].append("")

    # Get rights
    rights_tag = soup.find('div', attrs={'class': 'responsibilities-and-rights'})
    if rights_tag:
        rights_titles = rights_tag.find_all('h3')
        rights_contents = rights_tag.find('span',attrs={'class':'text-NRooBlue-100 pb-5'})
        
        rights = []
        for rights_title, rights_content in zip(rights_titles, rights_contents):
            rights_title_text = rights_title.text.strip()
            rights_content_text = [item.text.strip() for item in rights_contents]
            right = f'{rights_title_text} : {rights_content_text}'
            rights.append(right)
        data_dict['rights'].append(', '.join(rights))
    else:
        data_dict['rights'].append("")


    # get website
    website_tag = soup.find('div', attrs={'class': 'ctabtn font-medium flex-grow cursor-pointer whitespace-nowrap rounded-md bg-NRooOrange-120 hover:bg-NRooOrange-140 text-white text-lg text-center px-7 py-4 ml-3 md:ml-5 lg:w-full w-fit max-w-80'})
    website = website_tag.get('data-link') if website_tag else ""
    data_dict['website'].append(website)

    return data_dict

def save_to_database(data_dict):
    df = pd.DataFrame(data_dict)
    # Connect to SQLite database
    conn = sqlite3.connect('card_data.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS credit_card(
                        name TEXT,
                        img TEXT,
                        link TEXT,
                        feature TEXT,
                        type TEXT,
                        description TEXT,
                        new_user_offer TEXT,
                        basic_offer TEXT,
                        rights TEXT,
                        website TEXT
                    )''')
    #using insert or ingore to avoid duplicate data or be overwritten
    df.to_sql('credit_card', conn, if_exists='append',index=False, method='multi') 
    conn.close()

links = get_all_links(target_link)
#links = ['https://roo.cash/creditcard/info/%E5%9C%8B%E6%B3%B0%E4%B8%96%E8%8F%AFCUBE%E5%8D%A1-cub-cube', 'https://roo.cash/creditcard/info/%E6%BB%99%E8%B1%90%E5%8C%AF%E9%91%BD%E5%8D%A1%E9%96%8B%E6%88%B6%E5%B0%88%E6%A1%88-hsbc-diamond-DAO', 'https://roo.cash/creditcard/info/%E8%81%AF%E9%82%A6%E5%90%89%E9%B6%B4%E5%8D%A1-union-jiho']
for link in links:
    get_card_info(link,data_dict)
save_to_database(data_dict)


#df = pd.DataFrame(data_dict)
#print(df)