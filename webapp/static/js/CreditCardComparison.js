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
  app.get('/bankdata/CreditCardComparison.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'CreditCardComparison.json'));
  });
  
  // 啟動服務器
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });

  document.addEventListener('DOMContentLoaded', function() {
    loadBankData();
    setupButtonToggle();
});



function getCookie(name) {
    const cookies = document.cookie.split(';');
    return cookies.reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        if (key === name) return decodeURIComponent(value);
        return acc;
    }, '');
}



// 全局變量初始化
var cardData = [];


function loadBankData() {
    fetch('/bankdata/CreditCardComparison.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error('Data is not an array');
            }
            cardData = data;
            initializeDropdown();
            const selectedCardNames = getCookie('selectedCards') || '';
            updatePageWithSelectedCards(selectedCardNames);
            toggleCardDisplayOnInit(selectedCardNames.split(',').length);
        })
        .catch(error => {
            console.error('Error loading bank data:', error);
        });
}

function toggleCardDisplayOnInit(numSelectedCards) {
    const cardColumn3 = document.getElementById('card-column-3');
    const bankNameHeader3 = document.getElementById('bankName3');
    const rows = document.getElementById('comparison-body').querySelectorAll('tr');
    const cardImage3 = document.getElementById('cardImage3'); // 確保此 ID 正確對應到第三張卡的圖片元素

    if (numSelectedCards < 3) {
        cardColumn3.style.display = 'none';
        bankNameHeader3.style.display = 'none';
        rows.forEach(row => {
            const thirdCell = row.querySelector('td:nth-child(4)');
            thirdCell.style.display = 'none';
        });
        cardImage3.src = '../static/image/icon/none.png'; // 更新圖片路徑為 "none" 圖標
    } else {
        // 確保在顯示第三張卡片時圖片路徑恢復或更新為正確的卡片圖像
        const selectedCard = cardData.find(card => card.name === cardImage3.getAttribute('data-card-name'));
        if (selectedCard) {
            cardImage3.src = selectedCard.imagePath;
        }
    }
}



function initializeDropdown() {
    const cardSelects = document.querySelectorAll('.card-select');
    if (!cardData || !Array.isArray(cardData)) {
        console.error('No card data available or card data is not an array');
        return;
    }
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
    // 在cardData數組中查找匹配的信用卡對象
    const selectedCard = cardData.find(card => card.name === cardName);
    if (selectedCard) {
        // 更新卡片圖片
        const cardImage = document.getElementById(`cardImage${cardIndex}`);
        cardImage.src = selectedCard.img; // 使用圖片URL更新圖片來源
        const cardTitle = document.getElementById(`cardTitle${cardIndex}`);
        cardTitle.textContent = selectedCard.name;

        // 更新卡片詳情表格數據
        document.getElementById(`bankName${cardIndex}`).textContent = selectedCard.bankname;
        document.getElementById(`basicReward${cardIndex}`).textContent = selectedCard.basic_rewards;
        document.getElementById(`additionalReward${cardIndex}`).textContent = selectedCard.additional_benefits;
        document.getElementById(`overseasSpending${cardIndex}`).textContent = selectedCard.overseas_spending;
        document.getElementById(`annualFee${cardIndex}`).textContent = selectedCard.right;
        document.getElementById(`cardFeatures${cardIndex}`).textContent = selectedCard.features;
        document.getElementById(`crossBankOffers${cardIndex}`).textContent = selectedCard.cross_bank_offers;
        document.getElementById(`onlineShoppingDiscounts${cardIndex}`).textContent = selectedCard.online_shopping_discounts;
        document.getElementById(`mobilePayment${cardIndex}`).textContent = selectedCard.mobile_payment;
        document.getElementById(`commuteExpenses${cardIndex}`).textContent = selectedCard.commute_expenses;
        document.getElementById(`utilitiesPayment${cardIndex}`).textContent = selectedCard.utilities_payment;
        document.getElementById(`foodDelivery${cardIndex}`).textContent = selectedCard.food_delivery;
        document.getElementById(`entertainment${cardIndex}`).textContent = selectedCard.entertainment;
        document.getElementById(`traveBooking${cardIndex}`).textContent = selectedCard.trave_booking;
        document.getElementById(`departmentStores${cardIndex}`).textContent = selectedCard.department_stores;
        document.getElementById(`newUserOffer${cardIndex}`).textContent = selectedCard.new_user_offer;
        // 創建連接按鈕
        const websiteLinkContainer = document.getElementById(`websiteLink${cardIndex}`);
        websiteLinkContainer.innerHTML = ''; // 清除之前的内容
        const linkButton = document.createElement('a'); // 創建一个連接元素
        linkButton.href = selectedCard.Website; // 設置link
        linkButton.textContent = '官方申辦'; 
        linkButton.className = 'btn btn-primary'; // 可以添加一些Bootstrap样式
        linkButton.target = '_blank'; 
        websiteLinkContainer.appendChild(linkButton); // 將連接添加到單元格中
    } else {
        console.error('Selected card not found:', cardName);
    }
}

function updatePageWithSelectedCards(selectedCardNames) {
    const selectedCards = selectedCardNames.split(',');
    const cardSelects = document.querySelectorAll('.card-select');
    cardSelects.forEach((select, index) => {
        if (index < selectedCards.length) {
            const cardName = selectedCards[index];
            select.value = cardName;
            updateCard(index + 1, cardName);
        }
    });
}


  
function toggleCardDisplay() {
    const cardColumn3 = document.getElementById('card-column-3');
    const bankNameHeader3 = document.getElementById('bankName3');
    const rows = document.getElementById('comparison-body').querySelectorAll('tr');
    const toggleButton = document.getElementById('toggle-button');

    if (cardColumn3.style.display === 'none' || cardColumn3.style.display === '') {
        cardColumn3.style.display = 'block';
        bankNameHeader3.style.display = '';
        toggleButton.textContent = '\u2212'; // 減號 -
        rows.forEach(row => {
            const thirdCell = row.querySelector('td:nth-child(4)');
            thirdCell.style.display = '';
        });
    } else {
        cardColumn3.style.display = 'none';
        bankNameHeader3.style.display = 'none';
        toggleButton.textContent = '\u002B'; // 加號 +
        rows.forEach(row => {
            const thirdCell = row.querySelector('td:nth-child(4)');
            thirdCell.style.display = 'none';
        });
    }
}




