document.addEventListener('DOMContentLoaded', () => {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.carousel-indicators span');
    let currentIndex = 0;

    function showItem(index) {
        carouselItems.forEach(item => item.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        carouselItems[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    document.querySelector('.carousel-control-prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        showItem(currentIndex);
    });

    document.querySelector('.carousel-control-next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        showItem(currentIndex);
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            showItem(currentIndex);
        });
    });

    showItem(currentIndex);
});
