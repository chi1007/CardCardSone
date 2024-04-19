from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
import time
import pandas as pd
import re

def get_source(url): # get the source code of the website
    try:
        s = Service("/Users/zoe/Desktop/AI與大數據應用開發實戰養成班/爬蟲/selenium介紹/chromedriver")
        driver = webdriver.Chrome(service=s)
        driver.get(url)
        time.sleep(3)  # Wait for the page to fully load
        soup = BeautifulSoup(driver.page_source, 'html.parser') # parse the HTML
        driver.quit()  # Close the browser
    except Exception as e:
        print(f"Error occurred while getting source for {url}: {e}")
        return None
    return soup

data_dict = {'name':[],'img':[],'link':[],'features':[],'type':[],'description':[],'new_user_offer':[],'basic_offer':[],'rights':[],'website':[]}
def get_card_info(url, data_dict):

    soup = get_source(url)  # call the get_source function to get the source code of the website
    print(soup.prettify())
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
    new_user_offers_tag = soup.find('div', attrs={'data-type': 'welcome-offer'})
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
        bo_contents = basic_offers_tag.find_all('p')
        basic_offers = []
        for bo_title, bo_content in zip(bo_titles, bo_contents):
            bo_title_text = bo_title.text.strip()
            bo_content_text = bo_content.text.strip().replace('\n', '')
            basic_offer = f'{bo_title_text} : {bo_content_text}'
            basic_offers.append(basic_offer)
        data_dict['basic_offer'].append(', '.join(basic_offers))
    else:
        data_dict['basic_offer'].append("")

    # Get rights
    rights_tag = soup.find('div', attrs={'class': 'responsibilities-and-rights'})
    if rights_tag:
        rights_titles = rights_tag.find_all('h3')
        rights_contents = rights_tag.find('span',attrs={'class':'text-NRooBlue-100 pb-5'})
        rights_contents = rights_contents.find_all('p')
        for rights_title, rights_content in zip(rights_titles, rights_contents):
            rights_title_text = rights_title.text.strip()
            rights_content_text = rights_content.text.strip().replace('\n', '')
            right = f'{rights_title_text} : {rights_content_text}'
            rights.append(right)
        data_dict['rights'].append(', '.join(rights))
    else:
        data_dict['rights'].append("")


    # get website
    website_tag = soup.find('div', attrs={'class': 'card-btn'})
    website = website_tag.get('data-link') if website_tag else ""
    data_dict['website'].append(website)

    return data_dict

links = ['https://roo.cash/creditcard/info/%E5%9C%8B%E6%B3%B0%E4%B8%96%E8%8F%AFCUBE%E5%8D%A1-cub-cube', 'https://roo.cash/creditcard/info/%E6%BB%99%E8%B1%90%E5%8C%AF%E9%91%BD%E5%8D%A1%E9%96%8B%E6%88%B6%E5%B0%88%E6%A1%88-hsbc-diamond-DAO', 'https://roo.cash/creditcard/info/%E8%81%AF%E9%82%A6%E5%90%89%E9%B6%B4%E5%8D%A1-union-jiho']
for link in links:
    get_card_info(link,data_dict)

df = pd.DataFrame(data_dict)
print(df)
'''
def get_card_info(url,data_dict):

    soup = get_source(url) # call the get_source function to get the source code of the website
    # get cardn name, image, and link
    info = soup.find('div',attrs={'id':'information'})
    name = info.find('h2').text.strip() if info else ""
    img = info.find('img').get('src')  if info else ""
    link = url
    # append to the dictionary
    data_dict['name'].append(name or "")
    data_dict['img'].append(img or "")
    data_dict['link'].append(link or "")

    # get card description, features, and type
    description = soup.find('div',attrs={'id':'aboutCard'})
    description = description.text.strip() if description else ""
    data_dict['description'].append(description or "")

    features = soup.find_all('div',attrs={'class':'flex mb-2'})
    for feature in features:
        feature = feature.text.strip().replace('\n','')
    data_dict['features'].append(feature or "")
    
    types = soup.find('div',attrs={'class':'flex flex-wrap text-sm'})
    types = types.find_all('p')
    for type in types:
        type = type.text.strip()
    data_dict['type'].append(type or "")

    #get new user offer and basic offer
    new_user_offers_tag = soup.find('div',attrs={'data-type':'welcome-offer'})
    nuo_title = new_user_offers_tag.find_all('h3')
    nuo_content = new_user_offers_tag.find_all('ul', class_='list-disc')
    for nuo_title,nuo_content in zip(nuo_title,nuo_content): # zip is to iterate over multiple lists simultaneously
        nuo_title = nuo_title.text.strip()
        nuo_content = nuo_content.text.strip().replace('\n','')
        new_user_offer = nuo_title +' : '+ nuo_content
    data_dict['new_user_offer'].append(new_user_offer or "")

    basic_offers_tag = soup.find('div',attrs={'data-type':'basic-offer'})
    bo_title = basic_offers_tag.find_all('h3')
    bo_content = basic_offers_tag.find_all('p')
    for bo_title,bo_content in zip(bo_title,bo_content):
        bo_title = bo_title.text.strip()
        bo_content = bo_content.text.strip().replace('\n','')
        basic_offer = bo_title +' : '+ bo_content
    data_dict['basic_offer'].append(basic_offer or "")

    # get rights and website
    rights_tag = soup.find('div',attrs={'class':'responsibilities-and-rights'})
    rights_title = rights_tag.find_all('h3')
    rights_content = rights_tag.find_all('p')
    for rights_title,rights_content in zip(rights_title,rights_content):
        r_title = r_title.text.strip()
        r_content = r_content.text.strip().replace('\n','')
        right = r_title +' : '+ r_content
    data_dict['rights'].append(right or "")

    website_tag = soup.find('div',attrs={'class':'card-btn'})
    if website_tag:
        website = website_tag.get('data-link') or ""
        data_dict['website'].append(website)
    else:
        data_dict['website'].append("")

'''