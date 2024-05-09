
// 載入 express 模組 port根據live server環境變數 http://localhost:{port}
const express = require('express');
const app = express();
const port = process.env.PORT || 5500; // 使用環境變數或默認5500
const path = require('path');

// 設置跨域請求頭
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
  });
  
  // 告訴 Express 使用當前目錄下的 public 文件夾作為靜態資源目錄
  app.use(express.static(path.join(__dirname, 'public')));
  
  // 處理根路徑請求，發送 JSON 文件到客戶端
  app.get('../../bankdata/CreditCardComparison.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'CreditCardComparison.json'));
  });
  
  // 啟動服務器
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });



function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${name}=`)) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    return '';
}



// 全局變量初始化
var cardData = [];


function loadBankData() {
    fetch('../../bankdata/CreditCardComparison.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            cardData = data.cards;
            initializeDropdown();
            const selectedCardNames = getCookie('selectedCards');
            if (selectedCardNames) {
                updatePageWithSelectedCards(selectedCardNames);
            }
        })
        .catch(error => {
            console.error('Error loading bank data:', error);
        });
}


function initializeDropdown() {
    const cardSelects = document.querySelectorAll('.card-select');
    cardSelects.forEach((select, index) => {
        cardData.forEach(card => {
            const option = document.createElement('option');
            option.value = card.name;
            option.textContent = card.name;
            select.appendChild(option);
        });
        select.addEventListener('change', () => {
            updateCard(index + 1, select.value);
        });
    });
}
function updateCard(cardIndex, cardName) {
    // 解碼傳遞給函數的卡片名稱參數
    const decodedCardName = decodeURIComponent(cardName);
    const selectedCard = cardData.find(card => card.name === decodedCardName);
    if (selectedCard) {
        const cardImage = document.getElementById(`cardImage${cardIndex}`);
        cardImage.src = selectedCard.imagePath;
        const cardTitle = document.getElementById(`cardTitle${cardIndex}`);
        cardTitle.textContent = selectedCard.name; // 更新卡片標題
        // 更新表格數據
        document.getElementById(`bankName${cardIndex}`).textContent = selectedCard.bankname;
        document.getElementById(`basicReward${cardIndex}`).textContent = selectedCard['基本回饋'];
        document.getElementById(`additionalReward${cardIndex}`).textContent = selectedCard['加碼回饋'];
        document.getElementById(`overseasSpending${cardIndex}`).textContent = selectedCard['海外消費'];
        document.getElementById(`travelInsurance${cardIndex}`).textContent = selectedCard['旅遊保險'];
        document.getElementById(`interbankFee${cardIndex}`).textContent = selectedCard['跨行手續費'];
        document.getElementById(`firstPurchaseGift${cardIndex}`).textContent = selectedCard['首刷禮'];
        document.getElementById(`annualFee${cardIndex}`).textContent = selectedCard['年費'];
        document.getElementById(`cardFeatures${cardIndex}`).textContent = selectedCard['卡片特色'];
    } else {
        console.error('Selected card not found:', cardName);
    }
}

function updatePageWithSelectedCards(selectedCardNames) {
    // 分割所選信用卡名稱為一個數組
    const selectedCards = selectedCardNames.split(',');

    // 獲取下拉選單元素
    const cardSelects = document.querySelectorAll('.card-select');

    // 遍歷每個下拉選單
    cardSelects.forEach((select, index) => {
        // 如果存在對應的選擇的卡片名稱
        if (index < selectedCards.length) {
            const cardName = selectedCards[index];
            const selectedCard = cardData.find(card => card.name === cardName);

            // 更新下拉選單的選中值
            select.value = cardName;

            // 更新卡片圖片和標題
            const cardImage = document.getElementById(`cardImage${index + 1}`);
            const cardTitle = document.getElementById(`cardTitle${index + 1}`);
            if (selectedCard) {
                cardImage.src = selectedCard.imagePath;
                cardTitle.textContent = selectedCard.name;
            }

            // 更新表格數據
            updateCard(index + 1, cardName);
        }
    });
}

// 頁面載入完成後，調用 loadBankData 函數
document.addEventListener('DOMContentLoaded', loadBankData);

// 獲取查詢參數中的所選信用卡名稱
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const selectedCardNames = urlParams.get('cards');

// 分割所選信用卡名稱為一個數組
const selectedCards = selectedCardNames.split(',');

// 可使用 selectedCards 數組中的每個信用卡名稱來更新頁面內容
selectedCards.forEach((cardName, i) => {
    const cardElement = document.getElementById(`card${i + 1}`); // 假设每個卡片的容器有一個 ID，例如 card1, card2, 等等。
    if (cardElement) {
        // 更新信用卡名稱或其他内容
        cardElement.textContent = cardName;
    }
});






