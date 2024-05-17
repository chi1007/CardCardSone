// 載入 express 模組 port根據live server環境變數 http://localhost:{port}
const express = require('express');
const app = express();
const port = process.env.PORT || 5000; // 使用環境變量或默認值
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
  app.get('/bankdata/CreditCards.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'bankdata', 'CreditCards.json'));
});

  
  // 啟動服務器
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });



// 全局變量初始化
var cardData = [];

document.addEventListener('DOMContentLoaded', function () {
    loadBankData();
});

function loadBankData() {
    fetch('/bankdata/CreditCards.json')
        .then(response => response.json())
        .then(data => {
            cardData = data.cards;
            createCardElements(cardData);
            createFilterButtons(cardData);  // 確保標籤按鈕是基於實際卡片數據生成的
        })
        .catch(error => console.error('Error loading bank data:', error));
}

function createCardElements(cards) {
    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = ''; // 清空現有的卡片

    cards.forEach(card => {
        const cardElement = createCardElement(card);
        cardContainer.appendChild(cardElement);
    });
}

function createFilterButtons(cards) {
    const uniqueTags = new Set();
    cards.forEach(card => card.tags.forEach(tag => uniqueTags.add(tag)));

    const filterOptions = document.querySelector('.filter-options');
    filterOptions.innerHTML = '';

    uniqueTags.forEach(tag => {
        const button = document.createElement('button');
        button.className = 'btn';
        button.textContent = tag;
        button.setAttribute('data-tag', tag);
        button.addEventListener('click', function() { showTab(button); });
        filterOptions.appendChild(button);
    });
}

function showTab(button) {
    const tag = button.getAttribute('data-tag');
    const cards = document.querySelectorAll('.card');
    button.classList.toggle('active');

    cards.forEach(card => {
        const cardTags = Array.from(card.querySelectorAll('.card-tag')).map(el => el.textContent);
        card.style.display = cardTags.includes(tag) ? 'block' : 'none';
    });
}

function createCardElement(card) {
    const article = document.createElement('article');
    article.classList.add('card');

    const cardContent = `
    <div class="card-content">
        <img src="${card.imagePath}" alt="${card.name}" class="card-image" onclick="selectCard('${card.name}')" />
        <div class="card-description">卡片詳細描述</div>
        <div class="card-details">
            <div class="card-tags">${card.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}</div>
            <div class="card-description-full">
                <h2 class="card-title">${card.name}</h2>
                ${card.簡介.map(line => `<p class="card-subtitle">${line}</p>`).join('')}
            </div>
        </div>
    </div>`;
    
    article.innerHTML = cardContent;
    return article;
}

// 確保這裡是全局作用域定義的
document.addEventListener('DOMContentLoaded', function() {
  const filterOptions = document.querySelector('.filter-options');

  // 定義所有可能的標籤
  const allTags = ['繳稅優惠', '現金回饋', '網購', '行動支付', '影音娛樂', '美食外送', '生活繳費', '超商量販', '百貨購物', '海外消費', '旅遊訂房'];

  // 為每個標籤創建一個按鈕
  allTags.forEach(tag => {
    const button = document.createElement('button');
    button.classList.add('btn');
    button.textContent = tag;
    button.addEventListener('click', () => showTab(button));
    filterOptions.appendChild(button);
  });

  // 獲取 JSON 數據中的 cards 數組
  cardData = cardData.cards;
  createCardElements(cardData);
});

function showTab(button) {
  // 切換按鈕 active
  button.classList.toggle('active');

  // 獲取激活的按鈕
  const activeTags = document.querySelectorAll('.filter-options .btn.active');

  // 如果沒有激活的按鈕，顯示所有卡片
  if (activeTags.length === 0) {
    const cards = document.querySelectorAll('.card-container .card');
    cards.forEach(function(card) {
      card.style.display = 'block';
    });
    return; // 退出函數
  }

  // 獲取激活的標籤
  const selectedTags = Array.from(activeTags).map(function(tag) {
    return tag.textContent.trim(); // 修改這裡獲取標籤textContent
  });

  const cards = document.querySelectorAll('.card-container .card');
  cards.forEach(function(card) {
    const cardTags = Array.from(card.querySelectorAll('.card-tag')).map(function(tag) {
      return tag.textContent.trim();
    });

    if (selectedTags.some(function(tag) {
      return cardTags.includes(tag);
    })) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function createCardElements(cards) {
  const cardContainer = document.querySelector('.card-container');

  // 清空舊的卡片元素
  cardContainer.innerHTML = '';

  // 循環創建卡片元素
  cards.forEach(card => {
    const cardElement = createCardElement(card);
    cardContainer.appendChild(cardElement);
  });
}

function openInNewTab(url) {
  window.open(url, '_blank');
}

function selectCard(cardName) {
  const url = `/description?cardName=${encodeURIComponent(cardName)}`;
  openInNewTab(url);
}

