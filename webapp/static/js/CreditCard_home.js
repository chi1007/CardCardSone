
// 首頁滾動條
let slideIndex = 1;
initSlides();

function initSlides() {
    showSlides(slideIndex); // Initialize the first slide
    setInterval(nextSlide, 10000); // Set the interval to change slides every 10 seconds
}

function showSlides(n) {
    let slides = document.getElementsByClassName("carousel-item");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function prevSlide() {
    showSlides(slideIndex -= 1);
}

function nextSlide() {
    showSlides(slideIndex += 1);
}


// 信用卡自動滾動條
let scrollAmountCredit = 0;
let autoScrollIntervalCredit;

function scrollLeftCredit() {
    let track = document.querySelector('.card_carousel-track');
    let cardWidth = document.querySelector('.card').offsetWidth + 20; // 20px 是邊距
    scrollAmountCredit -= cardWidth;
    if (scrollAmountCredit < 0) {
        scrollAmountCredit = track.scrollWidth - track.clientWidth; // 跳轉到末尾
    }
    track.scrollTo({
        left: scrollAmountCredit,
        behavior: 'smooth'
    });
    restartAutoScrollCredit();
}

function scrollRightCredit() {
    let track = document.querySelector('.card_carousel-track');
    let cardWidth = document.querySelector('.card').offsetWidth + 20; // 20px 是邊距
    let maxScroll = track.scrollWidth - track.clientWidth;
    scrollAmountCredit += cardWidth;
    if (scrollAmountCredit > maxScroll) {
        scrollAmountCredit = 0; // 重置為起點
    }
    track.scrollTo({
        left: scrollAmountCredit,
        behavior: 'smooth'
    });
    restartAutoScrollCredit();
}

function autoScrollCredit() {
    scrollRightCredit();
}

function startAutoScrollCredit() {
    autoScrollIntervalCredit = setInterval(autoScrollCredit, 3000); // 3秒間隔
}

function stopAutoScrollCredit() {
    clearInterval(autoScrollIntervalCredit);
}

function restartAutoScrollCredit() {
    stopAutoScrollCredit();
    startAutoScrollCredit();
}

// 事件監聽
document.querySelector('.card_carousel-control.prev').addEventListener('click', () => {
    scrollLeftCredit();
});
document.querySelector('.card_carousel-control.next').addEventListener('click', () => {
    scrollRightCredit();
});

// 簽帳卡輪播程式碼
let scrollAmountDebit = 0;
let autoScrollIntervalDebit;

function scrollLeftDebit() {
    let track = document.querySelector('.debitcard_carousel-track');
    let cardWidth = document.querySelector('.debitcard').offsetWidth + 20; // 20px 是邊距
    scrollAmountDebit -= cardWidth;
    if (scrollAmountDebit < 0) {
        scrollAmountDebit = track.scrollWidth - track.clientWidth; // 跳轉到末尾
    }
    track.scrollTo({
        left: scrollAmountDebit,
        behavior: 'smooth'
    });
    restartAutoScrollDebit();
}

function scrollRightDebit() {
    let track = document.querySelector('.debitcard_carousel-track');
    let cardWidth = document.querySelector('.debitcard').offsetWidth + 20; // 20px 是邊距
    let maxScroll = track.scrollWidth - track.clientWidth;
    scrollAmountDebit += cardWidth;
    if (scrollAmountDebit > maxScroll) {
        scrollAmountDebit = 0; // 重置為起點
    }
    track.scrollTo({
        left: scrollAmountDebit,
        behavior: 'smooth'
    });
    restartAutoScrollDebit();
}

function autoScrollDebit() {
    scrollRightDebit();
}

function startAutoScrollDebit() {
    autoScrollIntervalDebit = setInterval(autoScrollDebit, 3500); // 3秒間隔
}

function stopAutoScrollDebit() {
    clearInterval(autoScrollIntervalDebit);
}

function restartAutoScrollDebit() {
    stopAutoScrollDebit();
    startAutoScrollDebit();
}

// 事件監聽
document.querySelector('.debitcard_carousel-control.prev').addEventListener('click', () => {
    scrollLeftDebit();
});
document.querySelector('.debitcard_carousel-control.next').addEventListener('click', () => {
    scrollRightDebit();
});

// 頁面載入時開始自動滾動
window.onload = function() {
    startAutoScrollCredit();
    startAutoScrollDebit();
};

// 鍵盤事件監聽
window.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        scrollLeftCredit();
        scrollLeftDebit();
        restartAutoScrollCredit();
        restartAutoScrollDebit();
    } else if (event.key === 'ArrowRight') {
        scrollRightCredit();
        scrollRightDebit();
        restartAutoScrollCredit();
        restartAutoScrollDebit();
    }
});


// 信用卡介紹自動生成

// 信用卡&簽帳卡介紹自動生成
function openInNewTab(url) {
    window.open(url, '_blank');
}

function selectCard(cardName) {
    const url = `/CreditDescription?cardName=${encodeURIComponent(cardName)}`;
    openInNewTab(url);
}

function selectDebitCard(cardName) {
    const url = `/DebitDescription?cardName=${encodeURIComponent(cardName)}`;
    openInNewTab(url);
}
