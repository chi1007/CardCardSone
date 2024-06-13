// 全局變量初始化
var cardData = [];
var selectedCards = [];  // 確保這裡是全局作用域定義的

document.addEventListener('DOMContentLoaded', function () {
    loadBankData();
    setTimeout(hideLoadingScreen, 1000)

    // 為按鈕添加點擊事件處理程序
    const compareButton = document.getElementById('compareButton');
    compareButton.addEventListener('click', () => {
        if (selectedCards.length < 2) {
            alert('您至少需要選擇兩張卡片。');
            return;
        }
        const selectedCardNames = selectedCards.join(',');
        window.open(`/CreditCardComparison?cards=${selectedCardNames}`, '_blank');
    });
});


function loadBankData() {
    fetch('/database/creditcard')
        .then(response => response.json())
        .then(data => {
            cardData = data;
            createCardElements(cardData);

            // 確保所有目標元素存在後再移除隱藏類別並新增動畫類
            const footerElement = document.getElementById('footer-content');
            const comparisonTableElement = document.getElementById('comparison-table');
            const titleElement = document.querySelector('.section-title');
            const cardContainerElement = document.getElementById('card-container');
            
            if (footerElement) {
                footerElement.classList.remove('hidden');
                footerElement.classList.add('fadeInContent');
            } else {
                console.error('Error: footer element not found');
            }

            if (titleElement) {
                titleElement.classList.remove('hidden');
                titleElement.classList.add('fadeInTitle');
            } else {
                console.error('Error: title element not found');
            }
            
            if (comparisonTableElement) {
                comparisonTableElement.classList.remove('hidden');
                comparisonTableElement.classList.add('fadeInContent');
            } else {
                console.error('Error: comparison table element not found');
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
    const tableBody = document.getElementById('comparison-body');
    tableBody.innerHTML = '';

    cards.forEach((card, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td data-label="編號">${index + 1}</td>
            <td data-label="信用卡一覽"><img src="${card.img}" alt="${card.name}" class="card-icon"></td>
            <td data-label="發卡銀行/卡片名稱">${card.bankname}<br>${card.name}</td>
            <td data-label="簡介" class="introduction">${formatFeatures(card.features)}</td>
            <td data-label="我要當卡奴"><a href="${card.Website}" class="select-button" target="_blank">我要辦卡</a></td>
            <td data-label="選取"><input type="checkbox" class="select-checkbox" data-name="${card.name}" onchange="handleCheckboxChange(this)"></td>
        `;

        tableBody.appendChild(row);
    });
    updateSelectedImages();
}

function formatFeatures(features) {
    const featuresArray = features.split(', ').map(feature => feature.trim());
    return (featuresArray.length > 0) ? '◍ ' + featuresArray.join('<br>◍ ') : '☑ 無詳細介紹';
}

function handleCheckboxChange(checkbox) {
    if (!selectedCards || selectedCards.length === 0) {
        selectedCards = [];
    }
    
    console.log('selectedCards before change:', JSON.stringify(selectedCards));

    const cardName = checkbox.dataset.name;
    if (checkbox.checked) {
        if (selectedCards.length >= 3) {
            alert('您最多只能選三張卡片。');
            checkbox.checked = false;
            return;
        }
        selectedCards.push(cardName);
        console.log('selectedCards after adding:', JSON.stringify(selectedCards));
    } else {
        const index = selectedCards.indexOf(cardName);
        if (index > -1) {
            selectedCards.splice(index, 1);
            console.log('selectedCards after removing:', JSON.stringify(selectedCards));
        }
    }
    updateSelectedImages();
    // 將選擇的卡片名稱轉換為字符串並進行編碼
    const selectedCardsString = selectedCards.join(',');
    const encodedSelectedCards = encodeURIComponent(selectedCardsString);

    // 設置 Cookie
    document.cookie = `selectedCards=${encodedSelectedCards}; path=/`;
}

function updateSelectedImages() {
    if (!Array.isArray(selectedCards)) {
        selectedCards = [];
    }

    const selectedImages = [
        document.getElementById('cardImage1'),
        document.getElementById('cardImage2'),
        document.getElementById('cardImage3')
    ];
    const selectedImageTitles = [
        document.getElementById('cardTitle1'),
        document.getElementById('cardTitle2'),
        document.getElementById('cardTitle3')
    ];

    // 獲取所有 checkbox 元素
    const checkboxes = document.querySelectorAll('.select-checkbox');

    // 重置所有 checkbox 的選中狀態
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // 根據 selectedCards 數組更新對應 checkbox 的選中狀態
    selectedCards.forEach(cardName => {
        const checkbox = Array.from(checkboxes).find(cb => cb.dataset.name === cardName);
        if (checkbox) {
            checkbox.checked = true;
        }
    });

    selectedImages.forEach((img, i) => {
        if (i < selectedCards.length) {
            const card = cardData.find(c => c.name === selectedCards[i]);
            if (card) {
                img.src = card.img;
                img.alt = card.name;
                selectedImageTitles[i].textContent = card.name;
            }
        } else {
            img.src = `../static/image/icon/none.png`;
            img.alt = 'Placeholder';
            selectedImageTitles[i].textContent = '';
        }
    });

    // 根據選取的卡片數量啟用或禁用按鈕
    const compareButton = document.getElementById('compareButton');
    if (selectedCards.length >= 2 && selectedCards.length <= 3) {
        compareButton.disabled = false;
    } else {
        compareButton.disabled = true;
    }
}

