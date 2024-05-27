// 全局變量初始化
var cardData = [];

document.addEventListener('DOMContentLoaded', function() {
    loadBankData();
    setTimeout(hideLoadingScreen, 1000)
});



function getCookie(name) {
    const cookies = document.cookie.split(';');
    return cookies.reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        if (key === name) return decodeURIComponent(value);
        return acc;
    }, '');
}


function loadBankData() {
    fetch('/database/debitcard')
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

        // 確保所有目標元素存在後再移除隱藏類別並新增動畫類
        const footerElement = document.getElementById('footer-content');
        const titleElement = document.querySelector('.section-title');
        const comparisonTableElement = document.getElementById('comparison-table');
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
        
        // 調整最後一行的文字居中
        adjustLastRowAlignment();
    })
    .catch(error => {
        console.error('Error loading bank data:', error);
    });
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
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
        select.innerHTML = '';
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

        updateTableCell(`bankName${cardIndex}`, selectedCard.bankname);
        updateTableCell(`basicReward${cardIndex}`, selectedCard.basic_rewards);
        updateTableCell(`additionalReward${cardIndex}`, selectedCard.additional_benefits);
        updateTableCell(`overseasSpending${cardIndex}`, selectedCard.overseas_spending);
        updateTableCell(`crossBankOffers${cardIndex}`, selectedCard.cross_bank_offers);
        updateTableCell(`cardFeatures${cardIndex}`, selectedCard.features.replace(/, /g, '<br>'));
        updateTableCell(`onlineShoppingDiscounts${cardIndex}`, selectedCard.online_shopping_discounts);
        updateTableCell(`mobilePayment${cardIndex}`, selectedCard.mobile_payment);
        updateTableCell(`commuteExpenses${cardIndex}`, selectedCard.commute_expenses);
        updateTableCell(`utilitiesPayment${cardIndex}`, selectedCard.utilities_payment);
        updateTableCell(`foodDelivery${cardIndex}`, selectedCard.food_delivery);
        updateTableCell(`entertainment${cardIndex}`, selectedCard.entertainment);
        updateTableCell(`traveBooking${cardIndex}`, selectedCard.travel_booking);
        updateTableCell(`departmentStores${cardIndex}`, selectedCard.department_stores);
        updateTableCell(`interestRate${cardIndex}`, selectedCard.savings_account_interest_rate);
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

function updateTableCell(cellId, content) {
    const cell = document.getElementById(cellId);
    cell.innerHTML = content;
    cell.className = 'card-detail'; // 設置class
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

function adjustLastRowAlignment() {
    const comparisonBody = document.getElementById('comparison-body');
    if (comparisonBody) {
        const rows = comparisonBody.querySelectorAll('tr');
        if (rows.length > 0) {
            const lastRow = rows[rows.length - 1];
            const cells = lastRow.querySelectorAll('td');
            cells.forEach(cell => {
                cell.style.textAlign = 'center';
            });
        }
    }
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




