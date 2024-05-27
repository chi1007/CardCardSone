// 【搜尋功能】
// 獲取搜索输入框
const searchInput = document.querySelector('.search-bar input');

// 監聽输入框的輸入事件
searchInput.addEventListener('input', function(event) {
    const searchText = event.target.value.trim().toLowerCase(); // 获取输入文本并转换为小写字母

    // 獲取所有新聞項
    const newsItems = document.querySelectorAll('.news-item, .book-item');

    // 遍歷所有新聞項
    newsItems.forEach(newsItem => {
        // 獲取新聞標題和描述文本並轉換為小寫字母
        const title = newsItem.querySelector('h3').textContent.trim().toLowerCase();
        const description = newsItem.querySelector('p').textContent.trim().toLowerCase();

        // 如果新聞標題或描述文本包含搜索文本，則顯示該項；否則隱藏該項
        if (title.includes(searchText) || description.includes(searchText)) {
            newsItem.style.display = 'block'; // 顯示新聞項
        } else {
            newsItem.style.display = 'none'; // 隱藏新聞項
        }
    });
});

// 【返回頂部按鈕功能】
// 獲取按钮
const backToTopButton = document.querySelector('.back-to-top');

// 當用户滾動時，顯示或隱藏按鈕
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
};

// 當用戶點及按鈕時，返回頁面頂部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 平滑滾動
    });
}