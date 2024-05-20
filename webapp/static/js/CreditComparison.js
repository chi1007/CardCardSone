// 全局變量初始化
var cardData = [];
var selectedCards = [];  // 確保這裡是全局作用域定義的

document.addEventListener('DOMContentLoaded', function () {
    loadBankData();
});

function loadBankData() {
    fetch('/database/creditcard')
        .then(response => response.json())
        .then(data => {
            cardData = data ;
            createCardElements(cardData);
        })
        .catch(error => console.error('Error loading bank data:', error));
}



function createCardElements(cards) {
    const tableBody = document.getElementById('comparison-body');
    tableBody.innerHTML = '';

    cards.forEach((card, index) => {
        const row = tableBody.insertRow();

        row.insertCell(0).innerText = index + 1;
        row.insertCell(1).innerHTML = `<img src="${card.img}" alt="${card.name}" class="card-icon">`;
        row.insertCell(2).innerHTML = `<br>${card.name}`;
        const introCell = row.insertCell(3);
        introCell.classList.add('introduction');

        // 將 features 字段從字符串轉換為數組
        const featuresArray = card.features.split(', ').map(feature => feature.trim());

        introCell.innerHTML = (featuresArray.length > 0)
            ? '◍ ' + featuresArray.join('<br>◍ ')
            : '☑ 無詳細介紹';

        row.insertCell(4).innerHTML = `<a href="${card.Website}" class="select-button" target="_blank">我要辦卡</a>`;
        
        const checkboxCell = row.insertCell(5);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'select-checkbox';
        checkbox.dataset.name = card.name;
        checkbox.addEventListener('change', function () {
            handleCheckboxChange(this);
        });
        checkboxCell.appendChild(checkbox);
    });
    updateSelectedImages(); 
}

function handleCheckboxChange(checkbox) {
    if (!selectedCards) {
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

function updateSelectedImages(cards) {
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

    // 獲取按鈕元素
    const compareButton = document.getElementById('compareButton');

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
    if (selectedCards.length >= 2 && selectedCards.length <= 3) {
        compareButton.disabled = false;
    } else {
        compareButton.disabled = true;
    }

    // 為按鈕添加點擊事件處理程序
    compareButton.addEventListener('click', () => {
        if (selectedCards.length < 2) {
            alert('您至少需要選擇兩張卡片。');
            return;
        }
        const selectedCardNames = selectedCards.join(',');
        window.open(`/CardComparison?cards=${selectedCardNames}`, '_blank');
    });
}
