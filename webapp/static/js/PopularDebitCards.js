function showTab(button) {
    // 切換按鈕 active 
    button.classList.toggle('active');

    // 獲取激活的按鈕
    var activeTags = document.querySelectorAll('.filter-options .btn.active');

    // 如果沒有激活的按鈕，顯示所有卡片
    if (activeTags.length === 0) {
        var cards = document.querySelectorAll('.card-container .card');
        cards.forEach(function(card) {
            card.style.display = 'block';
        });
        return; // 退出函数
    }

    // 獲取激活的標籤
    var selectedTags = Array.from(activeTags).map(function(tag) {
        return tag.textContent.trim(); // 修改這裡獲取標籤textContent
    });

    var cards = document.querySelectorAll('.card-container .card');
    cards.forEach(function(card) {
        var cardTags = Array.from(card.querySelectorAll('.card-tag')).map(function(tag) {
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
