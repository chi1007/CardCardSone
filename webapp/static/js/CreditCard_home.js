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

