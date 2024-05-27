// 全局變量初始化
var cardData = [];

document.addEventListener('DOMContentLoaded', function () {
  loadBankData();
  setTimeout(hideLoadingScreen, 1000)
}); 

function loadBankData() {
  fetch('/database/debitcard')
      .then(response => response.json())
      .then(data => {
          cardData = data;
          createCardElements(cardData);
          createFilterButtons(cardData);

          // 確保所有目標元素存在後再移除隱藏類別並新增動畫類
          const contactElement = document.getElementById('content');
          const footerElement = document.getElementById('footer-content');
          const titleElement = document.querySelector('.section-title');
          const filterOptionsElement = document.querySelector('.filter-options');
          const cardContainerElement = document.querySelector('.card-container');
          
          if (contactElement) {
              contactElement.classList.remove('hidden');
          } else {
              console.error('Error: contact element not found');
          }

          if (footerElement) {
              footerElement.classList.remove('hidden');
              footerElement.classList.add('fadeInContent');
          } else {
              console.error('Error: content element not found');
          }

          if (titleElement) {
              titleElement.classList.remove('hidden');
              titleElement.classList.add('fadeInTitle');
          } else {
              console.error('Error: title element not found');
          }

          if (filterOptionsElement) {
              filterOptionsElement.classList.remove('hidden');
              filterOptionsElement.classList.add('fadeInContent');
          } else {
              console.error('Error: filter options element not found');
          }

          if (cardContainerElement) {
              cardContainerElement.classList.remove('hidden');
              cardContainerElement.classList.add('fadeInContent');
          } else {
              console.error('Error: card container element not found');
          }
      })
      .catch(error => console.error('Error loading bank data:', error));
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
      loadingScreen.style.display = 'none';
  }
}


function createCardElements(cards) {
  const cardContainer = document.querySelector('.card-container');
  cardContainer.innerHTML = '';

  cards.forEach(card => {
    const { name, img, description, features, tag } = card;
    const cardElement = createCardElement({ name, img, description, features, tag });
    cardContainer.appendChild(cardElement);
  });
}

function createCardElement({ name, img, description, features, tag }) {
  const article = document.createElement('article');
  article.classList.add('card');

  const cardContent = `
  <div class="card-content">
    <img src="${img}" alt="${name}" class="card-image" onclick="selectCard('${name}')" />
    <div class="card-description">${description || "卡片詳細描述"}</div>
    <div class="card-details">
      <div class="card-tags">${tag && tag.split(',').map(tag => `<span class="card-tag">${tag}</span>`).join('')}</div>
      <h2 class="card-title">${name}</h2>
      <p class="card-subtitle">
        ${features.split(', ').map(line => `<span>${line}</span>`).join('<br>')}
      </p>
    </div>
  </div>
`;

  article.innerHTML = cardContent;
  return article;
}


function createFilterButtons(cards) {
  const filterOptions = document.querySelector('.filter-options');
  filterOptions.innerHTML = '';

  const allTags = new Set();
  cards.forEach(card => {
    const { tag } = card;
    if (tag) {
      tag.split(', ').forEach(tag => allTags.add(tag));
    }
  });

  allTags.forEach(tag => {
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

// 確保這裡是全局作用域定義的
document.addEventListener('DOMContentLoaded', function() {
  const filterOptions = document.querySelector('.filter-options');


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
    return tag.textContent.trim(); 
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
  const url = `/DebitDescription?cardName=${encodeURIComponent(cardName)}`;
  openInNewTab(url);
}

