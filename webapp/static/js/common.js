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