// 載入 express 模組 port根據live server環境變數 http://localhost:{port}
const express = require('express');
const app = express();
const port = process.env.PORT || 5500; // 使用環境變量或默認值
const path = require('path');

// 跨域設置，應該在其他中間件前設置
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
  });
  
// 使用當前目錄下的 public 文件夾作為靜態資源目錄
app.use(express.static(path.join(__dirname, 'public')));

// 處理根路徑請求，發送 JSON 文件到客戶端
app.get('/bankdata/CreditCardComparison.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'CreditCardComparison.json'));
});

app.get('/bankdata/creditcard_desc.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'creditcard_desc.json'));
});


// 啟動服務器
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    });




document.addEventListener('DOMContentLoaded', function () {
    processUrlParams();
});

function processUrlParams() {  
    // 獲取 URL 參數
    const urlParams = new URLSearchParams(window.location.search);
    const cardName = urlParams.get('cardName');

    // 如果沒有找到卡片名稱參數,則退出函數
    if (!cardName) {
        console.error('Card name parameter not found in URL.');
        return;
    }

    // 同時加載兩個 JSON 文件
    Promise.all([
        fetch('/bankdata/CreditCardComparison.json').then(response => response.json()),
        fetch('/bankdata/creditcard_desc.json').then(response => response.json())
    ]).then(data => {
        const cardsInfo = data[0]; // 第一個 JSON 文件數據
        const cardsDesc = data[1]; // 第二個 JSON 文件數據

        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML = ''; // 清空現有内容

        // 找到與 URL 參數中的卡片名稱匹配的卡片信息和描述
        const card = cardsInfo.find(card => card.name === cardName);
        const cardDesc = cardsDesc.find(desc => desc.name === cardName);

        // 如果找到匹配的卡片,則創建卡片元素並添加到容器中
        if (card && cardDesc) {
            const cardElement = createCardElement(card, cardDesc);
            cardsContainer.appendChild(cardElement);
        } else {
            console.error(`Card '${cardName}' not found in data.`);
        }
    }).catch(error => {
        console.error('Failed to load card data:', error);
    });
}

function createCardElement(card, cardDesc) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card-introduction';

    const header = document.createElement('header');
    const img = document.createElement('img');
    img.src = card.img;
    img.alt = `Image of ${card.name}`;
    img.className = 'card-image';
    header.appendChild(img);

    const cardName = document.createElement('h3');
    cardName.textContent = card.name;
    cardName.style.textAlign = 'center';  
    header.appendChild(cardName); 

    const details = document.createElement('div');
    details.className = 'card-details';

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    const tr = document.createElement('tr');
    const leftColumn = document.createElement('td');
    const rightColumn = document.createElement('td');

    const features = Object.keys(card).filter(key => key !== 'img' && key !== 'ccid' && key !== 'link' && key !== 'name' && key !== 'CreateDate');
    features.forEach((feature, index) => {
        const featureRow = document.createElement('tr');
        const th = document.createElement('th');
        th.textContent = translateFeature(feature);
        const td = document.createElement('td');
    
        // 檢查是否為'Website'特性，並未其創建一個按鈕
        if (feature === 'Website') {
            const websiteButton = document.createElement('button');
            websiteButton.textContent = 'Link';
            websiteButton.className = 'btn btn-primary'; // 添加Bootstrap樣式
            websiteButton.onclick = function() { window.open(card[feature], '_blank'); };
            td.appendChild(websiteButton);
        } else {
            td.textContent = card[feature];
        }
    
        featureRow.appendChild(th);
        featureRow.appendChild(td);
    
        if (index < 9) { // 表格左邊 放9項
            leftColumn.appendChild(featureRow);
        } else { // 表格右邊 
            rightColumn.appendChild(featureRow);
        }
    });
    

    tr.appendChild(leftColumn);
    tr.appendChild(rightColumn);
    tbody.appendChild(tr);
    table.appendChild(tbody);

    const description = document.createElement('div');
    description.className = 'card-description';
    const descHeader = document.createElement('h2');
    descHeader.textContent = '卡片詳細描述';
    const descParagraph = document.createElement('p');
    descParagraph.innerHTML = cardDesc.description.replace(/\n/g, '<br>');  // 使用 innerHTML 和 <br> 替換 \n
    description.appendChild(descHeader);
    description.appendChild(descParagraph);

    details.appendChild(table);
    wrapper.appendChild(header);
    wrapper.appendChild(details);
    wrapper.appendChild(description);

    return wrapper;

    
}





// 翻譯函數
function translateFeature(feature) {
    const featureTranslations = {
        'ccid': '信用卡ID',
        'name': '信用卡名稱',
        'bankname': '銀行名稱',
        'img': '信用卡圖片',
        'link': '信用卡介紹資料來源',
        'features': '特色',
        'type': '卡片類型',
        'basic_rewards': '基本回饋',
        'additional_benefits': '加碼優惠',
        'overseas_spending': '海外消費',
        'cross_bank_offers': '跨行優惠',
        'online_shopping_discounts': '網購優惠',
        'mobile_payment': '行動支付',
        'commute_expenses': '通勤交通',
        'utilities_payment': '生活繳費',
        'food_delivery': '餐飲外送',
        'entertainment': '影音娛樂',
        'trave_booking': '旅遊訂房',
        'department_stores': '量販百貨',
        'new_user_offer': '新戶優惠',
        'right': '年費',
        'revolving_interest_rate': '循環利率',
        'Website': '卡片官網'
    };
    return featureTranslations[feature] || feature;
}



