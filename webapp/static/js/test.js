document.querySelector('.arrow.left').addEventListener('click', function() {
    // 切換到上一篇文章
    var articles = document.querySelectorAll('.article-container');
    var currentIndex = Array.from(articles).findIndex(article => article.classList.contains('active'));
    articles[currentIndex].classList.remove('active');
    articles[currentIndex === 0 ? articles.length - 1 : currentIndex - 1].classList.add('active');
});

document.querySelector('.arrow.right').addEventListener('click', function() {
// 切換到下一篇文章
var articles = document.querySelectorAll('.article-container');
var currentIndex = Array.from(articles).findIndex(article => article.classList.contains('active'));
articles[currentIndex].classList.remove('active');
articles[(currentIndex + 1) % articles.length].classList.add('active');
});


function showTab(button) {
    // 切換按鈕 active 
    button.classList.toggle('active');

    // 獲取激活的按鈕
    var activeTags = document.querySelectorAll('.filter-options .btn.active');

}

{
const dots = document.querySelectorAll('.dot');
const articles = document.querySelectorAll('article');

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        document.querySelector('.dot.active').classList.remove('active');
        dot.classList.add('active');

        document.querySelector('article.active').classList.remove('active');
        articles[index].classList.add('active');
    });
});
}